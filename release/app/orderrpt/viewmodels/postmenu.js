define(['plugins/http','durandal/app','knockout','durandal/system','plugins/router','plugins/dialog','durandal/viewEngine','jqueryprint','./relmenu'], function (http,app,ko,router,dialog,fullcalendar,viewEngine,system,relmenu) {
    return {
        activate:function(){},
        rList:ko.observableArray([]),
        attached:function(){
            baseUrl=appConfig.app.baseUrl;
            var ucode = appConfig.app.ucode;
            var user  = appConfig.app.user;
            var dbs=new dbHelper(baseUrl,user,ucode);
            // var cpnid=appConfig.app.cpnid;
            var relid=appConfig.app.relid;
            var cmswhere="",cp={};
            var me=this;
            var i=1;
            relList=function(self,cpn){
                if(cpn){
                    cmswhere="C3_530883695470='"+cpn+"'";
                };
                dbs.dbGetdata(relid,0,cmswhere,fnSuccess,null,fnhttperror);
                function fnSuccess(data){
                    self.rList(data);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                };
            }
            relList(this);
            addRel=function(){
                relmenu.show().then(function(){
                    relList(me);
                });
            };
            upClick=function(cpn){
                cp._id=1;
                cp._state="modified";
                cp.C3_530885453314="Y";
                cp.REC_ID=cpn.REC_ID;
                json="["+JSON.stringify(cp)+"]";
                dbs.dbSavedata(relid,0,json);
                setTimeout(function() {
                    relList(me);
                }, 200);
            };
            downClick=function(cpn){
                cp._id=1;
                cp._state="modified";
                cp.C3_530885453314="N";
                cp.REC_ID=cpn.REC_ID;
                json="["+JSON.stringify(cp)+"]";
                dbs.dbSavedata(relid,0,json);
                setTimeout(function() {
                    relList(me);
                }, 200);
            };
        }
    }
})