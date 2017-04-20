define(['durandal/app','knockout','plugins/router','plugins/dialog','./cfnop','./recop'], function (app,ko,router,dialog,cfnop,recop) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var cfnid=appConfig.offer.cfnid;
    var efnData;
    var mName="";
    var editofferc = function() {
    };
    editofferc.prototype.cancel = function() {
        dialog.close(this);
    };
    editofferc.prototype.save = function() {
        if(confirm('Are you sure you want to save it?')){
            var that=this;
            var form = new mini.Form("form9");
            var o =  new mini.Form("form9").getData();
            form.validate(); 
            if (form.isValid() == false) return;
            o._id=1;
            o._state="modified";
            o.REC_ID=efnData.REC_ID;
            var json = mini.encode([o]);
            dbs.dbSavedata(cfnid,0,json);
            dialog.close(that);
        }
    };
    editofferc.prototype.activate=function(){
    };
    editofferc.prototype.attached=function(){
        mini.parse();
        var form = new mini.Form("form9");
        form.setData(efnData);
    };
    editofferc.show = function(e){
        efnData=e;
        return dialog.show(new editofferc());
    };
   
    return editofferc;
});
 