define(['plugins/dialog', 'knockout','./newofferc','./preofferc'], function (dialog, ko, newofferc,preofferc) {
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
        ceList:ko.observableArray([]),
        attached:function(){
            var baseUrl=appConfig.app.baseUrl;
            var ucode = appConfig.app.ucode;
            var user  = appConfig.app.user;
            var dbs=new dbHelper(baseUrl,user,ucode);
            var dfnid=appConfig.offer.dfnid;
            var me=this;
            var o={};
            mini.parse();
            offerceList=function(){
                dbs.dbGetdata(dfnid,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    // console.log(data[0]);
                    me.ceList(data);
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                };
            }
            offerceList();
            subOc=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                newofferc.show(e).then(function(){
                    offerceList();
                });
            };
            offerceView=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                preofferc.show(e).then(function(){
                    offerceList();
                });
            };
        }
    }
});