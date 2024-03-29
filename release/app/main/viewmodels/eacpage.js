define(['plugins/dialog', 'knockout','./newofferc','./preofferc'], function (dialog, ko, newofferc,preofferc) {
    return {
        user:"",
        ucode:"",
        activate:function(e){
            if (e!==undefined)
            {
               appConfig.app.user=e.user;
               appConfig.app.ucode=e.ucode;
            }
        },
        ceList:ko.observableArray([]),
        attached:function(){
            var baseUrl=appConfig.app.baseUrl;
            var ucode = appConfig.app.ucode;
            var user  = appConfig.app.user;
            var dbs=new dbHelper(baseUrl,user,ucode);
            var dfnid=appConfig.offer.dfnid;
            var ylsid=appConfig.offer.ylsid;
            var yjjid=appConfig.offer.yjjid;
            var me=this;
            var o={};
            var sData=[];
            var oldData=[];
            var newData=[];
            var type;
            mini.parse();
            offerceList=function(id,type){
                dbs.dbGetdata(id,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    me.ceList(data);
                    oldData=sData=data;
                    for(var i=0;i<data.length;i++){
                        if(type==1){
                            $('.p1').show();
                            $('.r1').hide();
                        }else{
                            $('.r1').show();
                            $('.p1').hide();
                        }
                    }
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    // console.log(jqXHR);
                };
            }
            ysp=function(){
                $('#fhead').empty();
                $('#fhead').append('已通过');
                type=1;
                offerceList(ylsid,type);
            };
            wsp=function(){
                $('#fhead').empty();
                $('#fhead').append('未审批');
                type=2;
                offerceList(dfnid,type);
            };
            yjj=function(){
                $('#fhead').empty();
                $('#fhead').append('已拒绝');
                type=1;
                offerceList(yjjid,type);
            };
            wsp();
            subOc=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                var nType="eac";
                newofferc.show(e,nType).then(function(){
                    offerceList(dfnid);
                });
            };
            offerceView=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                preofferc.show(e).then(function(){
                    wsp();
                });
            };
            rePage =  function() {
                me.ceList(oldData);
                for(var i=0;i<oldData.length;i++){
                    if(type==1){
                        $('.p1').show();
                        $('.r1').hide();
                    }else{
                        $('.r1').show();
                        $('.p1').hide();
                    }
                }
                sData=oldData;
                mini.getbyName('searchBoxcf').setValue("");
            };
            searchcf =  function() {
                newData=[];
                var skey = mini.getbyName('searchBoxcf').value;
                // console.log(skey);
                if(skey==""){
                    rePage();
                }else{
                    for(var i=0,a=0;i<sData.length;i++){
                        if(!sData[i].C3_534187094490)sData[i].C3_534187094490="";
                        if(!sData[i].C3_534187093586)sData[i].C3_534187093586="";
                        if(!sData[i].C3_589650650993)sData[i].C3_589650650993="";
                        if(!sData[i].C3_534187094088)sData[i].C3_534187094088="";
                        if(!sData[i].C3_534264724518)sData[i].C3_534264724518="";
                        if(!sData[i].C3_534188520203)sData[i].C3_534188520203="";
                        if(!sData[i].C3_534187094286)sData[i].C3_534187094286="";
                        if(sData[i].C3_534187094490.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187093586.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_589650650993.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187094088.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534264724518.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534188520203.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187094286.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187094490.indexOf(skey)>=0
                        || sData[i].C3_534187093586.indexOf(skey)>=0
                        || sData[i].C3_589650650993.indexOf(skey)>=0
                        || sData[i].C3_534187094088.indexOf(skey)>=0
                        || sData[i].C3_534264724518.indexOf(skey)>=0
                        || sData[i].C3_534188520203.indexOf(skey)>=0
                        || sData[i].C3_534187094286.indexOf(skey)>=0)
                        newData[a++] = sData[i];
                    };
                    me.ceList(newData);
                    for(var i=0;i<newData.length;i++){
                        if(type==1){
                            $('.p1').show();
                            $('.r1').hide();
                        }else{
                            $('.r1').show();
                            $('.p1').hide();
                        }
                    }
                    sData=newData;
                }
                mini.getbyName('searchBoxcf').setValue("");
            };
            $('#searchBoxcf').keydown(function(event) {
                if(event.keyCode == "13"){//keyCode=13是回车键
                    event.preventDefault();
                    searchcf();
                }
            });
        }
    }
});