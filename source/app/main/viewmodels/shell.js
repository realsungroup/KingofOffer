define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
             
                { route: ['','offer'],title:'Offer', moduleId: 'main/viewmodels/offer', nav: true },
                { route: 'eapage', title:'eapage', moduleId: 'main/viewmodels/eapage' },
                { route: 'auditpage/:id', title:'auditpage', moduleId: 'main/viewmodels/auditpage' },
                { route: 'confirmation', title:'confirmation', moduleId: 'main/viewmodels/confirmation' },
                { route: 'eacpage', title:'confirmation', moduleId: 'main/viewmodels/eacpage' }

            ]).buildNavigationModel();
           
            return router.activate();
        }
    };
});