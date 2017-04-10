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
    var editdata;
    var editoffer = function(){
    };
    editoffer.prototype.subList2=ko.observableArray([]),
    editoffer.prototype.subList4=ko.observableArray([]),
    editoffer.prototype.cancel = function() {
        subdata=[];
        editoffer.prototype.subList2(subdata);
        editoffer.prototype.subList4(subdata);
        dialog.close(this);
    };
    editoffer.prototype.ok = function() {
        $('#fbb').attr({"disabled":"disabled"});
        setTimeout(function() {
            $('#fbb').removeAttr("disabled");
        }, 1000);
        var that=this;
        var form = new mini.Form("form3");
        var o =  new mini.Form("form3").getData();
        form.validate(); 
        if (form.isValid() == false) return;
        if (o.C3_534181957670==0){
            alert('Monthly salary of "0"?');
            mini.getbyName('C3_534181957670').focus();
            return;
        }
        if (o.C3_534182182372==0){
            alert('Candidate\'s Expectation of "0"?');
            mini.getbyName('C3_534182182372').focus();
            return;
        }
        if (parseFloat(o.C3_534183009192)>=parseFloat(o.C3_534183037917)){
            alert('"Max." should be greater than "Min."');
            mini.getbyName('C3_534183037917').focus();
            return;
        }
        o._id=1;
        o._state="modified";
        o.REC_ID=editdata.REC_ID;
        var json = mini.encode([o]);
        dbs.dbSavedata(opaid,0,json,dataSaved,fnerror,fnhttperror);
        function dataSaved(text){
            dialog.showMessage('<h1>Success</h1>','Save',['Ok'],true);
            dialog.close(that);
        };
        function fnerror(text){
            dialog.showMessage(text.message,'Error',['Cancel'],true);
        };
        function fnhttperror(jqXHR, textStatus, errorThrown){
            dialog.showMessage('error','Save',['Cancel'],true);
        }
    };
    editoffer.prototype.attached=function(){
        mini.parse();
        var me=this;
        var form = new mini.Form("form3");
        form.setData(editdata);
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
        offerSub1(strid,"C3_534182272208='"+editdata.C3_534181645731+"'",function(data){me.subList2(data);});
        offerSub1(aveid,"C3_534182432109='"+editdata.C3_534181730034+"'",function(data){me.subList4(data);});
        ecpnn=function(){
            setTimeout(function() {
                recop.show().then(function(opn){
                    if(opn){
                        editdata.C3_534181598826=opn.C3_522691669347;
                        editdata.C3_534181645731=opn.C3_522691670315;
                        editdata.C3_534181718652=opn.C3_522691669613;
                        editdata.C3_534181730034=opn.C3_522691669878;
                        editdata.C3_534264776828=opn.C3_522691670096;
                        var form = new mini.Form("form3");
                        form.setData(editdata);
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
                        offerSub1(strid,"C3_534182272208='"+editdata.C3_534181645731+"'",function(data){me.subList2(data);});
                        offerSub1(aveid,"C3_534182432109='"+editdata.C3_534181730034+"'",function(data){me.subList4(data);});
                    }
                });
            }, 200);
        }
        if(editdata.C3_534182834029){
            var a1=$("#ahref");
            a1[0].href=editdata.C3_534182834029;
        }else{
            $("#ahref").hide();
        }
        if(editdata.C3_534182839409){
            var a2=$("#ahref2");
            a2[0].href=editdata.C3_534182839409;
        }else{
            $("#ahref2").hide();
        }
        if(editdata.C3_541852470955){
            var a3=$("#ahref3");
            a3[0].href=editdata.C3_541852470955;
        }else{
            $("#ahref3").hide();
        }
    };
   
    editoffer.prototype.compositionComplete=function(){
        evchange=function(){
            var salary = parseFloat(mini.getbyName('C3_534181957670').value);
            var yeb = parseFloat(mini.getbyName('C3_534181974758').value);
            var stocks = parseFloat(mini.getbyName('C3_534181984193').value);
            var allowance = parseFloat(mini.getbyName('C3_534181995445').value);
            var other = parseFloat(mini.getbyName('C3_541879174848').value);
            var annualtotal = mini.getbyName('C3_534339050633');
            var annual = salary*12;
            annualtotal.setValue(annual);
            var totalcash = mini.getbyName('C3_534182046604');
            var total = annual+yeb+stocks+allowance+other;
            totalcash.setValue(total);
        }
    }
    editoffer.show = function(e){
        editdata=e;
        return dialog.show(new editoffer());
    };
   
    return editoffer;
});
 