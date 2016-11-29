define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var cbnid=appConfig.app.cbnid;
    var cmswhere="";
    var relcbn = function() {
    };
    relcbn.prototype.cbList=ko.observableArray([]),
    relcbn.prototype.attached=function(){
        mini.parse();
        var me=this;
        dbs.dbGetdata(cbnid,0,cmswhere,fnSuccess,null,null);//获取并设置页面数据
        function fnSuccess(data){
            me.cbList(data);
        };
        cbnm=function(cbn){
            dialog.close(me,cbn);
        }
    };
   

    relcbn.show = function(){
        return dialog.show(new relcbn());
    };
    
    return relcbn;
});