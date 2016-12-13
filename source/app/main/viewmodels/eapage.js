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
            var me=this;
            var o={};
            mini.parse();
            offerList=function(){
                dbs.dbGetdata(eeaid,0,"",fnSuccess,fnerror,fnhttperror);
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
            offerView=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                preoffer.show(e);
            };
            offerSubmit = function(e){//提交按钮
                location.href = "#auditpage/"+e.REC_ID;
            };
        }
    }
});