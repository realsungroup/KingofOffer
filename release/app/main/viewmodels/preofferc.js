define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var cfnid=appConfig.offer.cfnid;
    var cfmData;
    var eadid=appConfig.offer.eadid;
    var preofferc = function() {
    };
    preofferc.prototype.subList=ko.observableArray([]),
    preofferc.prototype.cancel = function() {
        dialog.close(this);
    };
    preofferc.prototype.activate=function(){
    };
    preofferc.prototype.attached=function(){
        mini.parse();
        var me=this;
        cmswhere="REC_ID='"+cfmData.REC_ID+"'";
        dbs.dbGetdata(cfnid,eadid,cmswhere,fnSuccess,fnerror,fnhttperror);
        function fnSuccess(data,subdata){
            me.subList(subdata);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'失败',['返回'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            alert(jqXHR);
        };
        var form = new mini.Form("form8");
        cfmData.C3_534187094490s=cfmData.C3_534187094490;
        cfmData.C3_534187093586s=cfmData.C3_534187093586;
        cfmData.C3_534264724518s=cfmData.C3_534264724518;
        cfmData.C3_535826470338s=cfmData.C3_535826470338;
        if(cfmData.C3_534187101971>6){
            $("#opt2").empty();
            var list='1.<span class="mini-textbox mini-textarea" style="border-width: 0px; width: 840px; height: 28px;"><textarea readonly id="val2" class="mini-textbox-input" autocomplete="off" placeholder="" name="C3_536319464780" style="height: 26px;border-style:none"></textarea></span>'
            $("#opt2").append(list);
            $('#val2').val(cfmData.C3_536319464780);
        }
        form.setData(cfmData);
        fields = form.getFields();
        for (var i = 0, l = fields.length; i < l; i++) {
            var c = fields[i];
            if (c.setReadOnly) c.setReadOnly(true);     //只读
            if (c.setIsValid) c.setIsValid(true);      //去除错误提示
            if (c.addCls) c.addCls("asLabel");          //增加asLabel外观
        }
        if(cfmData.C3_534187097298){
            var a1=$("#ahref");
            a1[0].href=cfmData.C3_534187097298;
        }else{
            $("#ahref").hide();
        }
        if(cfmData.C3_534187097504){
            var a2=$("#ahref2");
            a2[0].href=cfmData.C3_534187097504;
        }else{
            $("#ahref2").hide();
        }
        
    };
    preofferc.show = function(e){
        cfmData=e;
        return dialog.show(new preofferc());
    };
   
    return preofferc;
});
 