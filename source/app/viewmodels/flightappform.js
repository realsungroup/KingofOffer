define(['plugins/dialog', 'knockout'], function (dialog, ko) {
    var flightappform = function() {
     
    };
    flightappform.prototype.data;
    flightappform.prototype.ok = function() {


          
        var o =  new mini.Form("form3").getData();
        for(var p in o) 
        { 
            this.data[p]=o[p]; 
        } 
         dialog.close(this, this.data);
    };
    flightappform.prototype.attached=function(){
       
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