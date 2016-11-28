define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var resid=appConfig.app.resid;
    // var cpnid=appConfig.app.cpnid;
    // var cmswhere="";
    var addmenu = function() {
    };
    addmenu.prototype.cancel = function() {
        dialog.close(this);              
    };
    addmenu.prototype.ok = function() {
        var that=this;
        var form = new mini.Form("form1");
        var o =  new mini.Form("form1").getData();
        console.log(o);
        form.validate(); 
        if (form.isValid() == false) return;
        o._id=1;
        o._state="added";
        var json = mini.encode([o]);
        dbs.dbSavedata(resid,0,json,dataSaved,fnerror,fnhttperror);
        function dataSaved(text){
            dialog.showMessage('<h1>新增成功</h1>','菜品新增',['返回'],true);
            dialog.close(that);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'新增失败',['返回'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            dialog.showMessage('error','菜品新增',['返回'],true);
        }
        
    };
    addmenu.prototype.attached=function(){
        mini.parse();
    };
   

    addmenu.show = function(){
        return dialog.show(new addmenu());
    };
    
    return addmenu;
});