define(['durandal/app','knockout','plugins/router','plugins/dialog','./cfnop'], function (app,ko,router,dialog,cfnop) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var cfnid=appConfig.offer.cfnid;
    var cfnData;
    var newofferc = function() {
    };
    newofferc.prototype.cancel = function() {
        dialog.close(this);
    };
    newofferc.prototype.submit = function() {
        $('.fbb').attr({"disabled":"disabled"});
        setTimeout(function() {
            $('.fbb').removeAttr("disabled");
        }, 1000);
        var that=this;
        var form = new mini.Form("form7");
        var o =  new mini.Form("form7").getData();
        form.validate(); 
        if (form.isValid() == false) return;
        o._id=1;
        o._state="modified";
        o.REC_ID=cfnData.REC_ID;
        o.C3_534187099299='Y';
        var json = mini.encode([o]);
        dbs.dbSavedata(cfnid,0,json,dataSaved,fnerror,fnhttperror);
        function dataSaved(text){
            dialog.showMessage('<h1>Success</h1>','Save',['Cancel'],true);
            dialog.close(that);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'Error',['Cancel'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            dialog.showMessage('error','Save',['Cancel'],true);
        }
        
    };
    newofferc.prototype.activate=function(){
        showImg=function(no){
            if(no=="img1"){
                $("#imgUploaded").removeAttr("hidden"); 
            }else if(no=="img2"){
                $("#imgUploaded2").removeAttr("hidden"); 
            }
        };
    };
    newofferc.prototype.attached=function(){
        mini.parse();
        var form = new mini.Form("form7");
        cfnData.C3_534339050633=cfnData.C3_534187095838*12;
        form.setData(cfnData);
        cfnn=function(){
            setTimeout(function() {
                cfnop.show().then(function(opn){
                    if(opn){
                        cfnData.C3_534188517500=opn.C3_305737857578;
                        cfnData.C3_534188520203=opn.C3_227192484125;
                        cfnData.C3_534188545242=opn.C3_227192472953;
                        var form = new mini.Form("form7");
                        form.setData(cfnData);
                    }
                });
            }, 200);
        }
        if(cfnData.C3_534187097298){
            var a1=$("#ahref");
            a1[0].href=cfnData.C3_534187097298;
        }else{
            $("#ahref").hide();
        }
        if(cfnData.C3_534187097504){
            var a2=$("#ahref2");
            a2[0].href=cfnData.C3_534187097504;
        }else{
            $("#ahref2").hide();
        }
    };
    newofferc.show = function(e){
        cfnData=e;
        return dialog.show(new newofferc());
    };
   
    return newofferc;
});
 