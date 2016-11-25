define(['durandal/app','knockout','plugins/router','plugins/dialog','calendar/fullcalendar','durandal/viewEngine','jqueryprint'], function (app,ko,router,dialog,fullcalendar,viewEngine) {

    return {
        activate:function(){},
        mlist:ko.observableArray([]),
        attached:function(){
            mini.parse();  
            baseUrl=appConfig.app.baseUrl;
            var ucode = appConfig.app.ucode;
            var user  = appConfig.app.user;
            var dbs=new dbHelper(baseUrl,user,ucode);
            var cpnid=appConfig.app.cpnid;
            var resid=appConfig.app.resid;
            var cmswhere="",cpn="";

            menuIndex=function(self,cpn){
                if(cpn){
                    cmswhere=cpn;
                }
                // if(C3_530883695470==undefined){
                //     cmswhere="";
                // }else if(C3_530883695470==undefined){
                //     cmswhere="";
                // }else if(C3_530883695470==undefined){
                //     cmswhere="";
                // }else if(C3_530883695470==undefined){
                //     cmswhere="";
                // }else{
                //     cmswhere="";
                //}
                dbs.dbGetdata(cpnid,0,cmswhere,fnSuccess,null,fnhttperror);
                function fnSuccess(data){
                    self.mlist(data);
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR);
                }
            }
            menuIndex(this);
        //     var fileupload = mini.get("fileupload1");
        //     fileupload.setUploadUrl(appConfig.app.uploadFileUrl+appConfig.app.uppath+appConfig.app.httppath);
        //     var imgfield=mini.get('imgurl');
        //     var imgurl= imgfield.getValue();
        //     if (imgurl)
        //     {
        //         var img=$("#imgUploaded");
        //         img[0].src=imgurl;
        //     }


            // saveClick=function(){
            //         mini.parse();
            //         var form = new mini.Form("form");
            //         var o =  new mini.Form("form").getData();
            //         form.validate(); 
            //         if (form.isValid() == false) return;
            //         o._id=1;
            //         o._state="added";
            //         var json = mini.encode([o]);
            //         console.log(json);
            //         dbs.dbSavedata(resid,0,json,dataSaved,fnerror,fnhttperror);
                    
            //         function dataSaved(text){
            //             dialog.showMessage('<h1>添加成功</h1>','菜品新增',['返回'],true);
            //         }
            //         function fnerror(text){
            //             dialog.showMessage(text.message,'添加失败',['返回'],true);
            //         }
            //         function fnhttperror(jqXHR, textStatus, errorThrown){
            //             dialog.showMessage('error','菜品新增',['返回'],true);
            //         }

            // }  
        },
        cpnClick:function(cpn){
            console.log(cpn);
            //cpmenu(this,cpn);
        },
    }
})