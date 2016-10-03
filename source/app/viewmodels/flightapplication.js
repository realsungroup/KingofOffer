define(['plugins/http', 'durandal/app', 'knockout','durandal/system','plugins/router','./flightappform'], function (http, app, ko,system,router,flightappform) {
    
    var CartLine = function ()
    {
      
       
    };

    
    return {
        car: new CartLine(),
        rows: ko.observableArray([]),
        activate:function(){ 
             var that=this;
            submain(system,that);
        },
        click_add:'test2',
        binding: function () {
           // mini.parse();
           
        },
        bindingComplete: function () {
          // mini.parse();
        },
        attached: function (view, parent) {
           //  mini.parse();
        //    mini.parse();
        },
        
        compositionComplete: function (view) {
         mini.parse();
       // ko.applyBindings(this.rows, view);
            $(view).on("click",'#testid',function(e){

                     flightappform.show().then(function(response) {
                           app.showMessage(response);
                           system.log(response);
                        });
            });
             $(view).on("click",'.mini-button',this,function(e){
                     var button=mini.get(this);
                     var self=e.data;
                     var rows=self.rows();
                     if (button.name=='add')
                     {
                             flightappform.show().then(function(response) {
                           app.showMessage(response);
                           system.log(response);
                        });
                     }
                       if (button.name=='submit')
                       {
                           
                          // $.inArray(button.recid,this.rows)
                         
                       
                     
                           
                       }
                     if (button.name=='edit')
                       {
                         //  alert("edit:"+button.recid);
                         var o=$.grep(rows,function(row,i){return row["REC_ID"]==button.recid})[0];
                         //alert(o.REC_ID);
                        flightappform.show(o).then(function(response) {
                          // app.showMessage(response);
                           system.log(response);
                          o.C3_526655624603=response.C3_526655624603;
                          // self.rows[0]=new Object(o);
                         // system.log(self.rows()[0]);
                         // self.rows()[0].C3_526655624603='344131245555';
                          var newrows=self.rows().clone();
                          self.rows.removeAll();
                          self.rows(newrows);
                          mini.parse();
                          //ko.applyBindings(this);
                        });
 
                       }
                     if (button.name=='cancel')
                       {
                           alert("cancel:"+button.recid);
                       }
                    
            });
           
        }
    };
   
});
 
 function test2(e)
    {
          
         
    }
 function submain(system,that) {
   
   
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
   
    var dbs=new dbHelper(baseUrl,user,ucode);
   // var el = document.getElementById('content');
   // var datagrids = document.getElementById('datagrids');
    //var shiftPanel = new internationalfilght(el);
  
    
    var resid=appConfig.internationalfilght.guojiResid;
    //var subresid=appConfig.shifrpttofmanager.subresid;
    var cmswhere="";
   // if (appConfig.app.debug)
    // {cmswhere="C3_525699724860=392";}
   // shiftPanel.start();
    var url ;
  //  mini.parse();
   
    dbs.dbGetdata(resid,"",cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
       system.log(data);
       that.rows(data);
       // shiftPanel.appendManage(datagrids,data,subdata,mini,dbs);
               
    }
    function fnerror(data){   
       // alert(1);
        alert(data);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){
       //alert(2);
       system.log(jqXHR);
      //  alert(jqXHR.responseText);
    }

};