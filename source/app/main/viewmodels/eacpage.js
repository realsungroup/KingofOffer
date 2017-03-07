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
            var ylsid=appConfig.offer.ylsid;
            var me=this;
            var o={};
            mini.parse();
            offerceList=function(id){
                dbs.dbGetdata(id,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    me.ceList(data);
                    if(id==542197833056){
                        $('.p1').show();
                        $('.r1').hide();
                    }else{
                        $('.r1').show();
                        $('.p1').hide();
                    }
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                };
            }
            ysp=function(){
                offerceList(ylsid);
            };
            wsp=function(){
                offerceList(dfnid);
            };
            wsp();
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