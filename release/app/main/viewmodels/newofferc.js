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
            if(cfnData.C3_534187101971<=6){
                var dates=mini.getbyName('C3_535826527531').text;
                o.C3_536319464780="This is "+o.C3_535826470338+" it has been approved by Jerry and Kurt on headcount "+dates
            }else {
                o.C3_536319464780=$('#val1').val();
            }
            // console.log(o.C3_536319464780);
            var json = mini.encode([o]);
            // console.log(json);
            dbs.dbSavedata(cfnid,0,json);
            dialog.close(that);
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
        // console.log(cfnData.C3_534187101971);
        if(cfnData.C3_534187099299!="Y"&&cfnData.C3_534187101971>6){
            $("#opt1").empty();
            var list='1.<span class="mini-textbox mini-textarea" style="border-width: 0px; width: 840px; height: 28px;"><textarea id="val1" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_536319464780" style="height: 26px;border-style:none"></textarea></span>'
            $("#opt1").append(list);
        }else{
            var cfn=mini.getbyName('C3_535826470338');
            cfn.setReadOnly(true);
            cfn.setIsValid(true);
            cfn.addCls("asLabel");
        }
        if(cfnData.C3_536319464780&&cfnData.C3_534187101971>6){
            $("#opt1").empty();
            var list='1.<span class="mini-textbox mini-textarea" style="border-width: 0px; width: 840px; height: 28px;"><textarea id="val1" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_536319464780" style="height: 26px;border-style:none"></textarea></span>'
            $("#opt1").append(list);
            $('#val1').val(cfnData.C3_536319464780);
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
        // if(cfnData.C3_534187099299=="Y"){
        //     fields = form.getFields();                
        //     for (var i = 0, l = fields.length; i < l; i++) {
        //         var c = fields[i];
        //         if (c.setReadOnly) c.setReadOnly(true);     //只读
        //         if (c.setIsValid) c.setIsValid(true);      //去除错误提示
        //         if (c.addCls) c.addCls("asLabel");          //增加asLabel外观
        //     }
        // }else{
            cfnn=function(){
                // if(cfnData.C3_534187101971<=6)cfnData.C3_535826470338=mini.getbyName('C3_535826470338').value;
                cfnData.C3_536319472674=mini.getbyName('C3_536319472674').value;
                cfnData.C3_536319473964=mini.getbyName('C3_536319473964').value;
                cfnData.C3_536319475165=mini.getbyName('C3_536319475165').value;
                cfnData.C3_536319476423=mini.getbyName('C3_536319476423').value;
                cfnData.C3_536319478009=mini.getbyName('C3_536319478009').value;
                setTimeout(function() {
                    cfnop.show().then(function(opn){
                        if(opn){
                            cfnData.C3_534188517500=opn.C3_305737857578;
                            cfnData.C3_534188520203=opn.C3_227192484125;
                            cfnData.C3_534188545242=opn.C3_227192472953;
                            var form = new mini.Form("form7");
                            form.setData(cfnData);
                            if(cfnData.C3_534187101971>6){
                                $("#opt1").empty();
                                var list='1.<span class="mini-textbox mini-textarea" style="border-width: 0px; width: 840px; height: 28px;"><textarea id="val1" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_536319464780" style="height: 26px;border-style:none"></textarea></span>'
                                $("#opt1").append(list);
                                $('#val1').val(cfnData.C3_536319464780);
                            }
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
        // }
        form.setData(cfnData);
    };
    newofferc.show = function(e){
        cfnData=e;
        // console.log(cfnData.C3_536319464780);
        return dialog.show(new newofferc());
    };
   
    return newofferc;
});
 