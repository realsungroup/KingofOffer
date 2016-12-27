define(['durandal/app','knockout','plugins/router','plugins/dialog','./cfnop','./recop'], function (app,ko,router,dialog,cfnop,recop) {
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
        if(confirm('Are you sure you want to submit it?')){
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
            if(cfnData.C3_534187099299=="Y"){
                o.C3_534187100944='Y';
            }else{
                o.C3_534187099299='Y';
            }
            var json = mini.encode([o]);
            dbs.dbSavedata(cfnid,0,json);//,dataSaved,fnerror,fnhttperror);
            // function dataSaved(text){
            //     dialog.showMessage('<h1>Success</h1>','Save',['Cancel'],true);
                dialog.close(that);
            // };
            // function fnerror(text){
            //     dialog.showMessage(text.message,'Error',['Cancel'],true);
            // };
            // function fnhttperror(jqXHR, textStatus, errorThrown){
            //     dialog.showMessage('error','Save',['Cancel'],true);
            // }
        }
    };
    newofferc.prototype.activate=function(){
    };
    newofferc.prototype.attached=function(){
        mini.parse();
        var form = new mini.Form("form7");
        cfnData.C3_534187094490s=cfnData.C3_534187094490;
        cfnData.C3_534187093586s=cfnData.C3_534187093586;
        cfnData.C3_534264724518s=cfnData.C3_534264724518;
        cfnData.C3_535826470338s=cfnData.C3_535826470338;
        if(cfnData.C3_534187101971>6){
            cfnData.C3_535826470338="";
            var ed=mini.getbyName('C3_535826470338');
            ed.addCls("asLabel");
        }else{
            var cfn=mini.getbyName('C3_535826470338');
            cfn.setReadOnly(true);
            cfn.setIsValid(true);
            cfn.addCls("asLabel");
            var de=mini.getbyName('C3_535826527531');
            // de.setReadOnly(true);
            // de.setIsValid(true);
            // de.addCls("asLabel");
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
        if(cfnData.C3_534187099299=="Y"){
            fields = form.getFields();                
            for (var i = 0, l = fields.length; i < l; i++) {
                var c = fields[i];
                if (c.setReadOnly) c.setReadOnly(true);     //只读
                if (c.setIsValid) c.setIsValid(true);      //去除错误提示
                if (c.addCls) c.addCls("asLabel");          //增加asLabel外观
            }
            form.setData(cfnData);
        }else{
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
            cfnm=function(){
                setTimeout(function() {
                    recop.show().then(function(opn){
                        if(opn){
                            cfnData.C3_534187093586=opn.C3_522691669347;
                            cfnData.C3_534264724518=opn.C3_522691670096;
                            var form = new mini.Form("form7");
                            form.setData(cfnData);
                        }
                    });
                }, 200);
            }
            sRange=function(e){
                var sv=mini.getbyName('C3_536089623045');
                if(e.value<cfnData.C3_534187097705){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    sv.setValue(cfnData.C3_534187097705);
                }else if(e.value>cfnData.C3_534187097900){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    sv.setValue(cfnData.C3_534187097900);
                }
            }
            var c2=mini.getbyName('C2');
            c2.addCls("asLabel");
            var c3=mini.getbyName('C3');
            c3.addCls("asLabel");
            var c4=mini.getbyName('C4');
            c4.addCls("asLabel");
            var c5=mini.getbyName('C5');
            c5.addCls("asLabel");
            var c6=mini.getbyName('C6');
            c6.addCls("asLabel");
            var jt=mini.getbyName('C3_534187093586s');
            jt.setReadOnly(true);
            jt.setIsValid(true);
            jt.addCls("asLabel"); 
            var ce=mini.getbyName('C3_534187094490s');
            ce.setReadOnly(true);
            ce.setIsValid(true);
            ce.addCls("asLabel"); 
            var hm=mini.getbyName('C3_534264724518s');
            hm.setReadOnly(true);
            hm.setIsValid(true);
            hm.addCls("asLabel"); 
        }
    };
    newofferc.show = function(e){
        cfnData=e;
        return dialog.show(new newofferc());
    };
   
    return newofferc;
});
 