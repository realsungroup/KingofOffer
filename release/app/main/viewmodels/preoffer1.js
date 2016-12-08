define(['durandal/app','knockout','plugins/router','plugins/dialog','./recop'], function (app,ko,router,dialog,recop) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var opaid=appConfig.offer.opaid;
    var editdata;
    var preoffer1 = function() {
    };
    preoffer1.prototype.cancel = function() {
        dialog.close(this);
    };
    preoffer1.prototype.attached=function(){
        mini.parse();
        var form = new mini.Form("form3");
        form.setData(preview);
        var fields = form.getFields();                
        for (var i = 0, l = fields.length; i < l; i++) {
            var c = fields[i];
            if (c.setReadOnly) c.setReadOnly(true);     //只读
            if (c.setIsValid) c.setIsValid(true);      //去除错误提示
            if (c.addCls) c.addCls("asLabel");          //增加asLabel外观
        }
    };
    preoffer1.show = function(e){
        console.log(e);
        preview=e;
        return dialog.show(new preoffer1());
    };
   
    return preoffer1;
});
    