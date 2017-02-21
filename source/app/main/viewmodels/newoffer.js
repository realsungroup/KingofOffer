define(['durandal/app','knockout','plugins/router','plugins/dialog','./recop'], function (app,ko,router,dialog,recop) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var opaid=appConfig.offer.opaid;
    var strid=appConfig.offer.strid;
    var aveid=appConfig.offer.aveid;
    var cnn={};
    var newoffer = function() {
    };
    newoffer.prototype.subList2=ko.observableArray([]),
    newoffer.prototype.subList4=ko.observableArray([]),
    newoffer.prototype.cancel = function() {
        subdata=[];
        newoffer.prototype.subList2(subdata);
        newoffer.prototype.subList4(subdata);
        dialog.close(this);
    };
    newoffer.prototype.ok = function() {
        $('.fbb').attr({"disabled":"disabled"});
        setTimeout(function() {
            $('.fbb').removeAttr("disabled");
        }, 1000);
        var that=this;
        var form = new mini.Form("form2");
        var o =  new mini.Form("form2").getData();
        form.validate(); 
        if (form.isValid() == false) return;
        o._id=1;
        o._state="added";
        var json = mini.encode([o]);
        dbs.dbSavedata(opaid,0,json,dataSaved,fnerror,fnhttperror);
        function dataSaved(text){
            dialog.showMessage('<h1>Success</h1>','Save',['Cancel'],true);
            dialog.close(that);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'Error',['Cancel'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            dialog.showMessage('error','Save',['Cancel'],true);
        }
        
    };
    newoffer.prototype.activate=function(){

    };
    newoffer.prototype.attached=function(){
        mini.parse();
        cnn={};
        var me=this;
        cpnn=function(){
            setTimeout(function() {
                recop.show().then(function(opn){
                    if(opn){
                        cnn.C3_534181767190="2000-01-01"
                        cnn.C3_534181598826=opn.C3_522691669347;
                        cnn.C3_534181645731=opn.C3_522691670315;
                        cnn.C3_534181718652=opn.C3_522691669613;
                        cnn.C3_534181730034=opn.C3_522691669878;
                        cnn.C3_534264776828=opn.C3_522691670096;
                        cnn.C3_534184180284=opn.C3_522691671516;
                        cnn.C3_534184180596=opn.C3_522692208296;
                        var form = new mini.Form("form2");
                        form.setData(cnn);
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
                        offerSub1(strid,"C3_534182272208='"+cnn.C3_534181645731+"'",function(data){me.subList2(data);});
                        offerSub1(aveid,"C3_534182432109='"+cnn.C3_534181730034+"'",function(data){me.subList4(data);});
                    }
                });
            }, 200);
        }
    };
    newoffer.prototype.compositionComplete=function(){
        vchange=function(){
            var salary = mini.getbyName('C3_534181957670').value;
            var yeb = mini.getbyName('C3_534181974758').value;
            var stocks = mini.getbyName('C3_534181984193').value;
            var allowance = mini.getbyName('C3_534181995445').value;
            var annualtotal = mini.getbyName('C3_534339050633');
            var annual = salary*12;
            annualtotal.setValue(annual);
            var totalcash = mini.getbyName('C3_534182046604');
            var total = annual+yeb+stocks+allowance;
            totalcash.setValue(total);
        }

    }
    newoffer.show = function(){
        return dialog.show(new newoffer());
    };
   
    return newoffer;
});
 