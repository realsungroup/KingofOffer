define(['plugins/dialog', 'knockout','./newofferc','./editofferc','./preofferc'], function (dialog, ko, newofferc,editofferc,preofferc) {//,'./editofferc'
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
        cList:ko.observableArray([]),
        attached:function(){
            var baseUrl=appConfig.app.baseUrl;
            var ucode = appConfig.app.ucode;
            var user  = appConfig.app.user;
            var dbs=new dbHelper(baseUrl,user,ucode);
            var cfnid=appConfig.offer.cfnid;
            var me=this;
            var type='';
            var o={};
            var sData=[];
            var oldData=[];
            var newData=[];
            mini.parse();
            offercList=function(type){
                dbs.dbGetdata(cfnid,0,"",fnSuccess,fnerror,fnhttperror);
                function fnSuccess(data){
                    // console.log(data[0]);
                    wsp=function(){
                        $('#fhead').empty();
                        $('#fhead').append('未审批');
                        $('#spjd').show();
                        $('#spsj').hide();
                        var nData=[];
                        for(var i=0,j=0;i<data.length;i++){
                            if(data[i].C3_545943331211=="未审批"){
                                nData[j]=data[i];
                                j++;
                            }
                        }
                        me.cList(nData);
                        oldData=sData=nData;
                    }
                    spz=function(){
                        $('#fhead').empty();
                        $('#fhead').append('审批中');
                        $('#spjd').show();
                        $('#spsj').hide();
                        var nData=[];
                        for(var i=0,j=0;i<data.length;i++){
                            if(data[i].C3_545943331211=="审批中"){
                                nData[j]=data[i];
                                j++;
                            }
                        }
                        me.cList(nData);
                        oldData=sData=nData;
                    }
                    ywc=function(){
                        $('#fhead').empty();
                        $('#fhead').append('审批完成');
                        $('#spjd').hide();
                        $('#spsj').show();
                        var nData=[];
                        for(var i=0,j=0;i<data.length;i++){
                            if(data[i].C3_545943331211=="审批完成"){
                                nData[j]=data[i];
                                j++;
                            }
                        }
                        me.cList(nData);
                        oldData=sData=nData;
                    }
                    if(type=="wsp")wsp();
                    if(type=="spz")spz();
                    if(type=="ywc")ywc();
                };
                function fnerror(text){
                    dialog.showMessage(text.message,'新增失败',['返回'],true);
                };
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    // console.log(jqXHR);
                };
            }
            offercList('wsp');
            newOc=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                var nType="con";
                newofferc.show(e,nType).then(function(){
                    offercList('wsp');
                });
            };
            editOc=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                editofferc.show(e).then(function(){
                    offercList('ywc');
                });
            };
            offercView=function(e){
                $('.fbb').attr({"disabled":"disabled"});
                setTimeout(function() {
                    $('.fbb').removeAttr("disabled");
                }, 1000);
                preofferc.show(e).then(function(){
                    offercList('spz');
                });
            };
            rePage =  function() {
                me.cList(oldData);
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
                        if(!sData[i].C3_534187093868)sData[i].C3_534187093868="";
                        if(!sData[i].C3_534187094088)sData[i].C3_534187094088="";
                        if(!sData[i].C3_534264724518)sData[i].C3_534264724518="";
                        if(!sData[i].C3_534188520203)sData[i].C3_534188520203="";
                        if(!sData[i].C3_534187094286)sData[i].C3_534187094286="";
                        if(sData[i].C3_534187094490.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187093586.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187093868.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187094088.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534264724518.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534188520203.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187094286.toLowerCase().indexOf(skey)>=0
                        || sData[i].C3_534187094490.indexOf(skey)>=0
                        || sData[i].C3_534187093586.indexOf(skey)>=0
                        || sData[i].C3_534187093868.indexOf(skey)>=0
                        || sData[i].C3_534187094088.indexOf(skey)>=0
                        || sData[i].C3_534264724518.indexOf(skey)>=0
                        || sData[i].C3_534188520203.indexOf(skey)>=0
                        || sData[i].C3_534187094286.indexOf(skey)>=0)
                        newData[a++] = sData[i];
                    };
                    me.cList(newData);
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