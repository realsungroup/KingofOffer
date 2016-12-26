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
            console.log(data[0]);
            me.cfnopList(data);
        };
        opnm = function(opn){
            dialog.close(me,opn);
        }
        search =  function() {
            newData=[];
            var skey = mini.getbyName('searchBox').value;
            // console.log(sData[0]);
            for(var i=0,a=0;i<sData.length;i++){
                if(!sData[i].C3_522691671297)sData[i].C3_522691671297="";
                if(!sData[i].C3_522691669347)sData[i].C3_522691669347="";
                if(!sData[i].C3_522691670315)sData[i].C3_522691670315="";
                if(!sData[i].C3_522691669613)sData[i].C3_522691669613="";
                if(!sData[i].C3_522691669878)sData[i].C3_522691669878="";
                if(!sData[i].C3_522691670096)sData[i].C3_522691670096="";
                if(!sData[i].C3_522691670814)sData[i].C3_522691670814="";
                if(sData[i].C3_522691671297.indexOf(skey)>=0
                || sData[i].C3_522691669347.indexOf(skey)>=0
                || sData[i].C3_522691670315.indexOf(skey)>=0
                || sData[i].C3_522691669613.indexOf(skey)>=0
                || sData[i].C3_522691669878.indexOf(skey)>=0
                || sData[i].C3_522691670096.indexOf(skey)>=0
                || sData[i].C3_522691670814.indexOf(skey)>=0)
                newData[a++] = sData[i];
            }
            me.cfnopList(newData);
        };
        $('#searchBox').keydown(function(event) {
            if(event.keyCode == "13"){//keyCode=13是回车键
                event.preventDefault();
                $('#searchBtn').click();
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