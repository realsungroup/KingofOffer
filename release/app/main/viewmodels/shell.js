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
                { route: '', title:'欢迎', moduleId: 'main/viewmodels/welcome', nav: true },
                { route: 'orderrpt*details',title:'管理', moduleId: 'orderrpt/index', nav: true },
                { route: 'update',title:'重新登入', moduleId: 'main/viewmodels/update', nav: true }
            ]).buildNavigationModel();
           
            return router.activate();
        }
    };
});