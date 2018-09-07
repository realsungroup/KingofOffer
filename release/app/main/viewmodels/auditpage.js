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
        subList4:ko.observableArray([]),
        activate:function(recid,e){
            recidAp=recid;
            var me=this;
             offerSub1=function(recid,cmswhere,callback){
                dbs.dbGetdata(recid,0,cmswhere,fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    // console.log(data);
                    callback(data);
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    // console.log(jqXHR);
                };
            }
            cmswhere="REC_ID='"+recid+"'";
            dbs.dbGetdata(opaid,eaaid,cmswhere,fnSuccess,fnerror,fnhttperror);
            function fnSuccess(data,subdata){
                for(var i=0;i<subdata.length;i++){
                    if(subdata[i].C3_534184046952){
                        subdata[i].C3_534184046952=subdata[i].C3_534184046952.toLocaleDateString();
                    }
                }
                me.subList1(subdata);
                var form = new mini.Form("form5");
                form.setData(data[0]);
                preview=data[0];
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
                if(preview.C3_541852470955){
                    var a3=$("#ahref3");
                    a3[0].href=preview.C3_541852470955;
                }else{
                    $("#ahref3").hide();
                }
                offerSub1(strid,"C3_534182272208='"+data[0].C3_534181645731+"' AND C3_534182291688='"+preview.C3_534181718652+"'",function(data){me.subList2(data);});
                offerSub1(aveid,"C3_534182432109='"+data[0].C3_534181730034+"' AND C3_534182440112='"+preview.C3_534181645731+"'",function(data){me.subList4(data);});
            };
            function fnerror(text){
                dialog.showMessage(text.message,'失败',['返回'],true);
            };
            function fnhttperror(jqXHR, textStatus, errorThrown){
                //console.log(jqXHR);
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
            $('.fbb').attr({"disabled":"disabled"});
            setTimeout(function() {
                $('.fbb').removeAttr("disabled");
            }, 1000);
            var that=this;
            var form = new mini.Form("form5");
            var o =  new mini.Form("form5").getData();
            form.validate();
            if (parseFloat(o.C3_534183782055)>parseFloat(o.C3_534183782431)){
                alert('"Max." should be greater than "Min."');
                mini.getbyName('C3_534183782431').focus();
                return;
            }
            if (form.isValid() == false) return;
            o._id=1;
            o._state="modified";
            o.C3_534184428625="Y";
            o.REC_ID=recidAp;
            var json = mini.encode([o]);
            // console.log(json);
            dbs.dbSavedata(opaid,0,json,dataSaved,fnerror,fnhttperror);
            function dataSaved(text){
                dialog.showMessage('<h1>Success</h1>','Submit',['Ok'],true).then(function(){
                    location.href = "#eapage";// history.back(-1);
                });
            };
            function fnerror(text){
                dialog.showMessage(text.message,'Error',['Cancel'],true);
            };
            function fnhttperror(jqXHR, textStatus, errorThrown){
                dialog.showMessage('error','Save',['Cancel'],true);
            }
        },
        no:function(){
            $('.fbb').attr({"disabled":"disabled"});
            setTimeout(function() {
                $('.fbb').removeAttr("disabled");
            }, 1000);
            var that=this;
            var form = new mini.Form("form5");
            var o =  new mini.Form("form5").getData();
            form.validate(); 
            if (o.C3_534183782055>o.C3_534183782431){
                alert('"Max". should be greater than "Min."');
                mini.getbyName('C3_534183782431').focus();
                return;
            }
            if (form.isValid() == false) return;
            o._id=1;
            o._state="modified";
            o.C3_534184428625="N";
            o.C3_544804530402=='已拒绝';
            o.REC_ID=recidAp;
            var json = mini.encode([o]);
            // console.log(json);
            dbs.dbSavedata(opaid,0,json,dataSaved,fnerror,fnhttperror);
            function dataSaved(text){
                dialog.showMessage('<h1>Success</h1>','Submit',['Ok'],true).then(function(){
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