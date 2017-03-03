define(['plugins/dialog', 'knockout'], function (dialog, ko) {
    var baseUrl=appConfig.app.baseUrl;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var opaid=appConfig.offer.opaid;
    var eaaid=appConfig.offer.eaaid;
    var strid=appConfig.offer.strid;
    var marid=appConfig.offer.marid;
    var aveid=appConfig.offer.aveid;
    var preview={};
    var cmswhere="";
    var preoffer = function() {
    };
    preoffer.prototype.subList1=ko.observableArray([]),
    preoffer.prototype.subList2=ko.observableArray([]),
    preoffer.prototype.subList3=ko.observableArray([]),
    preoffer.prototype.subList4=ko.observableArray([]),
    preoffer.prototype.attached=function(){
        mini.parse();
        var form = new mini.Form("form4");
        form.setData(preview);
        fields = form.getFields();                
        for (var i = 0, l = fields.length; i < l; i++) {
            var c = fields[i];
            if (c.setReadOnly) c.setReadOnly(true);     //只读
            if (c.setIsValid) c.setIsValid(true);      //去除错误提示
            if (c.addCls) c.addCls("asLabel");          //增加asLabel外观
        }
        
        if(preview.C3_534182834029){
            var a1=$("#ahref");
            a1[0].href=preview.C3_534182834029;
        }else{
            $("#ahref").hide();
        }
        if(preview.C3_534182839409){
            var a2=$("#ahref2");
            a2[0].href=preview.C3_534182839409;
        }else{
            $("#ahref2").hide();
        }
    }

    preoffer.prototype.activate=function(){
        var me=this;
        offerSub1=function(recid,cmswhere,callback){
            dbs.dbGetdata(recid,0,cmswhere,fnSuccess,fnerror,fnhttperror);
            function fnSuccess(data){
                callback(data);
            };
            function fnerror(text){
                dialog.showMessage(text.message,'失败',['返回'],true);
            };
            function fnhttperror(jqXHR, textStatus, errorThrown){
                // console.log(jqXHR);
            };
        }
        offerSub1(strid,"C3_534182272208='"+preview.C3_534181645731+"'",function(data){me.subList2(data);});
        offerSub1(aveid,"C3_534182432109='"+preview.C3_534181730034+"'",function(data){me.subList4(data);});
        
        cmswhere="REC_ID='"+preview.REC_ID+"'";
        dbs.dbGetdata(opaid,eaaid,cmswhere,fnSuccess,fnerror,fnhttperror);
        function fnSuccess(data,subdata){
            for(var i=0;i<subdata.length;i++){
                if(subdata[i].C3_534184046952){
                    subdata[i].C3_534184046952=subdata[i].C3_534184046952.toLocaleDateString()+subdata[i].C3_534184046952.toLocaleTimeString();
                }
            }
            me.subList1(subdata);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'失败',['返回'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            alert(jqXHR);
        };
    }
    preoffer.prototype.cancel = function() {
        subdata=[];
        preoffer.prototype.subList1(subdata);
        preoffer.prototype.subList2(subdata);
        preoffer.prototype.subList3(subdata);
        preoffer.prototype.subList4(subdata);
        dialog.close(this);
    };
    preoffer.show = function(e){
        preview=e;
        return dialog.show(new preoffer());
    };
    return preoffer;
});       
    