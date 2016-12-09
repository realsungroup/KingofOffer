define(['durandal/app','knockout','plugins/router','plugins/dialog','./recop'], function (app,ko,router,dialog,recop) {
    var baseUrl=appConfig.app.baseUrl;
    var getMethod=appConfig.app.getMethod;
    var saveMethod=appConfig.app.saveMethod;
    var ucode = appConfig.app.ucode;
    var user  = appConfig.app.user;
    var dbs=new dbHelper(baseUrl,user,ucode);
    var opaid=appConfig.offer.opaid;
    var cnn={};
    var newoffer = function() {
    };
    newoffer.prototype.cancel = function() {
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
        showImg=function(no){
            alert(1)
            if(no=="img1"){
                $("#imgUploaded").removeAttr("hidden"); 
            }else if(no=="img2"){
                $("#imgUploaded2").removeAttr("hidden"); 
            }
        };
        // $("#imgurl").change(function(){
        //     alert(1)
        // });
    };
    newoffer.prototype.attached=function(){
        mini.parse();
        cnn={};
        cpnn=function(){
            recop.show().then(function(opn){
                if(opn){
                    cnn.C3_534181767190="2000-01-01"
                    cnn.C3_534181598826=opn.C3_522691669347;
                    cnn.C3_534181645731=opn.C3_522691670315;
                    cnn.C3_534181718652=opn.C3_522691669613;
                    cnn.C3_534181730034=opn.C3_522691669878;
                    cnn.C3_534264776828=opn.C3_522691670096;
                    var form = new mini.Form("form2");
                    form.setData(cnn);
                }
            });
        }
        $("input[name*='C3_534181598826']").focus(function(){
            cpnn();
        });
        // $("input[name*='C3_534181645731']").focus(function(){
        //     cpnn();
        // });
        // $("input[name*='C3_534181718652']").focus(function(){
        //     cpnn();
        // });
        // $("input[name*='C3_534181730034']").focus(function(){
        //     cpnn();
        // });
        // $("input[name*='C3_534264776828']").focus(function(){
        //     cpnn();
        // });
        // var fileupload = mini.get("fileupload1");//上传图片
        // // fileupload.setUploadUrl(appConfig.app.uploadFileUrl+appConfig.app.uppath+appConfig.app.httppath);
        // var imgfield=mini.get('imgurl');
        // var imgurl= imgfield.getValue();
        // if (imgurl)
        // {
        //     $("#imgUploaded").removeAttr("hidden"); 
        // };
        // var fileupload2 = mini.get("fileupload2");//上传图片
        // // fileupload.setUploadUrl(appConfig.app.uploadFileUrl+appConfig.app.uppath+appConfig.app.httppath);
        // var imgfield2=mini.get('imgurl2');
        // var imgurl2= imgfield2.getValue();
        // if (imgurl2)
        // {
        //     $("#imgUploaded2").removeAttr("hidden"); 
        // };
        // varfileupload = mini.get("fileupload1");
        // fileupload.setUploadUrl(appConfig.app.uploadFileUrl+"?savepath=d:\\web\\rispweb\\upfiles&httppath="+appConfig.app.httppath);
        // var imgfield=mini.get('imgurl');
        // var imgurl= imgfield.getValue();
        // if (imgurl)
        // {
        //     // var img=$("#imgUploaded");
        //     // img[0].src=imgurl;
        //     console.log(imgurl);
        //     alert(1)
        // }
        // // var fileupload2 = mini.get("fileupload2");
        // // fileupload2.setUploadUrl(appConfig.app.uploadFileUrl+"?savepath=d:\\web\\rispweb\\upfiles&httppath="+appConfig.app.httppath);
        // var imgfield2=mini.get('imgurl2'); 
        // var imgurl2= imgfield2.getValue();
        // if (imgurl2)
        // {
        //     //    var img=$("#imgUploaded2");
        //     //     img[0].src=imgurl2;
        //     console.log(imgurl2)
        // }
    };
   
    newoffer.prototype.compositionComplete=function(){
        vchange=function(){
            var salary = mini.getbyName('C3_534181957670').value;
            var yeb = mini.getbyName('C3_534181974758').value;
            var stocks = mini.getbyName('C3_534181984193').value;
            var allowance = mini.getbyName('C3_534181995445').value;
            var other = mini.getbyName('C3_534182003641').value;
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
 