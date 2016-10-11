define(['plugins/http', 'durandal/app', 'knockout','durandal/system','plugins/router','./scanner','plugins/dialog'], function (http, app, ko,system,router,scanner,dialog) {
  var dinnerList=function(){
        this.rows= ko.observableArray([]);
        this.subrows=ko.observableArray([]);
        this.pageSize=0;
        this.pageIndex=0;
        this.total=0;
        this.barcode=ko.observable("");
        self=this;
        this.columns= [
            { headerText: "菜品名称" },
            { headerText: "单价" },
            { headerText: "数量" },
            { headerText: "小计" }
        ];
      ko.computed(function () {
        // Knockout tracks dependencies automatically.
        // It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
         system.log('barcodechange');
         if (self.barcode()!=="" && self.barcode()!==undefined){   
             fetchPage(self);
           }
      
         
    });
     openScanner=function(){
        scanner.show().then(function(response) {
         system.log(response);
          self.barcode(response);
      });
    }
    fetchPage=function(){

                
                fetchrows(system, self.barcode(),self.pageSize,self.pageIndex,function(result,data,subdata,count){
                    if (result)
                    { 
                            
                       self.rows(data);
                       self.subrows(subdata);
                       self.total=count;
                       self.barcode("");
                        
                        }
                    else
                    {
                       self.rows([]);
                       self.subrows([]);
                       self.total(0);   
                       self.barcode("");

                    }
                    
                    }
                );
        }
    fetchrows= function (system,barcode,pageSize,pageIndex,callback) {
                var resid=appConfig.dinnerlist.resid;
                var subresid=appConfig.dinnerlist.subresid;
                var cmswhere="C3_512261452989="+barcode+" or C3_529489922410="+barcode;
            
                appConfig.app.dbs.dbGetdata(resid,subresid,cmswhere,dataGot,fnerror,fnhttperror,pageSize,pageIndex);
                function dataGot(data,subdata,total)
                {
                    system.log(data);
                    system.log("total="+total);
                    
                    callback(true,data,subdata,total);
                }
                function fnerror(data){   

                    alert(data);
                    callback(false);

                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
            
                    system.log(jqXHR);
                    callback(false);
            
                }
    };
dinnerList.prototype.activate=function(){ 
             if ( appConfig.app.dbs==null)
             {
                alert("请先登入系统");
                router.navigate('#');
                 
             }
           
        };
        
        };
  return  dinnerList;
});