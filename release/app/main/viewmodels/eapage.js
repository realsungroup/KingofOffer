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
            var me=this;
            var o={};
            mini.parse();
            offerList=function(id){
                dbs.dbGetdata(id,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    me.oList(data);
                    if(id==542197296605){
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
                    // console.log(jqXHR);
                };
            }
            ysp=function(){
                offerList(jlsid);
            };
            wsp=function(){
                offerList(eeaid);
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
        }
    }
});