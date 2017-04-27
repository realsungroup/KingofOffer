define(['durandal/app','knockout','plugins/router','plugins/dialog','./cfnop','./recop'], function (app,ko,router,dialog,cfnop,recop) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var cfnid=appConfig.offer.cfnid;
    var eadid=appConfig.offer.eadid;
    var efnData;
    var mName="";
    var editofferc = function() {
    };
    editofferc.prototype.subList=ko.observableArray([]),
    editofferc.prototype.cancel = function() {
        dialog.close(this);
    };
    editofferc.prototype.save = function() {
        if(confirm('Are you sure you want to save it?')){
            var that=this;
            var form = new mini.Form("form9");
            var o =  new mini.Form("form9").getData();
            form.validate(); 
            if (form.isValid() == false) return;
            o._id=1;
            o._state="modified";
            o.REC_ID=efnData.REC_ID;
            var json = mini.encode([o]);
            dbs.dbSavedata(cfnid,0,json);
            dialog.close(that);
        }
    };
    editofferc.prototype.activate=function(){
    };
    editofferc.prototype.attached=function(){
        mini.parse();
        if(efnData.C3_534187099299!="Y"){
            $('#fbb').val("Submit");
            $('#fbc').hide();
        }else{
            $('#fbd').hide();
        }
        if(efnData.C3_541165035428!=="Y"||efnData.C3_545943331211!=="未审批"){
            $('#lgid').hide();
        }else{
            var lg=mini.getbyName('C3_534187093868');
            lg.addCls("asLabel");
        }
        var me=this;
        cmswhere="REC_ID='"+efnData.REC_ID+"'";
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
        var form = new mini.Form("form9");efnData.C3_534187093868s=efnData.C3_534187093868;
        efnData.C3_534187094490s=efnData.C3_534187094490;
        efnData.C3_534187093586s=efnData.C3_534187093586;
        efnData.C3_534264724518s=efnData.C3_534264724518;
        efnData.C3_535826470338s=efnData.C3_535826470338;
        if(efnData.C3_534187097298){
            var a1=$("#ahref");
            a1[0].href=efnData.C3_534187097298;
        }else{
            $("#ahref").hide();
        }
        if(efnData.C3_534187097504){
            var a2=$("#ahref2");
            a2[0].href=efnData.C3_534187097504;
        }else{
            $("#ahref2").hide();
        }
        if(efnData.C3_541852509945){
            var a3=$("#ahref3");
            a3[0].href=efnData.C3_541852509945;
        }else{
            $("#ahref3").hide();
        }
        cfnn=function(){
            if(efnData.C3_534187099299!="Y"){
                efnData.C3_536319472674=mini.getbyName('C3_536319472674').value;
                efnData.C3_536319473964=mini.getbyName('C3_536319473964').value;
                efnData.C3_536319475165=mini.getbyName('C3_536319475165').value;
                efnData.C3_536319476423=mini.getbyName('C3_536319476423').value;
                efnData.C3_536319478009=mini.getbyName('C3_536319478009').value;
                efnData.C3_536089623045=$('#l3').val();
                efnData.C3_535826701051=$('#l2').val();
                efnData.C3_534264724518=$('#l1').val();
                efnData.C3_544810053160=mini.getbyName('C3_544810053160').value;
                setTimeout(function() {
                    cfnop.show().then(function(opn){
                        if(opn){
                            efnData.C3_534188520203=opn.C3_419343735913;
                            efnData.C3_534188545242=opn.C3_227192472953;//工号
                            efnData.C3_534188517500=opn.C3_305737857578;//编号
                            var form = new mini.Form("form7");
                            req();
                            form.setData(efnData);
                        }
                    });
                }, 200);
            }else{
                mini.getbyName('C3_534188520203').setReadOnly(true);
            }
        }
        sRange=function(){
            var sv=mini.getbyName('C3_536089623045');
            if(parseFloat(sv.value)<parseFloat(efnData.C3_534187097705)){
                alert("Salary range between"+efnData.C3_534187097705+"~"+efnData.C3_534187097900+"!");
                sv.setValue(efnData.C3_534187097705);
                sv.focus();
                return;
            }else if(parseFloat(sv.value)>parseFloat(efnData.C3_534187097900)){
                alert("Salary range between"+efnData.C3_534187097705+"~"+efnData.C3_534187097900+"!");
                sv.setValue(efnData.C3_534187097900);
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
            if(efnData.C3_534187099299==null){
                $('#rt').empty();
                var list1='<span class="mini-textbox" style="border-width: 0px;"><span class="mini-textbox-border"><input id="l1" value="'+efnData.C3_534264724518+'" type="text" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_534264724518"></span><input type="hidden"></span>';
                $('#rt').append(list1);
                $('#pf').empty();
                if(efnData.C3_535826701051==null){
                    efnData.C3_535826701051="";
                }
                var list2='<span class="mini-textbox" style="border-width: 0px;"><span class="mini-textbox-border"><input id="l2" value="'+efnData.C3_535826701051+'" type="text" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_535826701051"></span><input type="hidden"></span>'
                $('#pf').append(list2);
                $('#bs').empty();
                if(efnData.C3_536089623045==null){
                    efnData.C3_536089623045="";
                }
                var list3='RMB<span class="mini-textbox" style="border-width: 0px;"><span class="mini-textbox-border"><input id="l3" value="'+efnData.C3_536089623045+'" type="text" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_536089623045"></span><input type="hidden"></span><b>/Monthly</b>'
                $('#bs').append(list3);
            }
        }
        req();
        form.setData(efnData);
        if(efnData.C3_534187101971>=8){
            $('.dy8').hide();
        }
    };
    editofferc.show = function(e){
        efnData=e;
        mName=efnData.C3_534188520203;
        return dialog.show(new editofferc());
    };
   
    return editofferc;
});
 