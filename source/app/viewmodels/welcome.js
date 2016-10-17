define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
     var user = ko.observable(),
         upass = ko.observable();

     var   canLogin=ko.computed(function () {
             
            if (!user()||user()=="")
            {
                return false;
            }
            if (!upass()||upass()=="")
            {
                return false;
            }
             return  true;
            });
     var keeplogininfo=ko.observable(true);
  
       return  {
                user:user,
                upass:upass,
                canLogin: canLogin,
                keeplogininfo:keeplogininfo,
                activate:function(){
                    this.user(appConfig.app.user);
                    this.upass(appConfig.app.upass);
                },
                dologin:function(){
               // alert('dologin');
                var checkbox=$("#checkbox1");
            
                appConfig.appfunction.system.doLogin(this.user(),this.upass(),fnSuccess, fnError, fnSyserror);
                function fnSuccess(data){
                     var baseUrl=appConfig.app.baseUrl;
                    
                     var dbs=new dbHelper(baseUrl,data.user,data.ucode);
                     appConfig.app.dbs=dbs;
                     router.navigate('#dinnerlist');
                     // dialog.showMessage(data.message,"登入成功!");
                }
                function fnError(data){
                     dialog.showMessage(data.message,"登入失败!");
                     appConfig.app.dbs=null;
                     router.navigate('#');
                     
                }
                function fnSyserror(jqXHR, textStatus, errorThrown){
                        alert("error");
                    }
         }
       };
}); 