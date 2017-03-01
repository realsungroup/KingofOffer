define(['durandal/app','knockout','plugins/router','plugins/dialog','./cfnop','./recop'], function (app,ko,router,dialog,cfnop,recop) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var cfnid=appConfig.offer.cfnid;
    var cfnData;
    var eadid=appConfig.offer.eadid;
    var mName="";
    var newofferc = function() {
    };
    newofferc.prototype.subList=ko.observableArray([]),
    newofferc.prototype.cancel = function() {
        dialog.close(this);
    };
    newofferc.prototype.ok = function() {
        if(confirm('Are you sure you want to approve it?')){
            if(cfnData.C3_534188520203==""){
                mini.getbyName('C3_534188520203').focus();
            }
            var sv=mini.getbyName('C3_536089623045');
            if(sv.value<cfnData.C3_534187097705){
                alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                sv.setValue(cfnData.C3_534187097705);
                sv.focus();
                return;
            }else if(sv.value>cfnData.C3_534187097900){
                alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                sv.setValue(cfnData.C3_534187097900);
                sv.focus();
                return;
            }
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
                o.C3_534188520203=mName;
            }else{
                o.C3_534187099299='Y';
            }
            var json = mini.encode([o]);
            dbs.dbSavedata(cfnid,0,json);
            dialog.close(that);
        }
    };
    newofferc.prototype.no = function() {
        if(confirm('Are you sure you want to reject it?')){
            var sv=mini.getbyName('C3_536089623045');
            if(sv.value<cfnData.C3_534187097705){
                alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                sv.setValue(cfnData.C3_534187097705);
                sv.focus();
                return;
            }else if(sv.value>cfnData.C3_534187097900){
                alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                sv.setValue(cfnData.C3_534187097900);
                sv.focus();
                return;
            }
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
                o.C3_534187100944='N';
                o.C3_534188520203=mName;
            }else{
                o.C3_534187099299='Y';
            }
            var json = mini.encode([o]);
            dbs.dbSavedata(cfnid,0,json);
            dialog.close(that);
        }
    };
    newofferc.prototype.save = function() {
        if(confirm('Are you sure you want to save it?')){
            var sv=mini.getbyName('C3_536089623045');
            if(sv.value<cfnData.C3_534187097705){
                alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                sv.setValue(cfnData.C3_534187097705);
                sv.focus();
                return;
            }else if(sv.value>cfnData.C3_534187097900){
                alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                sv.setValue(cfnData.C3_534187097900);
                sv.focus();
                return;
            }
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
            var json = mini.encode([o]);
            dbs.dbSavedata(cfnid,0,json);
            dialog.close(that);
        }
    };
    newofferc.prototype.activate=function(){
    };
    newofferc.prototype.attached=function(){
        mini.parse();
        if(cfnData.C3_534187099299!="Y"){
            $('#fbb').val("Submit");
            $('#fbc').hide();
        }else{
            $('#fbd').hide();
        }
        if(!((cfnData.C3_534187093868=="M3"||cfnData.C3_534187093868=="M4")&&cfnData.C3_541165035428=="Y")){
            $('#lgid').hide();
        }else{
            var lg=mini.getbyName('C3_534187093868');
            lg.addCls("asLabel");
        }
        var me=this;
        cmswhere="REC_ID='"+cfnData.REC_ID+"'";
        dbs.dbGetdata(cfnid,eadid,cmswhere,fnSuccess,fnerror,fnhttperror);
        function fnSuccess(data,subdata){
            // console.log(subdata);
            me.subList(subdata);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'失败',['返回'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            alert(jqXHR);
        };
        var form = new mini.Form("form7");
        cfnData.C3_534187094490s=cfnData.C3_534187094490;
        cfnData.C3_534187093586s=cfnData.C3_534187093586;
        cfnData.C3_534264724518s=cfnData.C3_534264724518;
        cfnData.C3_535826470338s=cfnData.C3_535826470338;
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
        cfnn=function(){
            if(cfnData.C3_534187099299!="Y"){
                cfnData.C3_536319472674=mini.getbyName('C3_536319472674').value;
                cfnData.C3_536319473964=mini.getbyName('C3_536319473964').value;
                cfnData.C3_536319475165=mini.getbyName('C3_536319475165').value;
                cfnData.C3_536319476423=mini.getbyName('C3_536319476423').value;
                cfnData.C3_536319478009=mini.getbyName('C3_536319478009').value;
                cfnData.C3_536089623045=mini.getbyName('C3_536089623045').value;
                setTimeout(function() {
                    cfnop.show().then(function(opn){
                        if(opn){
                            cfnData.C3_534188520203=opn.C3_419343735913;
                            cfnData.C3_534188545242=opn.C3_227192472953;//工号
                            cfnData.C3_534188517500=opn.C3_305737857578;//编号
                            var form = new mini.Form("form7");
                            form.setData(cfnData);
                        }
                    });
                }, 200);
            }else{
                var c1=mini.getbyName('C3_534188520203');
                c1.setReadOnly(true);
            }
        }
        cfnm=function(){
            setTimeout(function() {
                recop.show().then(function(opn){
                    // console.log(opn);
                    if(opn){
                        cfnData.C3_534187093586=opn.C3_522691669347;
                        cfnData.C3_534264724518=opn.C3_522691670096;
                        cfnData.C3_534187094286=opn.C3_522691669878;
                        var form = new mini.Form("form7");
                        form.setData(cfnData);
                    }
                });
            }, 200);
        }
        sRange=function(){
            var sv=mini.getbyName('C3_536089623045');
            if(sv.value<cfnData.C3_534187097705){
                alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                sv.setValue(cfnData.C3_534187097705);
                sv.focus();
                return;
            }else if(sv.value>cfnData.C3_534187097900){
                alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                sv.setValue(cfnData.C3_534187097900);
                sv.focus();
                return;
            }
        }
        var c1=mini.getbyName('C3_536319464780');
        c1.addCls("asLabel");
        var c2=mini.getbyName('C3_536319472674');
        c2.addCls("asLabel");
        var c3=mini.getbyName('C3_536319473964');
        c3.addCls("asLabel");
        var c4=mini.getbyName('C3_536319475165');
        c4.addCls("asLabel");
        var c5=mini.getbyName('C3_536319476423');
        c5.addCls("asLabel");
        var c6=mini.getbyName('C3_536319478009');
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
        form.setData(cfnData);
    };
    newofferc.show = function(e){
        cfnData=e;
        mName=cfnData.C3_534188520203;
        // console.log(cfnData);
        return dialog.show(new newofferc());
    };
   
    return newofferc;
});
 