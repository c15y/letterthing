'use strict';

var app = angular.module('mean.system');

app.controller('IndexController', ['$scope', '$filter', 'Global',
  function($scope, $filter, Global) {
    $scope.global = Global;
    $scope.sites = {
      'makeapoint':{
        'name':'makeapoint',
        'text':'Makeapoint is a platform to craft and fine-tune ideas and messages providing a graphical experience which brough an offline methodlogy online',
        'author':'Linnovate',
        'link':'http://www.linnovate.net',
        'image':'/theme/assets/img/makeapoint.png'
      },
      'cactus':{
        'name':'Cactus Intranet',
        'text':'Cactus Intranet is an enterprise social network with features like real-time newsfeed, notifications, groups, events, polls, referral system etc. The system has role based permission system, allowing different stakeholders access and controls relevant to them.',
        'author':'QED42',
        'link':'http://www.qed42.com',
        'image':'/theme/assets/img/cactus.png'
      }
    };
    $scope.packages = {
      'gmap':{
        'name':'gmap',
        'text':'gmap lets you add geographical information to your applications objects',
        'author':'linnovate',
        'link':'http://www.qed42.com',
        'image':'/theme/assets/img/gmap.png'
      },
      'upload':{
        'name':'Upload',
        'text':'hello text',
        'author':'Linnovate',
        'link':'http://www.linnovate.net',
        'image':'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      },
      'socket':{
        'name':'Socket',
        'text':'Socket.io support',
        'author':'Linnovate',
        'link':'http://www.linnovate.net',
        'image':'http://cdn.designbyhumans.com/pictures/blog/09-2013/pop-culture-cats/Pop_Culture_Cats_Hamilton_Hipster.jpg'
      }
    };

    $scope.$watch(function () {
      for (var i = 0; i < $scope.sites.length; i+=1) {
        if ($scope.sites[i].active) {
          return $scope.sites[i];
        }
      }
    }, function (currentSlide, previousSlide) {
      if (currentSlide !== previousSlide) {
        console.log('currentSlide:', currentSlide);
      }
    });

    $scope.PhoneNumber = $filter("phone")(5557771234);
  }
]);

app.filter('phone', function () {
    return function (phone) {

        if (!phone) { return ''; }

        var value = phone.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return phone;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return phone;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});