define(['durandal/app','knockout','plugins/router','plugins/dialog','./recop'], function (app,ko,router,dialog,recop) {
    return {
        recid:ko.observableArray(""),
        activate:function(recid,e){
            this.recid=recid;

        }
    }
})