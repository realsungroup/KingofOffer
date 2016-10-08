define(['durandal/app','knockout','plugins/router'], function (app,ko,router) {
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
         dologin:function(){
             alert('dologin');
             var checkbox=$("#checkbox1");
              alert(this.user());
               alert(this.upass());
               alert(this.keeplogininfo());
           router.navigate('#flightapplication');

         }
            
       };
}); 