define(['plugins/http','durandal/app','knockout','durandal/system','plugins/router','plugins/dialog','durandal/viewEngine','jqueryprint','./editmenu','./addmenu'], function (http,app,ko,router,dialog,fullcalendar,viewEngine,system,editmenu,addmenu) {

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
            var cmswhere="",cp={};
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
                    console.log(data);
                    self.mList(data);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    // console.log(jqXHR);
                };
            }
            menuIndex(this);
            menuList(this);
            menuListcp=function(cpn){
                menuList(me,cpn.C3_511301864786);
            };
            editClick=function(cpn){
                editmenu.show(cpn.C3_511302131411).then(function(){
                    menuList(me);
                });
            };
            add=function(){
                addmenu.show().then(function(){
                    menuList(me);
                });
            };
            menuDel = function(cpn){//删除按钮
                if(confirm('您确定要删除么？')){
                    
                    cp._id=1;
                    cp._state="modified";
                    cp.C3_533643824454="Y";
                    cp.REC_ID=cpn.REC_ID;
                    json="["+JSON.stringify(cp)+"]";
                    console.log(json);
                    dbs.dbSavedata(resid,0,json);
                    setTimeout(function() {
                        menuList(me);
                    }, 200);
                }else{
                    return;
                }
            };
        }
    }
})