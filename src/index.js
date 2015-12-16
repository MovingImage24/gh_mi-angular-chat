'use strict';

/**
 * @ngInject
 */

require('ng-lodash');

module.exports = angular
  .module('mi.Chat', ['mi/template/chat.html', 'ngLodash'])

  // controller ////////////////////////////////////////////////////////////////////////////////////////////////////////
  .controller('MiChatController', ['$scope', '$timeout', function ($scope, $timeout) {
    var vm = this;

    vm.messages = $scope.messages;
    vm.username = $scope.username;
    vm.inputPlaceholderText = $scope.inputPlaceholderText;
    vm.submitButtonText = $scope.submitButtonText;
    vm.title = $scope.title;
    vm.message = '';

    vm.submitCall = submitCall;

    function submitCall() {
      $scope.submitCallback()(vm.message, vm.username);
      vm.message = '';
      scrollToBottom();
    }

    $scope.$watch('chat.messages', function () {
      scrollToBottom();
      $timeout(function () {
        $scope.$chatInput.focus();
      }, 200);
    });
    $scope.$watch('chat.messages.length', function () {
      if (!$scope.historyLoading) {
        scrollToBottom();
      }
    });

    function scrollToBottom() {
      $timeout(function () {
        $scope.$msgContainer[0].scrollTop = $scope.$msgContainer[0].scrollHeight;
      }, 200, false);
    }

  }])

  // directive /////////////////////////////////////////////////////////////////////////////////////////////////////////
  .directive('miChat', ['$timeout', 'lodash', function ($timeout, _) {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'MiChatController',
      controllerAs: 'chat',
      templateUrl: function (element, attrs) {
        return attrs.templateUrl || 'mi/template/chat.html';
      },
      scope: {
        messages: '=',
        username: '=',
        title: '@',
        inputPlaceholderText: '@',
        submitButtonText: '@',
        submitCallback: '&'
      },
      link: function (scope, element) {
        // chat header
        if (!scope.title) {
          scope.title = 'Chat';
        }
        // chat input
        if (!scope.inputPlaceholderText) {
          scope.inputPlaceholderText = '... your message ...';
        }
        if (!scope.submitButtonText) {
          scope.submitButtonText = 'Send';
        }

        scope.$msgContainer = angular.element(element[0].querySelector('.chat-body'));
        scope.$chatInput = element[0].querySelector('.chat-input-field');

        var elWindow = scope.$msgContainer[0];
        scope.$msgContainer.bind('scroll', _.throttle(function () {
          var scrollHeight = elWindow.scrollHeight;
          if (elWindow.scrollTop <= 10) {
            scope.historyLoading = true;
            scope.$apply(scope.infiniteScroll);
            $timeout(function () {
              scope.historyLoading = false;
              if (scrollHeight !== elWindow.scrollHeight) {
                scope.$msgContainer[0].scrollTop = 360;
              }
            }, 150);
          }
        }, 300));
      }
    };
  }])

;

angular.module('mi/template/chat.html', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('mi/template/chat.html',
    '<div class="row mi-chat">' +
    '<div class="col-xs-12 col-sm-12">' +
    '<div class="panel panel-default">' +
    '<div class="panel-heading chat-header">' +
    '<h3 class="panel-title">{{chat.title}}</h3>' +
    '</div>' +
    '<div class="panel-body chat-body">' +
    '<div class="row chat-message" ng-repeat="message in chat.messages" ng-class="{\'self-authored\': (chat.username == message.username)}">' +
    '<div class="col-xs-12 col-sm-12">' +
    '<p>{{message.content}}</p>' +
    '<p>{{message.username}}</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="panel-footer chat-footer">' +
    '<form ng-submit="chat.submitCall()">' +
    '<div class="input-group">' +
    '<input type="text" class="form-control chat-input-field" placeholder="{{chat.inputPlaceholderText}}" ng-model="chat.message"/>' +
    '<span class="input-group-btn">' +
    '<input type="submit" class="btn btn-primary chat-submit-button" value="{{chat.submitButtonText}}"/>' +
    '</span>' +
    '</div>' +
    '</form>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  );
}]);
