define(['plugins/dialog', 'knockout'], function (dialog, ko) {
    var scanner = function() {
     
    };
    
    scanner.prototype.cancel = function() {
           
        dialog.close(this);              
    };
    scanner.prototype.ok = function() {
    
        var that=this;
        var barcode=$("#barcode").val();
       dialog.close(that,barcode);
        
    };
    scanner.prototype.attached=function(){
       
   

    };

    scanner.prototype.canDeactivate = function () {
        return true;
        
    };

    scanner.show = function(){
       
        return dialog.show(new scanner());
    };
    
  
           
       
    return scanner;
});