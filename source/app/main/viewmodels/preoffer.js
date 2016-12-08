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
    var me=this;
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
    }

    preoffer.prototype.activate=function(){
        cmswhere="REC_ID='"+preview.REC_ID+"'";
       
        offerSub=function(subid,callback){
            dbs.dbGetdata(opaid,subid,cmswhere,fnSuccess,fnerror,fnhttperror);
            function fnSuccess(data,subdata){
                callback(subdata);
                // console.log(subdata);
            };
            function fnerror(text){
                dialog.showMessage(text.message,'失败',['返回'],true);
            };
            function fnhttperror(jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
            };
        }
        offerSub(eaaid,function(subdata){preoffer.prototype.subList1(subdata);});
        offerSub(strid,function(subdata){preoffer.prototype.subList2(subdata);});
        offerSub(marid,function(subdata){preoffer.prototype.subList3(subdata);});
        offerSub(aveid,function(subdata){preoffer.prototype.subList4(subdata);});
        var i=101;
        headClick=function(offersub){
            $('.oacitve').removeClass('oacitve');
            if(offersub=='eap'){
                $('.eaphead').addClass('oacitve');
                $('.eap').css('z-index',i);
            }else if(offersub=='ss'){
                $('.sshead').addClass('oacitve');
                $('.ss').css('z-index',i);
            }else if(offersub=='md'){
                $('.mdhead').addClass('oacitve');
                $('.md').css('z-index',i);
            }else if(offersub=='das'){
                $('.dashead').addClass('oacitve');
                $('.das').css('z-index',i);
            }
            i++;
        };
    }
    preoffer.prototype.cancel = function() {
        dialog.close(this);
    };
    preoffer.show = function(e){
        preview=e;
        return dialog.show(new preoffer());
    };
    return preoffer;
});       
    