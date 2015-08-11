(function () {
    var app = angular.module('app', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/about");

        $stateProvider
          .state('about', { url: "/about", templateUrl: "Templates/about.html", controller: 'aboutController' })
          .state('services', { url: "/services", templateUrl: "Templates/services.html", controller: 'servicesController' })
          .state('portfolio', { url: "/portfolio?id", templateUrl: "Templates/portfolio.html", controller: 'portfolioController' })
          .state('testimonials', { url: "/testimonials", templateUrl: "Templates/testimonials.html", controller: 'testimonialsController' })
          .state('contact', { url: "/contact", templateUrl: "Templates/contact.html", controller: 'contactController' });
    });


    


    angular.module('app').controller('appController', function ($scope, $location, commonService) {

        var clientMenuItems = [];

        commonService.clients.forEach(function (client) {
            clientMenuItems.push({ text: client.name, view: 'portfolio', id: client.id });
        });

        $scope.ui = {
            menuItems: [
                { text: 'ABOUT', view: 'about' },
                { text: 'SERVICES', view: 'services' },
                { text: 'PORTFOLIO', view: 'portfolio', id : commonService.clients[0].id, menuItems: clientMenuItems },
                { text: 'TESTIMONIALS', view: 'testimonials' },
                { text: 'CONTACT', view: 'contact' }]
        };

        $scope.menuClick = function(view, id) {
            $location.url('/' + view + (id ? "?id=" + id : ""));
        }
    });

    angular.module('app').controller('aboutController', function ($scope, commonService) {
        $scope.text = commonService.about;
    });

    angular.module('app').controller('servicesController', function ($scope, commonService) {
        $scope.services = commonService.services;
    });

    angular.module('app').controller('portfolioController', function ($scope, $stateParams, commonService) {
        var id = $stateParams.id;
        $scope.text = '';
        
        commonService.clients.forEach(function (client) {
            
            if (client.id === id) {
                $scope.name = client.name;
                $scope.text = client.text;
                $scope.url = client.url;
                $scope.image = client.image;
            }
        });
    });

    angular.module('app').controller('testimonialsController', function ($scope, commonService) {

        commonService.testimonials.forEach(function (testimonial) {
            if (testimonial.url) {
                testimonial.site = testimonial.url
                    .replace("https://", "")
                    .replace("http://", "");
            }
        });


        $scope.testimonials = commonService.testimonials;
    });

    angular.module('app').controller('contactController', function ($scope) {

    });

})();


