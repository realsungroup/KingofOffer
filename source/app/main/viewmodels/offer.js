define(['plugins/dialog', 'knockout','./newoffer','./preoffer','./editoffer'], function (dialog, ko, newoffer,preoffer,editoffer) {
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
            var opaid=appConfig.offer.opaid;
            var me=this;
            var o={};
            var sData=[];
            var oldData=[];
            var newData=[];
            mini.parse();
            offerList=function(){
                dbs.dbGetdata(opaid,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    me.oList(data);
                    oldData=sData=data;
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    // console.log(jqXHR);
                };
            }
            offerList();
            newOp=function(){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                newoffer.show().then(function(){
                    offerList();
                });
            };
            offerEdit=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                editoffer.show(e).then(function(){
                    offerList();
                });
            };
            offerView=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                preoffer.show(e).then(function(){
                    offerList();
                });
            };
            offerSubmit = function(e){//提交按钮
                if(confirm('您确定要提交么？')){
                    o._id=1;
                    o._state="modified";
                    o.C3_534184252529="Y";
                    o.REC_ID=e.REC_ID;
                    json="["+JSON.stringify(o)+"]";
                    dbs.dbSavedata(opaid,0,json);
                    setTimeout(function() {
                        offerList();
                    }, 500);
                }
            };
            offerDel = function(e){//删除按钮
                if(confirm('您确定要删除么？')){
                    o._id=1;
                    o._state="removed";
                    o.C3_534184252529="Y";
                    o.REC_ID=e.REC_ID;
                    json="["+JSON.stringify(o)+"]";
                    dbs.dbSavedata(opaid,0,json);
                    setTimeout(function() {
                        offerList();
                    }, 500);
                }
            };
            rePage =  function() {
                me.oList(oldData);
                sData=oldData;
                mini.getbyName('searchBoxcf').setValue("");
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
                        if(!sData[i].C3_589650598855)sData[i].C3_589650598855="";
                        if(!sData[i].C3_534181718652)sData[i].C3_534181718652="";
                        if(!sData[i].C3_534264776828)sData[i].C3_534264776828="";
                        if(!sData[i].C3_534181730034)sData[i].C3_534181730034="";
                        if(!sData[i].C3_534187094286)sData[i].C3_534187094286="";
                        if(sData[i].C3_541011395561.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534181598826.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_589650598855.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534181718652.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534264776828.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534181730034.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187094286.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_541011395561.indexOf(skey)>=0
                        || sData[i].C3_534181598826.indexOf(skey)>=0
                        || sData[i].C3_589650598855.indexOf(skey)>=0
                        || sData[i].C3_534181718652.indexOf(skey)>=0
                        || sData[i].C3_534264776828.indexOf(skey)>=0
                        || sData[i].C3_534181730034.indexOf(skey)>=0
                        || sData[i].C3_534187094286.indexOf(skey)>=0)
                        newData[a++] = sData[i];
                    };
                    me.oList(newData);
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