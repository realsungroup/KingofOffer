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
                    cmswhere="C3_530883695470="+cpn;
                };
                dbs.dbGetdata(resid,0,cmswhere,fnSuccess,null,fnhttperror);
                function fnSuccess(data){
                    self.mList(data);
                    // console.log(data)
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
                editmenu.show(cpn.C3_511302131411);
                //console.log(cpn.C3_511302131411);
            };
            add=function(){
                addmenu.show().then(function(){
                    menuList(me);
                });
            };
            menuDel = function(cpn){//删除按钮
                if(confirm('您确定要删除么？')){
                    mini.parse();
                    var form = new mini.Form("form");
                    var o =  new mini.Form("form").getData();
                    form.validate(); 
                    if (form.isValid() == false) return;
                    o._id=1;
                    o._state="modified";
                    o.C3_533643824454="Y";
                    console.log(cpn.C3_511302131411);
                    var json = mini.encode([o]);
                    console.log(json);
                    dbs.dbSavedata(resid,0,json,dataSaved,fnerror,fnhttperror);
                    function dataSaved(text){
                        dialog.showMessage('<h1>删除成功</h1>','菜单维护',['返回'],true);
                        menuList(me);
                        dialog.close(that);
                    }
                    function fnerror(text){
                        console.log(text.message);
                        // dialog.showMessage(text.message,'删除失败',['返回'],true);
                    }
                    function fnhttperror(jqXHR, textStatus, errorThrown){
                        dialog.showMessage('error','错误',['返回'],true);
                    }
                }else{
                    return;
                }
            };
        }
    }
})