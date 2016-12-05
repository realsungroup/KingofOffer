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
            var subid=appConfig.offer.subid;
            var strid=appConfig.offer.strid;
            var marid=appConfig.offer.marid;
            var aveid=appConfig.offer.aveid;
            var me=this;
            mini.parse();
            offerList=function(){

                dbs.dbGetdata(opaid,subid,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data,subdata1){
                    console.log(data);
                    console.log(subdata1);
                    me.oList(data);
                    me.subList(subdata1);
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                };
                dbs.dbGetdata(opaid,strid,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data,subdata2){
                    me.subList(subdata2);
                };
                dbs.dbGetdata(opaid,marid,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data,subdata3){
                    me.subList(subdata3);
                };
                dbs.dbGetdata(opaid,aveid,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data,subdata4){
                    me.subList(subdata4);
                };
            }
            // menuIndex(this);
            offerList();
            offerEdit=function(){
                // editmenu.show(cpn.C3_511302131411).then(function(){
                //     menuList(me);
                // });
            };
            newop=function(){
                newoffer.show().then(function(){
                    offerList();
                });
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
        }
    }
});