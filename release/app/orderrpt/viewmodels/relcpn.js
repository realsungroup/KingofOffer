define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var cpnid=appConfig.app.cpnid;
    var cmswhere="";
    var cpm="";
    var relcpn = function() {
    };
    relcpn.prototype.cancel = function() {
        dialog.close(this);              
    };
    relcpn.prototype.ok = function(cpn) {
        
        console.log(cpn);
        var that=this;
        dialog.close(that);
    };
    relcpn.prototype.cpList=ko.observableArray([]),
    relcpn.prototype.cpIndex=ko.observableArray([]),
    relcpn.prototype.attached=function(){
        mini.parse();
        var me=this;
        
            dbs.dbGetdata(cpnid,0,cmswhere,fnSuccess,null,null);//获取并设置页面数据
            function fnSuccess(data){
                me.cpList(data);
            };
            cpnm=function(cpn){
                dialog.close(me,cpn);
            }
    };
   

    relcpn.show = function(){
        return dialog.show(new relcpn());
    };
    
    return relcpn;
});