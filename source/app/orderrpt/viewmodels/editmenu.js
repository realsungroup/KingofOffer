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
    editmenu.prototype.ok = function() {
        var that=this;
        dialog.close(that);
        
    };
    editmenu.prototype.attached=function(){
        mini.parse();
        // menuIndex=function(self){
        //     dbs.dbGetdata(cpnid,0,cmswhere,fnSuccess,null,fnhttperror);
        //     function fnSuccess(data){
        //         self.mIndex(data);
        //     };
        //     function fnhttperror(jqXHR, textStatus, errorThrown){
        //         console.log(jqXHR);
        //     };
        // };
        // menuIndex(this);
        cmswhere="C3_530883695470="+cpn;
        dbs.dbGetdata(resid,0,cmswhere,fnSuccess,null,null);//获取并设置页面数据
        function fnSuccess(data){
            console.log(data);
            var form = new mini.Form("editform");
            form.setData(data[0]);
            var fileupload=mini.get("fileupload1");
            fileupload.setUploadUrl(appConfig.app.uploadFileUrl+appConfig.app.uppath+appConfig.app.httppath);
            var imgfield=mini.get('imgurl');
            var imgurl=imgfield.getValue();
            if (imgurl)
            { 
                var img=$("#imgUploaded");
                img[0].src=imgurl;
            }   
        }
    };
   

    editmenu.show = function(cpnm){
        cpn=cpnm;
        return dialog.show(new editmenu());
    };
    
    return editmenu;
});