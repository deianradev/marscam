'use strict';

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, marsDataService, $timeout, $state) {

    $scope.noMoreItemsAvailable = false;
    $scope.items = [];

    var page = 0;
    var filter = {};

    $rootScope.$on('update', function(event, f) {
      //reset noMoreItemsAvailable on filter update
      $scope.noMoreItemsAvailable = false;

      filter = f.filter;

      //clear out the items -- reset
      $scope.items = [];

      //go to main tab
      $state.go('tab.dash')

      $timeout(function() {
        $scope.loadMore();
      }, 1000)

    })
    $scope.init = function() {};

    $scope.loadMore = function() {
      if ($scope.noMoreItemsAvailable) return;
      $scope.getAll(filter);
    }

    $scope.getAll = function(f) {

      var defaultFilterConfig = {
        sol: 1100,
        camera: 'MAST',
        page: page++
      }

      if (!f || Object.keys(f).length === 0) {
        f = defaultFilterConfig;
      }
      else{
        f.page++;
      }

      marsDataService.filterPhotos(f)
      .then(function(res) {

            if (!res.photos.length) {
              $scope.noMoreItemsAvailable = true;

            } else {
              $timeout(function() {
                Array.prototype.push.apply($scope.items, res.photos);

                //increase f.page by one to get next page-only happens when filter is applied
                //if (f.page)
                  //f.page++;
              }, 1)
            }
          },
          function(err, status) {
            console.log('error ')
            $scope.noMoreItemsAvailable = true;
          }
        )
        .finally(function() {
          $scope.$broadcast('scroll.infiniteScrollComplete');

        })
    }

    $scope.init();

  })
  .controller('FilterCtrl', function($scope, $rootScope, marsDataService) {

    $scope.init = function() {
      //any initialization to be done here
    };
    $rootScope.$on('update', function() {

    })
    $scope.submit = function(filter) {
      filter.page = 0;
      $rootScope.$broadcast('update', {
        filter: filter
      })
    }

    $scope.init();
  })
  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
