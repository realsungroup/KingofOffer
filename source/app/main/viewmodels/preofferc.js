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
        var form = new mini.Form("form8");
        cfmData.C3_589650650993s=cfmData.C3_589650650993;
        cfmData.C3_534187094490s=cfmData.C3_534187094490;
        cfmData.C3_534187093586s=cfmData.C3_534187093586;
        cfmData.C3_534264724518s=cfmData.C3_534264724518;
        cfmData.C3_535826470338s=cfmData.C3_535826470338;
        form.setData(cfmData);
        fields = form.getFields();
        if(cfmData.C3_541165035428!=="Y"||cfmData.C3_545943331211!=="未审批"){
            $('#lgid').hide();
        }else{
            var lg=mini.getbyName('C3_589650650993');
            lg.addCls("asLabel");
        }
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
        if(cfmData.C3_541852509945){
            var a3=$("#ahref3");
            a3[0].href=cfmData.C3_541852509945;
        }else{
            $("#ahref3").hide();
        }
        if(cfmData.C3_534187101971>=8){
            $('.dy8').hide();
        }
    };
    preofferc.show = function(e){
        cfmData=e;
        // console.log(e);
        return dialog.show(new preofferc());
    };
   
    return preofferc;
});
 