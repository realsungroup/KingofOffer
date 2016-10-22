define(['durandal/app','knockout','plugins/router','plugins/dialog','./scanner'], function (app,ko,router,dialog,scanner) {
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
                     var vartemp=(JSON.parse(localStorage.getItem('doWindowlogin')));
                     var self=this;
                     //alert(text);
         
                     var text;
                     if (vartemp)
                     {
                         text=mini.encode(vartemp);
                     }
                    if (text){
                       if (text.length>0){
                                 appConfig.appfunction.system.doParseText(text,fnSuccess,fnError);
                                 function fnSuccess(){
                                            self.user(appConfig.app.user);
                                            self.upass(appConfig.app.upass);
                                            self.dologin();
                                       }
                                 function fnError(error){
       
                                          
                                           appConfig.app.dbs=null;
                                           localStorage.setItem('doWindowlogin',"");
                                           self.user("");
                                           self.upass("");
                                           router.navigate('#');
                            
                                       }
                              
                           }
                          
                    }
                   
       
                },
                attached:function(){
                    var self=this;
                    if (!this.canLogin||appConfig.app.loginUrl==""){
                         scanner.show().then(function(response) {
                               // system.log(response);
                                appConfig.appfunction.system.doWindowlogin(response,fnSuccess,fnError);
                                function fnSuccess(){
                                     self.user(appConfig.app.user);
                                     self.upass(appConfig.app.upass);
                                     self.dologin();
                                }
                                function fnError(error){

                                    dialog.showMessage(error,"窗口机登入失败!");
                                    appConfig.app.dbs=null;
                                    router.navigate('#');
                     
                                }
                        });

                    }
                    else{
                         this.dologin();
                    }
                   

                },
                dologin:function(){
                var checkbox=$("#checkbox1");
                appConfig.appfunction.system.doLogin(this.user(),this.upass(),fnSuccess, fnError, fnSyserror);
                function fnSuccess(data){
                     var baseUrl=appConfig.app.localbaseUrl;
                     var dbs=new dbHelper(baseUrl,data.user,data.ucode);
                     appConfig.app.dbs=dbs;
                     router.navigate('#dinnerlist');
                     
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