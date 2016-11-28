define(['durandal/app','knockout','plugins/router','plugins/dialog','calendar/fullcalendar','durandal/viewEngine','jqueryprint'], function (app,ko,router,dialog,fullcalendar,viewEngine) {
    return {
        activate:function(){},
        mList:ko.observableArray([]),
        mIndex:ko.observableArray([]),
        attached:function(){
            baseUrl=appConfig.app.baseUrl;
            var ucode = appConfig.app.ucode;
            var user  = appConfig.app.user;
            var dbs=new dbHelper(baseUrl,user,ucode);
            var cpnid=appConfig.app.cpnid;
            var resid=appConfig.app.resid;
            var cmswhere="",cpn="";
            var me=this;
            menuIndex=function(self){
                dbs.dbGetdata(cpnid,0,cmswhere,fnSuccess,null,fnhttperror);
                function fnSuccess(data){
                    self.mIndex(data);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                };
            };
            menuList=function(self,cpn){
                if(cpn){
                    cmswhere="C3_530883695470='"+cpn+"'";
                };
                dbs.dbGetdata(resid,0,cmswhere,fnSuccess,null,fnhttperror);
                function fnSuccess(data){
                    self.mList(data);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                };
            }
            menuIndex(this);
            menuList(this);
            menuListcp1=function(cpn){
                menuList(me,cpn.C3_511301864786);
            };
            add=function(){
                addmenu.show().then(function(){
                    menuList(me);
                });
            };
        }
    }
})