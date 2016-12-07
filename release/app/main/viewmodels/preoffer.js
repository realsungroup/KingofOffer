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
    preoffer.prototype.oDetail=ko.observableArray([]),
    preoffer.prototype.subList1=ko.observableArray([]),
    preoffer.prototype.subList2=ko.observableArray([]),
    preoffer.prototype.subList3=ko.observableArray([]),
    preoffer.prototype.subList4=ko.observableArray([]),
    preoffer.prototype.attached=function(){
        mini.parse();
        cmswhere="REC_ID='"+preview.REC_ID+"'";
        this.oDetail(preview);
        offerList=function(subid,callback){
            dbs.dbGetdata(opaid,subid,cmswhere,fnSuccess,fnerror,fnhttperror);
            function fnSuccess(data,subdata){
                callback(subdata);
            };
            function fnerror(text){
                dialog.showMessage(text.message,'失败',['返回'],true);
            };
            function fnhttperror(jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
            };
        }
        
        offerList(eaaid,function(subdata){me.subList1(subdata);});
        offerList(strid,function(subdata){me.subList2(subdata);});
        offerList(marid,function(subdata){me.subList3(subdata);});
        offerList(aveid,function(subdata){me.subList4(subdata);});
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
        console.log(preview);
        return dialog.show(new preoffer());
    };
    return preoffer;
});       
    