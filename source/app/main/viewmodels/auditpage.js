define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var opaid=appConfig.offer.opaid;
    var eaaid=appConfig.offer.eaaid;
    var strid=appConfig.offer.strid;
    var marid=appConfig.offer.marid;
    var aveid=appConfig.offer.aveid;
    var preview=[];
    var cmswhere="";
    var recidAp;
    return {
        recid:ko.observableArray(""),
        subList1:ko.observableArray([]),
        subList2:ko.observableArray([]),
        subList3:ko.observableArray([]),
        subList4:ko.observableArray([]),
        activate:function(recid,e){
            recidAp=recid;
            var me=this;
            cmswhere="REC_ID='"+recid+"'";
            offerSub=function(subid,callback){
                dbs.dbGetdata(opaid,subid,cmswhere,fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data,subdata){
                    if(data[0].C3_534184428625=="Y"){
                        $('#fbb').hide()
                    }
                    var form = new mini.Form("form5");
                    form.setData(data[0]);
                    preview=data[0];
                    callback(subdata);
                    if(preview.C3_534182834029){
                        var a1=$("#ahref");
                        a1[0].href=preview.C3_534182834029;
                    }else{
                        $("#ahref").hide();
                    }
                    if(preview.C3_534182839409){
                        var a2=$("#ahref2");
                        a2[0].href=preview.C3_534182839409;
                    }else{
                        $("#ahref2").hide();
                    }
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    //console.log(jqXHR);
                };
            }
            offerSub(eaaid,function(subdata){me.subList1(subdata);});
            offerSub(strid,function(subdata){me.subList2(subdata);});
            offerSub(marid,function(subdata){me.subList3(subdata);});
            offerSub(aveid,function(subdata){me.subList4(subdata);});
            var i=101;
            headClick=function(offersub){
                $('.oacitve').removeClass('oacitve');
                if(offersub=='ss'){
                    $('.sshead').addClass('oacitve');
                    $('.ss').css('z-index',i);
                }else if(offersub=='md'){
                    $('.mdhead').addClass('oacitve');
                    $('.md').css('z-index',i);
                }else if(offersub=='das'){
                    $('.dashead').addClass('oacitve');
                    $('.das').css('z-index',i);
                }
                i++;
            };
        },
        attached:function(){
            mini.parse();
            var form = new mini.Form("form5");
            form.setData(preview);
            fields = form.getFields();
            for (var i = 0, l = fields.length; i < l; i++) {
                var c = fields[i];
                if(c.name=='C3_534183782055'
                ||c.name=='C3_534183782431'
                ||c.name=='C3_534183782616'
                ||c.name=='C3_535110269532'
                ||c.name=='C3_534183782805'){
                    return;
                }else{
                    if (c.setReadOnly) c.setReadOnly(true);     //只读
                    if (c.setIsValid) c.setIsValid(true);      //去除错误提示
                    if (c.addCls) c.addCls("asLabel");          //增加asLabel外观
                }
            }
        },
        cancel:function(){
            location.href = "#eapage";
        },
        ok:function(){
            $('#fbb').attr({"disabled":"disabled"});
            setTimeout(function() {
                $('#fbb').removeAttr("disabled");
            }, 1000);
            var that=this;
            var form = new mini.Form("form5");
            var o =  new mini.Form("form5").getData();
            form.validate(); 
            if (form.isValid() == false) return;
            o._id=1;
            o._state="modified";
            o.C3_534184428625="Y";
            o.REC_ID=recidAp;
            var json = mini.encode([o]);
            dbs.dbSavedata(opaid,0,json,dataSaved,fnerror,fnhttperror);
            function dataSaved(text){
                dialog.showMessage('<h1>Success</h1>','Submit',['Cancel'],true).then(function(){
                    $('#fbb').hide();
                    location.href = "#eapage";// history.back(-1);
                });
               
                
            };
            function fnerror(text){
                dialog.showMessage(text.message,'Error',['Cancel'],true);
            };
            function fnhttperror(jqXHR, textStatus, errorThrown){
                dialog.showMessage('error','Save',['Cancel'],true);
            }
        }
    }
})