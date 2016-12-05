define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var recid=appConfig.offer.recid;
    var recop = function() {
    };
    recop.prototype.recopList=ko.observableArray([]),
    recop.prototype.attached=function(){
        var me=this;
        dbs.dbGetdata(recid,0,"",fnSuccess,null,null);//获取并设置页面数据
        function fnSuccess(data){
            me.recopList(data);
            // console.log(data);
        };
        opnm=function(opn){
            dialog.close(me,opn);
        }
    };
    recop.prototype.cancel = function() {
        dialog.close(this);              
    };

    recop.show = function(){
        return dialog.show(new recop());
    };
    
    return recop;
});