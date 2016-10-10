define(['plugins/http', 'durandal/app', 'knockout','durandal/system','plugins/router','./scanner','plugins/dialog'], function (http, app, ko,system,router,scanner,dialog) {
  openScanner=function(){
    scanner.show().then(function(response) {
      //system.log(response);
    });
  }
  return {
  };
});