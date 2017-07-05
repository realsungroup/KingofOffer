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
    var bmbid=appConfig.offer.bmbid;
    var cmsid=appConfig.offer.cmsid;
    var cnn={};
    var dp1,dp2,dp3,dp4;
    var deptPlus;
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
        if (parseFloat(o.C3_534183009192)>parseFloat(o.C3_534183037917)){
            alert('"Max." should be greater than "Min."');
            mini.getbyName('C3_534183037917').focus();
            return;
        }
        o._id=1;
        o._state="added";
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
    newoffer.prototype.activate=function(){

    };
  
    newoffer.prototype.attached=function(){
        mini.parse();
        var me=this;
        var deptP=mini.getbyName('C3_534181730034');
        changedept=function(){
       
            var form = new mini.Form("form2");
            cnn =  new mini.Form("form2").getData();
            setTimeout(function() {
               
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
                       offerSub1(aveid,"C3_534182432109='"+cnn.C3_534181730034+"' and C3_534182440112='"+cnn.C3_534181645731+"'",function(data){me.subList4(data);});
                       
                    }
              
             , 200);
        
        };
        dept=function(cmswhere,callback){
            dbs.dbGetdata(bmbid,0,cmswhere,fnSuccess,fnerror,fnhttperror);
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
        ndept1=function(e){
            dp1=e.value;
            var where="C3_419448436728 = '"+dp1+"' and C3_417728131816=1 and DEP_ADMIN_ID>0";
            dept(where,function(data){
                var dept1=new mini.get("dept1");
                dept1.set({data:[{'C3_461011989083':'none'}]})
                dept1.set({data:data});
                var dept2=new mini.get("dept2");
                dept2.set({data:[{'C3_461011989333':'none'}]})
                var dept3=new mini.get("dept3");
                dept3.set({data:[{'C3_461011989568':'none'}]})
                var dept4=new mini.get("dept4");
                dept4.set({data:[{'C3_461011989771':'none'}]})
            })
        }
        ndept2=function(e){
            dp2=e.value;
            deptP.setValue("\\"+dp2);
            var where="C3_419448436728 = '"+dp1+"' and C3_461011989083='"+dp2+"' and C3_417728131816=2";
            dept(where,function(data){
                var dept2=new mini.get("dept2");
                data.push({'C3_461011989333':'none'});
                dept2.set({data:data})
                var dept3=new mini.get("dept3");
                dept3.set({data:[{'C3_461011989568':'none'}]})
                var dept4=new mini.get("dept4");
                dept4.set({data:[{'C3_461011989771':'none'}]})
            })
        }
        ndept3=function(e){
            dp3=e.value;
            deptP.setValue("\\"+dp2+"\\"+dp3);
            var where="C3_419448436728 = '"+dp1+"' and C3_461011989083='"+dp2+"' and C3_461011989333='"+dp3+"' and C3_417728131816=3";
            dept(where,function(data){
                var dept3=new mini.get("dept3");
                data.push({'C3_461011989568':'none'});
                dept3.set({data:data})
                var dept4=new mini.get("dept4");
                dept4.set({data:[{'C3_461011989771':'none'}]})
            })
        }
        ndept4=function(e){
            dp4=e.value;
            var where="C3_419448436728 = '"+dp1+"' and C3_461011989083='"+dp2+"' and C3_461011989333='"+dp3+"' and C3_461011989568='"+dp4+"' and C3_417728131816=4";
            dept(where,function(data){
                var dept4=new mini.get("dept4");
                data.push({'C3_461011989771':'none'});
                dept4.set({data:data})
            })
        }
        cpnn=function(){
            var form = new mini.Form("form2");
            cnn =  new mini.Form("form2").getData();
            setTimeout(function() {
                recop.show().then(function(opn){
                    if(opn){
                        cnn.C3_534181598826=opn.C3_522691669347;
                        cnn.C3_534181645731=opn.C3_522691670315;
                        cnn.C3_534181718652=opn.C3_522691669613;
                        cnn.C3_534181730034=opn.C3_522691669878;
                        cnn.C3_534264776828=opn.C3_522691670096;
                        cnn.C3_534184180284=opn.C3_522691671516;
                        cnn.C3_534184180596=opn.C3_522692208296;
                        cnn.company=opn.company;
                        cnn.dept1=opn.dept1;
                        cnn.dept2=opn.dept2;
                        cnn.dept3=opn.dept3;
                        cnn.dept4=opn.dept4;
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
                        offerSub1(strid,"C3_534182272208='"+cnn.C3_534181645731+"' and C3_534182291688='"+cnn.C3_534181718652+"'",function(data){me.subList2(data);});
                        offerSub1(aveid,"C3_534182432109='"+cnn.C3_534181730034+"' and C3_534182440112='"+cnn.C3_534181645731+"'",function(data){me.subList4(data);});
                        offerSub1(cmsid,"DEP_id= 100 or  DEP_ID = 2000",function(data){
                            var bmb=new mini.get("company");
                            bmb.set({data:data});
                            dp1=bmb.value;
                            var where="C3_419448436728 = '"+bmb.value+"' and C3_417728131816=1 and DEP_ADMIN_ID>0"
                            dept(where,function(data){var dept1=new mini.get("dept1");dept1.set({data:data})})
                        });
                    }
                });
            }, 200);
        }
    };
    newoffer.prototype.compositionComplete=function(){
        vchange=function(){
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
    newoffer.show = function(){
        return dialog.show(new newoffer());
    };
    return newoffer;
});
 