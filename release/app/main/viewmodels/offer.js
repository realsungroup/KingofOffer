define(['plugins/dialog', 'knockout','./newoffer','./preoffer','./editoffer'], function (dialog, ko, newoffer,preoffer,editoffer) {
    return {
        user:"",
        ucode:"",
        activate:function(e){
            if (e!==undefined)
            {
               this.user=e.user;
               this.ucode=e.ucode;
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
            mini.parse();
            offerList=function(){
                dbs.dbGetdata(opaid,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data,subdata){
                    me.oList(data);
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
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
        }
    }
});