'use strict';

angular.module('starter.services', [])

.service("marsDataService", function($http, $q, $rootScope, $timeout) {
      var mars = this;
      mars.album = {};
      var page = 0;

      var endPoint1 = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1001&api_key=EONpGrniR1AIRYU0IyMK3UEnDnyprtXPmFT4Sn6q';
      //var endPoint = '/api/marsapi.json';
      var endPoint = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

      mars.getAllPhotos = function() {
        var defer = $q.defer();

        $http.get(endPoint1)
          .success(function(response) {
            mars.album = response;
            defer.resolve(response);
          })
          .error(function(err, status) {
            defer.reject(err);
          })
        return defer.promise;
      }

      mars.filterPhotos = function(filter) {
        var data = {
          sol: filter.sol,
          camera: filter.camera,
          page: filter.page,
          api_key: 'EONpGrniR1AIRYU0IyMK3UEnDnyprtXPmFT4Sn6q'
        }

        var config = {
          params: data,
          paramsOrder: [data.sol, data.camera, data.page, data.api_key]
        };

        // var params = {
        //     "sol": 0,
        //     "page": page++,
        //     "api_key": 'EONpGrniR1AIRYU0IyMK3UEnDnyprtXPmFT4Sn6q'
        //   }
          //$http.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&page='+ page +'&api_key=EONpGrniR1AIRYU0IyMK3UEnDnyprtXPmFT4Sn6q')
        return $http.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?', config)
          .then(function(res) {
            console.log(res.data.photos, ' page: ', config.params)
              return res.data
            })
      }

      mars.filterPhotosOld = function(filter) {
        var defer = $q.defer();

        var data = {
          sol: filter.sol,
          camera: filter.camera,

          api_key: 'EONpGrniR1AIRYU0IyMK3UEnDnyprtXPmFT4Sn6q'
        }

        var config = {
          params: data,
          paramsOrder: [data.sol, data.camera, data.api_key]
        };

        $http.get(endPoint, config)
          .success(function(response) {
            mars.album = response;
            defer.resolve(response);
          })
          .error(function(err, status) {
            defer.reject(err);
          })
        return defer.promise;
      }

      mars.getAllData = function(param) {

        var params = {
            "sol": 0,
            "page": page++,
            "api_key": 'EONpGrniR1AIRYU0IyMK3UEnDnyprtXPmFT4Sn6q'
          }
          //$http.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&page='+ page +'&api_key=EONpGrniR1AIRYU0IyMK3UEnDnyprtXPmFT4Sn6q')
        return $http.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?', {
            params: params
          })
          .then(function(res) {
              return res.data
            })
          };

        return mars;
        /*
          var deferred = $q.defer();
          $http.get('http://www.json-generator.com/api/json/get/cfvEGqRXQO?indent=2').then(function(data) {
            deferred.resolve(data);
          });
          this.getMarsResults = function() {
            return deferred.promise;
          } */
      })
    .factory('Chats', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
      }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
      }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
      }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
      }];

      return {
        all: function() {
          return chats;
        },
        remove: function(chat) {
          chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
          for (var i = 0; i < chats.length; i++) {
            if (chats[i].id === parseInt(chatId)) {
              return chats[i];
            }
          }
          return null;
        }
      };
    });
