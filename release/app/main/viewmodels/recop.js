define(['durandal/app','knockout','plugins/router','plugins/dialog'], function (app,ko,router,dialog) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var recid=appConfig.offer.recid;
    var sData=[];
    var newData=[];
    var recop = function() {
    };
    recop.prototype.recopList=ko.observableArray([]),
    recop.prototype.attached=function(){
        var me=this;
        dbs.dbGetdata(recid,0,"",fnSuccess,null,null);//获取并设置页面数据
        function fnSuccess(data){
            sData=data;
            me.recopList(data);
            // console.log(data);
        };
        opnm = function(opn){
            dialog.close(me,opn);
        }
        search =  function() {
            newData=[];
            var skey = $('#searchBox').val();
            for(var i=0,a=0;i<sData.length;i++){
                if(sData[i].C3_522691671297.indexOf(skey)>=0
                    || sData[i].C3_522691669347.indexOf(skey)>=0
                    || sData[i].C3_522691670315.indexOf(skey)>=0
                    || sData[i].C3_522691669613.indexOf(skey)>=0
                    || sData[i].C3_522691669878.indexOf(skey)>=0
                    || sData[i].C3_522691670096.indexOf(skey)>=0)
                newData[a++] = sData[i];
            }
            me.recopList(newData);
        };
        $('#searchBox').keydown(function() {
            if (event.keyCode == "13") {//keyCode=13是回车键
                $('#searchBtn').click();
                event.preventDefault();
            }
        });    
    };
    recop.prototype.cancel = function() {
        dialog.close(this);
        };

    recop.show = function(){
        return dialog.show(new recop());
    };
    
    return recop;
});