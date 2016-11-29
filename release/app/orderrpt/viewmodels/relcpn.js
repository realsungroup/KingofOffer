define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var cpnid=appConfig.app.cpnid;
    var cpmid=appConfig.app.cpmid;
    var cmswhere="";
    var cpn="";
    var relcpn = function() {
    };
    relcpn.prototype.cpList=ko.observableArray([]),
    relcpn.prototype.cpIndex=ko.observableArray([]),
    relcpn.prototype.attached=function(){
        mini.parse();
        var me=this;
        dbs.dbGetdata(cpnid,0,cmswhere,fnSuccess,null,fnhttperror);
        function fnSuccess(data){
            me.cpIndex(data);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
        };
        cpmList=function(cpn){
            if(cpn){
                cmswhere="C3_530883695470='"+cpn.C3_511301864786+"'";
                $(":contains('"+cpn.C3_511301864786+"')").parent().addClass('bgb').siblings().removeClass('bgb');
            };
            dbs.dbGetdata(cpmid,0,cmswhere,fnSuccess,null,null);//获取并设置页面数据
            function fnSuccess(data){
                me.cpList(data);
            };
        };
        cpmList();
        cpnm=function(cpn){
            dialog.close(me,cpn);
        }
    };
   

    relcpn.show = function(){
        return dialog.show(new relcpn());
    };
    
    return relcpn;
});