define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var ctnid=appConfig.app.ctnid;
    var cmswhere="";
    var relctn = function() {
    };
    relctn.prototype.cancel = function() {
        dialog.close(this);              
    };
    relctn.prototype.ok = function(ctn) {
        
        console.log(ctn);
        var that=this;
        dialog.close(that);
    };
    relctn.prototype.ctList=ko.observableArray([]),
    relctn.prototype.attached=function(){
        mini.parse();
        var me=this;
        dbs.dbGetdata(ctnid,0,cmswhere,fnSuccess,null,null);//获取并设置页面数据
        function fnSuccess(data){
            me.ctList(data);
        };
        ctnm=function(ctn){
            dialog.close(me,ctn);
        }
    };
   

    relctn.show = function(){
        return dialog.show(new relctn());
    };
    
    return relctn;
});