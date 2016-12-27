define(['plugins/dialog', 'knockout','./newofferc','./preofferc'], function (dialog, ko, newofferc,preofferc) {//,'./editofferc'
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
        cList:ko.observableArray([]),
        attached:function(){
            var baseUrl=appConfig.app.baseUrl;
            var ucode = appConfig.app.ucode;
            var user  = appConfig.app.user;
            var dbs=new dbHelper(baseUrl,user,ucode);
            var cfnid=appConfig.offer.cfnid;
            var me=this;
            var o={};
            mini.parse();
            offercList=function(){
                dbs.dbGetdata(cfnid,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    // console.log(data[0]);
                    me.cList(data);
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                };
            }
            offercList();
            newOc=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                newofferc.show(e).then(function(){
                    offercList();
                });
            };
            offercView=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                preofferc.show(e).then(function(){
                    offercList();
                });
            };
        }
    }
});