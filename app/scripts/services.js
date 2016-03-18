'use strict';

angular.module('starter.services', ['config'])

.service("marsDataService", function($http, $q, $rootScope, $timeout, ENV) {
      var mars = this;
      mars.album = {};
      var page = 0;

      mars.filterPhotos = function(filter) {

        var data = {
          sol: filter.sol,
          camera: filter.camera,
          page: filter.page,
          api_key: ENV.api_key
        }

        var config = {
          params: data,
          paramsOrder: [data.sol, data.camera, data.page, data.api_key]
        };

        return $http.get(ENV.apiEndpoint, config)
          .then(function(res) {
              return res.data
            })
      }

        return mars;
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
