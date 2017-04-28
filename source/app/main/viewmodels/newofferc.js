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
            if(cfnData.C3_534187099299==null){
                var sv=$('#l3').val();
                if(parseFloat(sv)<parseFloat(cfnData.C3_534187097705)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    $('#l3').val(cfnData.C3_534187097705);
                    $('#l3').focus();
                    return;
                }else if(parseFloat(sv)>parseFloat(cfnData.C3_534187097900)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    $('#l3').val(cfnData.C3_534187097900);
                    $('#l3').focus();
                    return;
                }
            }else{
                var sv=mini.getbyName('C3_536089623045');
                if(parseFloat(sv.value)<parseFloat(cfnData.C3_534187097705)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    sv.setValue(cfnData.C3_534187097705);
                    sv.focus();
                    return;
                }else if(parseFloat(sv.value)>parseFloat(cfnData.C3_534187097900)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    sv.setValue(cfnData.C3_534187097900);
                    sv.focus();
                    return;
                }
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
            if(cfnData.C3_534187099299==null){
                o.C3_536089623045=$('#l3').val();
                o.C3_535826701051=$('#l2').val();
                o.C3_534264724518=$('#l1').val();
            }
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
            if(cfnData.C3_534187099299==null){
                var sv=$('#l3').val();
                if(parseFloat(sv)<parseFloat(cfnData.C3_534187097705)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    $('#l3').val(cfnData.C3_534187097705);
                    $('#l3').focus();
                    return;
                }else if(parseFloat(sv)>parseFloat(cfnData.C3_534187097900)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    $('#l3').val(cfnData.C3_534187097900);
                    $('#l3').focus();
                    return;
                }
            }else{
                var sv=mini.getbyName('C3_536089623045');
                if(parseFloat(sv.value)<parseFloat(cfnData.C3_534187097705)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    sv.setValue(cfnData.C3_534187097705);
                    sv.focus();
                    return;
                }else if(parseFloat(sv.value)>parseFloat(cfnData.C3_534187097900)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    sv.setValue(cfnData.C3_534187097900);
                    sv.focus();
                    return;
                }
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
            o.C3_544898150082='已拒绝';
            if(cfnData.C3_534187099299==null){
                o.C3_536089623045=$('#l3').val();
                o.C3_535826701051=$('#l2').val();
                o.C3_534264724518=$('#l1').val();
            }
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
            if(cfnData.C3_534187099299==null){
                var sv=$('#l3').val();
                if(parseFloat(sv)<parseFloat(cfnData.C3_534187097705)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    $('#l3').val(cfnData.C3_534187097705);
                    $('#l3').focus();
                    return;
                }else if(parseFloat(sv)>parseFloat(cfnData.C3_534187097900)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    $('#l3').val(cfnData.C3_534187097900);
                    $('#l3').focus();
                    return;
                }
            }else{
                var sv=mini.getbyName('C3_536089623045');
                if(parseFloat(sv.value)<parseFloat(cfnData.C3_534187097705)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    sv.setValue(cfnData.C3_534187097705);
                    sv.focus();
                    return;
                }else if(parseFloat(sv.value)>parseFloat(cfnData.C3_534187097900)){
                    alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                    sv.setValue(cfnData.C3_534187097900);
                    sv.focus();
                    return;
                }
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
            if(cfnData.C3_534187099299==null){
                o.C3_536089623045=$('#l3').val();
                o.C3_535826701051=$('#l2').val();
                o.C3_534264724518=$('#l1').val();
            }
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
        if(cfnData.C3_541165035428!=="Y"){
            $('#lgid').hide();
        }else{
            var lg=mini.getbyName('C3_534187093868');
            lg.addCls("asLabel");
        }
        var me=this;
        cmswhere="REC_ID='"+cfnData.REC_ID+"'";
        dbs.dbGetdata(cfnid,eadid,cmswhere,fnSuccess,fnerror,fnhttperror);
        function fnSuccess(data,subdata){
            for(var i=0;i<subdata.length;i++){
                if(subdata[i].C3_534187898986){
                    subdata[i].C3_534187898986=subdata[i].C3_534187898986.toLocaleDateString();
                }
            }
            me.subList(subdata);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'失败',['返回'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            alert(jqXHR);
        };
        var form = new mini.Form("form7");
        cfnData.C3_534187093868s=cfnData.C3_534187093868;
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
        if(cfnData.C3_541852509945){
            var a3=$("#ahref3");
            a3[0].href=cfnData.C3_541852509945;
        }else{
            $("#ahref3").hide();
        }
        cfnn=function(){
            if(cfnData.C3_534187099299!="Y"){
                cfnData.C3_536319472674=mini.getbyName('C3_536319472674').value;
                cfnData.C3_536319473964=mini.getbyName('C3_536319473964').value;
                cfnData.C3_536319475165=mini.getbyName('C3_536319475165').value;
                cfnData.C3_536319476423=mini.getbyName('C3_536319476423').value;
                cfnData.C3_536319478009=mini.getbyName('C3_536319478009').value;
                cfnData.C3_536089623045=$('#l3').val();
                cfnData.C3_535826701051=$('#l2').val();
                cfnData.C3_534264724518=$('#l1').val();
                cfnData.C3_544810053160=mini.getbyName('C3_544810053160').value;
                setTimeout(function() {
                    cfnop.show().then(function(opn){
                        if(opn){
                            cfnData.C3_534188520203=opn.C3_419343735913;
                            cfnData.C3_534188545242=opn.C3_227192472953;//工号
                            cfnData.C3_534188517500=opn.C3_305737857578;//编号
                            var form = new mini.Form("form7");
                            req();
                            form.setData(cfnData);
                        }
                    });
                }, 200);
            }else{
                mini.getbyName('C3_534188520203').setReadOnly(true);
            }
        }
        sRange=function(){
            var sv=mini.getbyName('C3_536089623045');
            if(parseFloat(sv.value)<parseFloat(cfnData.C3_534187097705)){
                alert("Salary range between"+cfnData.C3_534187097705+"~"+cfnData.C3_534187097900+"!");
                sv.setValue(cfnData.C3_534187097705);
                sv.focus();
                return;
            }else if(parseFloat(sv.value)>parseFloat(cfnData.C3_534187097900)){
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
        req=function(){
            if(cfnData.C3_534187099299==null){
                $('#rt').empty();
                var list1='<span class="mini-textbox" style="border-width: 0px;"><span class="mini-textbox-border"><input id="l1" value="'+cfnData.C3_534264724518+'" type="text" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_534264724518"></span><input type="hidden"></span>';
                $('#rt').append(list1);
                $('#pf').empty();
                if(cfnData.C3_535826701051==null){
                    cfnData.C3_535826701051="";
                }
                var list2='<span class="mini-textbox" style="border-width: 0px;"><span class="mini-textbox-border"><input id="l2" value="'+cfnData.C3_535826701051+'" type="text" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_535826701051"></span><input type="hidden"></span>'
                $('#pf').append(list2);
                $('#bs').empty();
                if(cfnData.C3_536089623045==null){
                    cfnData.C3_536089623045="";
                }
                var list3='RMB<span class="mini-textbox" style="border-width: 0px;"><span class="mini-textbox-border"><input id="l3" value="'+cfnData.C3_536089623045+'" type="text" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_536089623045"></span><input type="hidden"></span><b>/Monthly</b>'
                $('#bs').append(list3);
            }
        }
        req();
        form.setData(cfnData);
        if(cfnData.C3_534187101971>=8){
            $('.dy8').hide();
        }
    };
    newofferc.show = function(e){
        cfnData=e;
        mName=cfnData.C3_534188520203;
        return dialog.show(new newofferc());
    };
   
    return newofferc;
});
 