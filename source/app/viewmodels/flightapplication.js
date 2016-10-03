define(['plugins/http', 'durandal/app', 'knockout','durandal/system','plugins/router','./flightappform'], function (http, app, ko,system,router,flightappform) {
    
   
    
    return {
        
        rows: ko.observableArray([]),
        currentPageIndex : ko.observable(0),
        pageSize:5,
        maxPageIndex: function(){ return ko.computed(function() {
            return Math.ceil(ko.utils.unwrapObservable(this.rows).length / this.pageSize) - 1;
        }, this);},
        itemsOnCurrentPage:function(){ 
          return ko.computed(function() {
            var startIndex = this.pageSize * this.currentPageIndex();
            return this.rows.slice(startIndex, startIndex + this.pageSize);
        }, this);


        },
        click_add:'test2',
        activate:function(){ 
             var that=this;
            submain(system,that);
        },
        binding: function () {
           // mini.parse();
           
        },
        bindingComplete: function () {
          // mini.parse();
        },
        attached: function (view, parent) {
            // mini.parse();
        //    mini.parse();
        },
        
        compositionComplete: function (view) {
         mini.parse();
       
             $(view).on("click",'.mini-button',this,function(e){
                     var button=mini.get(this);
                     var self=e.data;
                     var rows=self.rows();
                     if (button.name=='add')
                     {
                        var emptyrow=rows.clone()[0];
                          for(var p in emptyrow) 
                          { 
                            emptyrow[p]=""; 
                          } 
                           flightappform.show(emptyrow).then(function(response) {
                       
                           system.log(response);
                           if (response.REC_ID>0)
                           { self.rows.unshift(response);}
                          
                            
                            mini.parse();
                        });
                     }
                       if (button.name=='submit')
                       {
                           
                          // $.inArray(button.recid,this.rows)
                         
                       
                     
                           
                       }
                     if (button.name=='edit')
                       {
                      // self.rows.extend({ rateLimit: 5 });
                         var o=$.grep(rows,function(row,i){return row["REC_ID"]==button.recid})[0];
                        
                        flightappform.show(o).then(function(response) {
                           system.log(response);
                           
                           var newrows=self.rows().clone();
                          self.rows.removeAll();
                          self.rows(newrows);
                         

                         
                          mini.parse();
                         
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
    appConfig.app.dbs=dbs;
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