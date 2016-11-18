define(['plugins/http', 'durandal/app', 'knockout','durandal/system','plugins/router','./scanner','plugins/dialog'], function (http, app, ko,system,router,scanner,dialog) {
  var oneorder = (function (_super) {
                __extends(oneorder, _super);
                function oneorder(id,action,orderAction,stationid) {
                        _super.call(this, id,action);
                        this.C3_512262253052=orderAction;
                        this.C3_530474055358=stationid;
                    }
                return oneorder;
         }(onerecord));
 
  var dinnerList=function(){
        this.printedcount=0;
        this.haverows=ko.observable(false);
        this.audiostr=ko.observable("");
        this.rows= ko.observableArray([]);
        this.subrows=ko.observableArray([]);
        this.pageSize=0;
        this.pageIndex=0;
        this.total=0;
        this.barcode=ko.observable("");
        self=this;
        
        this.columns= [
            { headerText: "图例" },
            { headerText: "菜品名称" },
            { headerText: "描述" },
            { headerText: "单价" },
            { headerText: "数量" },
            { headerText: "小计" }
        ];
        this.printcolumns= [
          
            { headerText: "菜品名称" },
          
            { headerText: "单价" },
            { headerText: "数量" },
            { headerText: "小计" }
        ];
      ko.computed(function () { 
         system.log('barcodechange');
         if (self.barcode()!=="" && self.barcode()!==undefined){   
             fetchPage(self);
           }
      
         
    });
    finishOrderSilently=function(){
        try {
             var record=new oneorder(self.rows()[0].REC_ID,"modified","Y",appConfig.app.winno);
             var records=[];
             records.push(record);
             var json=mini.encode(records);
             appConfig.app.dbs.dbSavedataWithparm(appConfig.dinnerlist.resid,0,json,"0","1","0",fnsaved,fnnosave,fnsyserror);
              //领取成功打印，打印指令发送后再打开扫描窗口。等待1秒钟
              function fnsaved(data){ 
                       sendPrinter(function(){
                           setTimeout(function() {
                                self.haverows(false);
                                self.rows.removeAll();
                                self.subrows.removeAll();
                                self.total=0;   
                                self.barcode("");
                                openScanner();
                           }, 1000);
                          
                       });
          
                }
            //领取失败不打印
              function fnnosave(data){ 
                       self.haverows(false);
                       self.rows.removeAll();
                       self.subrows.removeAll();
                       self.total=0;   
                       self.barcode("");
                       openScanner();
                //    dialog.showMessage(data.message,'领取失败，操作错误',[],true);
     
              }
               //领取失败不打印
              function fnsyserror(data){ 
                       self.haverows(false);
                       self.rows.removeAll();
                       self.subrows.removeAll();
                       self.total=0;   
                       self.barcode("");
                       openScanner();
                //    dialog.showMessage(JSON.stringify(data),'领取失败,通信失败',[],true);
                   
              }
            
        } catch (error) {
                        openScanner();
            
        }

    }
    finishOrder=function(){

       try {
             var record=new oneorder(self.rows()[0].REC_ID,"modified","Y",appConfig.app.winno);
             var records=[];
             records.push(record);
             var json=mini.encode(records);
             appConfig.app.dbs.dbSavedataWithparm(appConfig.dinnerlist.resid,0,json,"0","1","0",fnsaved,fnnosave,fnsyserror);
             function fnsaved(data){ 
                  dialog.showMessage("谢谢下次光临",'领取完成',[],true).then(
                  function(response){

                       self.haverows(false);
                       self.rows.removeAll();
                       self.subrows.removeAll();
                       self.total=0;   
                       self.barcode("");
              
                  }); }
              function fnnosave(data){ 
                   dialog.showMessage(data.message,'领取失败，操作错误',[],true);
     
              }
              function fnsyserror(data){ 
                   dialog.showMessage(JSON.stringify(data),'领取失败,通信失败',[],true);
                   
              }
           
       } catch (error) {
             dialog.showMessage(JSON.stringify(error),'领取失败,系统错误',[],true);
           
       }
        
    };
     openScanner=function(){
          var audio=$("#menuaudio")[0];
          self.audiostr("");
          audio.pause();
          setTimeout(function() {
              scanner.show().then(function(response) {
             
                        self.barcode(response);
                 });
              
          }, 100);
          
    }
    sendPrinter=function(printed){
                setTimeout(function() {
                                    var strHTML=document.getElementById("printmenu").innerHTML;
                                    LODOP.ADD_PRINT_HTM(10,5,"100%","100%",strHTML);
                                    LODOP.SET_PRINT_PAGESIZE(3,1385,45,"")
                                    LODOP.SET_PREVIEW_WINDOW(0,0,0,760,540,"");	
                                    LODOP.PRINT();
                                    self.printedcount++;
                                    printed();
                                    }, 50);//如果是无屏幕模式那么自动领取操作。
    }
    fetchPage=function(self){

                
                fetchrows(system, self.barcode(),self.pageSize,self.pageIndex,function(result,data,subdata,count){
                   
                    if (result)
                    { 
                       self.haverows(false);
                       self.rows.removeAll();
                       self.subrows.removeAll();     
                       self.rows(data);
                       self.subrows(subdata);
                       self.total=count;
                       self.barcode("");
                       if (count > 0){ 
                           self.haverows(true);
                           if (appConfig.app.setupaudio){//语音播报菜单
                                var play=1;
                                self.audiostr(appConfig.app.audiotranslateurl+encodeURI("配餐前，请先点击领取按钮"));
                                var audio=$("#menuaudio")[0];
                                audio.onended=function(){
                                    if (play==1){
                                        play=2;
                                        self.audiostr(data[0].C3_531434981277);
                                        audio.play();
                                        return;
                                    }
                                    
                                    if (play==2){
                                            setTimeout(function() {
                                                                    audio.play();
                                                                    play=3;
                                                                    }, 
                                                        500);
                                        return;
                                            
                                    }
                                    
                                }

                           }
                           if (appConfig.app.displaymode=="none")
                           {

                                     finishOrderSilently();

                            }
                            else
                            {
                                if (appConfig.app.setupprinter){
                                      sendPrinter();
                                }
                            }
                           
                        }
                        else
                        {
                              if (appConfig.app.displaymode=="none")
                                  { openScanner();}
                        }
                       
                    }
                    else
                    {
                   
                       self.haverows(false);
                       self.rows.removeAll();
                       self.subrows.removeAll();
                       self.total=0;   
                       self.barcode("");
                        if (appConfig.app.displaymode=="none")
                           { openScanner();}
                      

                    }
                    
                    }
                );
        }
    fetchrows= function (system,barcode,pageSize,pageIndex,callback) {
                var resid=appConfig.dinnerlist.resid;
                var subresid=appConfig.dinnerlist.subresid;
                // var cmswhere="C3_512261452989="+barcode+" or (C3_529489922410="+barcode+" and C3_512140206161="+appConfig.kingofdinner.dinnerdates+" and C3_512140206692="+appConfig.kingofdinner.dinnerno+")";
                //alert(cmswhere);
                appConfig.appfunction.system.refreshWinpos(function(){
                    var cmswhere="C3_529489922410="+barcode+" and C3_512140206161="+appConfig.kingofdinner.dinnerdates+" and C3_512140206692="+appConfig.kingofdinner.dinnerno;
                    appConfig.app.dbs.dbGetdata(resid,subresid,cmswhere,dataGot,fnerror,fnhttperror,pageSize,pageIndex);
                    function dataGot(data,subdata,total)
                    {
                        system.log(data);
                        system.log("total="+total);
                        
                        callback(true,data,subdata,total);
                    }
                    function fnerror(data){   

                      if (appConfig.app.displaymode=="none")
                        {
                            callback(false);
                            return;
                        }
                        dialog.showMessage(JSON.stringify(data),"获取订单错误");
                        callback(false);

                    }
                    function fnhttperror(jqXHR, textStatus, errorThrown){
                
                        system.log(jqXHR);
                        callback(false);
                
                    }

                });
                
    };
dinnerList.prototype.activate=function(){ 
             if ( appConfig.app.dbs==null)
             {
               // alert("请先登入系统");
                //router.navigate('#');
                 
             }
           
        };
dinnerList.prototype.attached=function(){
       
    if ( appConfig.app.dbs==null)
             {
                // dialog.showMessage('请先登入系统',"新同事");
                 router.navigate('#');
                 
             }
             else{
                 
                 if (appConfig.app.displaymode=="none")
                 {
                     openScanner();
                 }
             }
    

    };      
        };
  return  dinnerList;
});