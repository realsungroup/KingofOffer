define(['plugins/dialog', 'knockout'], function (dialog, ko) {
    var flightappform = function() {
     
    };
   // var data=new object();
    flightappform.prototype.data;
    flightappform.prototype.ok = function() {


          //var form = new mini.Form("form3");
          var o =  new mini.Form("form3").getData();
        dialog.close(this,o);
    };
    flightappform.prototype.attached=function(){
       // alert('attached');
        mini.parse();
        new mini.Form("form3").setData(this.data);

    };

    flightappform.prototype.canDeactivate = function () {
        return dialog.showMessage('Are you sure ?', 'Just Checking...', ['Yes', 'No']);
    };

    flightappform.show = function(formdata){
        flightappform.prototype.data=formdata;
        return dialog.show(new flightappform());
    };
    
  
           
       
    return flightappform;
});