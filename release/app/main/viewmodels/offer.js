define(['plugins/dialog', 'knockout','./newoffer'], function (dialog, ko, newoffer) {
    return {
        user:"",
        ucode:"",
        activate:function(e){
            if (e!==undefined)
            {
               this.user=e.user;
               this.ucode=e.ucode;
            }
        },
        oList:ko.observableArray([]),
        subList:ko.observableArray([]),
        attached:function(){
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
            mini.parse();
            offerList=function(subid){
                dbs.dbGetdata(opaid,subid,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data,subdata){
                    console.log(data);
                    console.log(subdata);
                    me.oList(data);
                    me.subList(subdata);
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                };
            }
            offerList(eaaid);
            offerList(strid);
            offerList(marid);
            offerList(aveid);
            offerEdit=function(){
                // editmenu.show(cpn.C3_511302131411).then(function(){
                //     menuList(me);
                // });
            };
            offerDel = function(){//删除按钮
                if(confirm('您确定要删除么？')){
                    
                    cp._id=1;
                    cp._state="modified";
                    cp.C3_533643824454="Y";
                    cp.REC_ID=cpn.REC_ID;
                    json="["+JSON.stringify(cp)+"]";
                    console.log(json);
                    dbs.dbSavedata(resid,0,json);
                    setTimeout(function() {
                        menuList(me);
                    }, 200);
                }else{
                    return;
                }
            };
                // $('.eap').hide();
                // $('.ss').hide();
                // $('.md').hide();
                // $('.das').hide();
            headClick=function(offersub){
                $('.acitveopp').removeClass('acitveopp');
                // $('.eap').hide();
                // $('.ss').hide();
                // $('.md').hide();
                // $('.das').hide();
                console.log(offersub);
                if(offersub=='eap'){
                    // $('.eap').show();
                    $('.eaphead').addClass('acitveopp');
                }else if(offersub=='ss'){
                    // $('.ss').show();
                    $('.sshead').addClass('acitveopp');
                }else if(offersub=='md'){
                    // $('.md').show();
                    $('.mdhead').addClass('acitveopp');
                }else if(offersub=='das'){
                    // $('.das').show();
                    $('.dashead').addClass('acitveopp');
                }
            };
        }
    }
});