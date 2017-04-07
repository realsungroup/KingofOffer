define(['plugins/dialog', 'knockout','./preoffer'], function (dialog, ko, preoffer) {
    return {
        user:"",
        ucode:"",
        activate:function(e){
            if (e!==undefined)
            {
               appConfig.app.user=e.user;
               appConfig.app.ucode=e.ucode;
            }
        },
        oList:ko.observableArray([]),
        subList:ko.observableArray([]),
        attached:function(){
            var baseUrl=appConfig.app.baseUrl;
            var ucode = appConfig.app.ucode;
            var user  = appConfig.app.user;
            var dbs=new dbHelper(baseUrl,user,ucode);
            var eeaid=appConfig.offer.eeaid;
            var jlsid=appConfig.offer.jlsid;
            var yyjid=appConfig.offer.yyjid;
            var me=this;
            var o={};
            var sData=[];
            var oldData=[];
            var newData=[];
            mini.parse();
            offerList=function(id){
                dbs.dbGetdata(id,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    me.oList(data);
                    oldData=sData=data;
                    for(var i=0;i<data.length;i++){
                        if(data[i].C3_544804530402=='已审批'){
                            $('.p1').show();
                            $('.r1').hide();
                        }else{
                            $('.r1').show();
                            $('.p1').hide();
                        }
                    }
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    // console.log(jqXHR);
                };
            }
            ysp=function(){
                offerList(jlsid);
            };
            wsp=function(){
                offerList(eeaid);
            };
            yjj=function(){
                offerList(yyjid);
            };
            wsp();
            offerView=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                preoffer.show(e);
            };
            eaSubmit = function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                location.href = "#auditpage/"+e.REC_ID;
            };
            rePage =  function() {
                me.oList(oldData);
                sData=oldData;
                mini.getbyName('searchBoxcf').setValue("");
                for(var i=0;i<oldData.length;i++){
                    if(oldData[i].C3_544804530402=='已审批'){
                        $('.p1').show();
                        $('.r1').hide();
                    }else{
                        $('.r1').show();
                        $('.p1').hide();
                    }
                }
            };
            searchcf =  function() {
                newData=[];
                var skey = mini.getbyName('searchBoxcf').value;
                // console.log(skey);
                if(skey==""){
                    rePage();
                }else{
                    for(var i=0,a=0;i<sData.length;i++){
                        if(!sData[i].C3_541011395561)sData[i].C3_541011395561="";
                        if(!sData[i].C3_534181598826)sData[i].C3_534181598826="";
                        if(!sData[i].C3_534181645731)sData[i].C3_534181645731="";
                        if(!sData[i].C3_534181718652)sData[i].C3_534181718652="";
                        if(!sData[i].C3_534264776828)sData[i].C3_534264776828="";
                        if(!sData[i].C3_534181730034)sData[i].C3_534181730034="";
                        if(!sData[i].C3_534187094286)sData[i].C3_534187094286="";
                        if(sData[i].C3_541011395561.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534181598826.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534181645731.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534181718652.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534264776828.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534181730034.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187094286.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_541011395561.indexOf(skey)>=0
                        || sData[i].C3_534181598826.indexOf(skey)>=0
                        || sData[i].C3_534181645731.indexOf(skey)>=0
                        || sData[i].C3_534181718652.indexOf(skey)>=0
                        || sData[i].C3_534264776828.indexOf(skey)>=0
                        || sData[i].C3_534181730034.indexOf(skey)>=0
                        || sData[i].C3_534187094286.indexOf(skey)>=0)
                        newData[a++] = sData[i];
                    };
                    me.oList(newData);
                    for(var i=0;i<newData.length;i++){
                        if(newData[i].C3_544804530402=='已审批'){
                            $('.p1').show();
                            $('.r1').hide();
                        }else{
                            $('.r1').show();
                            $('.p1').hide();
                        }
                    }
                    sData=newData;
                }
                mini.getbyName('searchBoxcf').setValue("");
            };
            $('#searchBoxcf').keydown(function(event) {
                if(event.keyCode == "13"){//keyCode=13是回车键
                    event.preventDefault();
                    searchcf();
                }
            });
        }
    }
});