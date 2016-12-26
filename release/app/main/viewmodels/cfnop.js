define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var cfmid=appConfig.offer.cfmid;
    var sData=[];
    var newData=[];
    var cfnop = function() {
    };
    cfnop.prototype.cfnopList=ko.observableArray([]),
    cfnop.prototype.attached=function(){
        mini.parse();
        var me=this;
        dbs.dbGetdata(cfmid,0,"",fnSuccess,null,null);//获取并设置页面数据
        function fnSuccess(data){
            sData=data;
            // console.log(data[0]);
            me.cfnopList(data);
        };
        opnm = function(opn){
            dialog.close(me,opn);
        }
        searchCfn =  function() {
            newData=[];
            var skey = mini.getbyName('searchBoxcfn').value;
            // console.log(skey);
            // console.log(sData[0]);
            for(var i=0,a=0;i<sData.length;i++){
                if(!sData[i].C3_305737857578)sData[i].C3_305737857578="";
                if(sData[i].C3_305737857578)sData[i].C3_305737857578=sData[i].C3_305737857578+"";
                if(!sData[i].C3_417990929305)sData[i].C3_417990929305="";
                if(!sData[i].C3_227192472953)sData[i].C3_227192472953="";
                if(sData[i].C3_227192472953)sData[i].C3_227192472953=sData[i].C3_227192472953+"";
                if(!sData[i].C3_227192484125)sData[i].C3_227192484125="";
                if(!sData[i].C3_227192512406)sData[i].C3_227192512406="";
                if(!sData[i].C3_227192496109)sData[i].C3_227192496109="";
                if(!sData[i].C3_440000039379)sData[i].C3_440000039379="";
                if(sData[i].C3_305737857578.indexOf(skey)>=0
                || sData[i].C3_417990929305.indexOf(skey)>=0
                || sData[i].C3_227192472953.indexOf(skey)>=0
                || sData[i].C3_227192484125.indexOf(skey)>=0
                || sData[i].C3_227192512406.indexOf(skey)>=0
                || sData[i].C3_227192496109.indexOf(skey)>=0
                || sData[i].C3_440000039379.indexOf(skey)>=0)
                newData[a++] = sData[i];
            }
            me.cfnopList(newData);
        };
        $('#searchBoxcfn').keydown(function(event) {
            if(event.keyCode == "13"){//keyCode=13是回车键
                event.preventDefault();
                $('#searchBtncfn').click();
            }
        });
    };
    cfnop.prototype.cancel = function(){
        dialog.close(this);
    };

    cfnop.show = function(){
        return dialog.show(new cfnop());
    };
    
    return cfnop;
});