define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var resid=appConfig.app.resid;
    var cpnid=appConfig.app.cpnid;
    var cpn="",cmswhere="";
    var editmenu = function() {
    };
    editmenu.prototype.cancel = function() {
        dialog.close(this);              
    };
    editmenu.prototype.del = function(){
        var that=this;
        if(confirm('您确定要删除么？')){
            mini.parse();
            var form = new mini.Form("editform");
            var o =  new mini.Form("editform").getData();
            form.validate(); 
            if (form.isValid() == false) return;
            o._id=1;
            o._state="modified";
            o.C3_533643824454="Y";
            var json = mini.encode([o]);
            dbs.dbSavedata(resid,0,json,dataSaved,fnerror,fnhttperror);
            function dataSaved(text){
                dialog.showMessage('<h1>删除成功</h1>','菜品编辑',['返回'],true);
                dialog.close(that);
            };
            function fnerror(text){
                dialog.showMessage(text.message,'删除失败',['返回'],true);
            };
            function fnhttperror(jqXHR, textStatus, errorThrown){
                dialog.showMessage('error','菜品编辑',['返回'],true);
            }
        }else{
            return;
        }
    };
    editmenu.prototype.ok = function() {
        var that=this;
        var form = new mini.Form("editform");
        var o =  new mini.Form("editform").getData();
        form.validate(); 
        if (form.isValid() == false) return;
        o._id=1;
        o._state="modified";
        var json = mini.encode([o]);
        console.log(json);
        dbs.dbSavedata(resid,0,json,dataSaved,fnerror,fnhttperror);
        function dataSaved(text){
            dialog.showMessage('<h1>修改成功</h1>','菜品编辑',['返回'],true);
            dialog.close(that);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'编辑失败',['返回'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            dialog.showMessage('error','菜品编辑',['返回'],true);
        }
    };
    editmenu.prototype.attached=function(){
        mini.parse();
        cmswhere="C3_511302131411='"+cpn+"'";
        dbs.dbGetdata(resid,0,cmswhere,fnSuccess,null,null);//获取并设置页面数据
        function fnSuccess(data){
            var form = new mini.Form("editform");
            form.setData(data[0]);
        }
    };
   

    editmenu.show = function(cpnm){
        cpn=cpnm;
        return dialog.show(new editmenu());
    };
    
    return editmenu;
});