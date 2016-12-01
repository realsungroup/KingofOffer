define(['durandal/app','knockout','plugins/router','plugins/dialog','./relcbn','./relctn','./relcpn'], function (app,ko,router,dialog,relcbn,relctn,relcpn) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var relid=appConfig.app.relid;
    var cnn={};
    var relmenu = function() {
    };
    relmenu.prototype.cancel = function() {
        dialog.close(this);
    };
    relmenu.prototype.ok = function() {
        var that=this;
        var form = new mini.Form("form2");
        var o =  new mini.Form("form2").getData();
        form.validate(); 
        if (form.isValid() == false) return;
        o._id=1;
        o._state="added";
        o.C3_530885453314="N"
        var json = mini.encode([o]);
        dbs.dbSavedata(relid,0,json,dataSaved,fnerror,fnhttperror);
        function dataSaved(text){
            // dialog.showMessage('<h1>发布成功</h1>','菜品发布',['返回'],true);
            dialog.close(that);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'发布失败',['返回'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            dialog.showMessage('error','菜品发布',['返回'],true);
        }
        
    };
    relmenu.prototype.attached=function(){
        mini.parse();
        cnn={};
        $("input[name*='C3_529015877010']").focus(function(){
            relcbn.show().then(function(cbn){
                if(cbn){
                    cnn.C3_529015876735=cbn.C3_511307409286;
                    cnn.C3_529015877010=cbn.C3_511307425895;
                    var form = new mini.Form("form2");
                    form.setData(cnn);
                }
            });
        });
        $("input[name*='C3_529015233937']").focus(function(){
            relctn.show().then(function(ctn){
                if(ctn){
                    cnn.C3_529015233619=ctn.C3_511301141786;
                    cnn.C3_529015233937=ctn.C3_511301160005;
                    var form = new mini.Form("form2");
                    form.setData(cnn);
                }
            });
        });
        $("input[name*='C3_529015358827']").focus(function(){
            relcpn.show().then(function(cpn){
                if(cpn){
                    cnn.C3_529015295101=cpn.C3_511302066880;
                    cnn.C3_529015358827=cpn.C3_511302131411;
                    var form = new mini.Form("form2");
                    form.setData(cnn);
                }
            });
        });
    };
   

    relmenu.show = function(){
        return dialog.show(new relmenu());
    };
    
    return relmenu;
});