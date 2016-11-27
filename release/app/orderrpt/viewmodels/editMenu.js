define(['plugins/dialog', 'knockout'], function (dialog, ko) {
            var baseUrl=appConfig.app.baseUrl;
            var getMethod=appConfig.app.getMethod;
            var saveMethod=appConfig.app.saveMethod;
            var ucode = appConfig.app.ucode;
            var user  = appConfig.app.user;
            var dbs=new dbHelper(baseUrl,user,ucode);
            var resid=appConfig.meetingroom.resid;
            var subresid=appConfig.meetingroom.subresid;
            
            var mid;
    
    editMenu.prototype.cancel = function() {
        dialog.close(this);              
    };
    editMenu.prototype.ok = function() {
        var that=this;
        dialog.close(that);
        
    };
    editMenu.prototype.attached=function(){
       
    };
   

    editMenu.show = function(mdata){
        //mid=mdata;
        return dialog.show(new editMenu());
    };
    
    return editMenu;
});