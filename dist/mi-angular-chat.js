/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @ngInject
	 */

	module.exports = angular
	  .module('mi.Chat', ['mi/template/chat.html'])

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
	  .directive('miChat', ['$timeout', 'lodash', function ($timeout, lodash) {
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
	        scope.$msgContainer.bind('scroll', lodash.throttle(function () {
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


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWJjNDAzNTIwYWM1NjhiNGQ4ZjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixZQUFZO0FBQzNDO0FBQ0E7QUFDQSxvRkFBbUYsdURBQXVEO0FBQzFJO0FBQ0EsV0FBVSxpQkFBaUI7QUFDM0IsV0FBVSxrQkFBa0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEVBQTZFLDJCQUEyQjtBQUN4RztBQUNBLCtFQUE4RSx1QkFBdUI7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMiLCJmaWxlIjoibWktYW5ndWxhci1jaGF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1YmM0MDM1MjBhYzU2OGI0ZDhmMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdJbmplY3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXJcbiAgLm1vZHVsZSgnbWkuQ2hhdCcsIFsnbWkvdGVtcGxhdGUvY2hhdC5odG1sJ10pXG5cbiAgLy8gY29udHJvbGxlciAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAuY29udHJvbGxlcignTWlDaGF0Q29udHJvbGxlcicsIFsnJHNjb3BlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24gKCRzY29wZSwgJHRpbWVvdXQpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuXG4gICAgdm0ubWVzc2FnZXMgPSAkc2NvcGUubWVzc2FnZXM7XG4gICAgdm0udXNlcm5hbWUgPSAkc2NvcGUudXNlcm5hbWU7XG4gICAgdm0uaW5wdXRQbGFjZWhvbGRlclRleHQgPSAkc2NvcGUuaW5wdXRQbGFjZWhvbGRlclRleHQ7XG4gICAgdm0uc3VibWl0QnV0dG9uVGV4dCA9ICRzY29wZS5zdWJtaXRCdXR0b25UZXh0O1xuICAgIHZtLnRpdGxlID0gJHNjb3BlLnRpdGxlO1xuICAgIHZtLm1lc3NhZ2UgPSAnJztcblxuICAgIHZtLnN1Ym1pdENhbGwgPSBzdWJtaXRDYWxsO1xuXG4gICAgZnVuY3Rpb24gc3VibWl0Q2FsbCgpIHtcbiAgICAgICRzY29wZS5zdWJtaXRDYWxsYmFjaygpKHZtLm1lc3NhZ2UsIHZtLnVzZXJuYW1lKTtcbiAgICAgIHZtLm1lc3NhZ2UgPSAnJztcbiAgICAgIHNjcm9sbFRvQm90dG9tKCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLiR3YXRjaCgnY2hhdC5tZXNzYWdlcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNjcm9sbFRvQm90dG9tKCk7XG4gICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzY29wZS4kY2hhdElucHV0LmZvY3VzKCk7XG4gICAgICB9LCAyMDApO1xuICAgIH0pO1xuICAgICRzY29wZS4kd2F0Y2goJ2NoYXQubWVzc2FnZXMubGVuZ3RoJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEkc2NvcGUuaGlzdG9yeUxvYWRpbmcpIHtcbiAgICAgICAgc2Nyb2xsVG9Cb3R0b20oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvQm90dG9tKCkge1xuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUuJG1zZ0NvbnRhaW5lclswXS5zY3JvbGxUb3AgPSAkc2NvcGUuJG1zZ0NvbnRhaW5lclswXS5zY3JvbGxIZWlnaHQ7XG4gICAgICB9LCAyMDAsIGZhbHNlKTtcbiAgICB9XG5cbiAgfV0pXG5cbiAgLy8gZGlyZWN0aXZlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAuZGlyZWN0aXZlKCdtaUNoYXQnLCBbJyR0aW1lb3V0JywgJ2xvZGFzaCcsIGZ1bmN0aW9uICgkdGltZW91dCwgbG9kYXNoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIGNvbnRyb2xsZXI6ICdNaUNoYXRDb250cm9sbGVyJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ2NoYXQnLFxuICAgICAgdGVtcGxhdGVVcmw6IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICAgICAgICByZXR1cm4gYXR0cnMudGVtcGxhdGVVcmwgfHwgJ21pL3RlbXBsYXRlL2NoYXQuaHRtbCc7XG4gICAgICB9LFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgbWVzc2FnZXM6ICc9JyxcbiAgICAgICAgdXNlcm5hbWU6ICc9JyxcbiAgICAgICAgdGl0bGU6ICdAJyxcbiAgICAgICAgaW5wdXRQbGFjZWhvbGRlclRleHQ6ICdAJyxcbiAgICAgICAgc3VibWl0QnV0dG9uVGV4dDogJ0AnLFxuICAgICAgICBzdWJtaXRDYWxsYmFjazogJyYnXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50KSB7XG4gICAgICAgIC8vIGNoYXQgaGVhZGVyXG4gICAgICAgIGlmICghc2NvcGUudGl0bGUpIHtcbiAgICAgICAgICBzY29wZS50aXRsZSA9ICdDaGF0JztcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGF0IGlucHV0XG4gICAgICAgIGlmICghc2NvcGUuaW5wdXRQbGFjZWhvbGRlclRleHQpIHtcbiAgICAgICAgICBzY29wZS5pbnB1dFBsYWNlaG9sZGVyVGV4dCA9ICcuLi4geW91ciBtZXNzYWdlIC4uLic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzY29wZS5zdWJtaXRCdXR0b25UZXh0KSB7XG4gICAgICAgICAgc2NvcGUuc3VibWl0QnV0dG9uVGV4dCA9ICdTZW5kJztcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlLiRtc2dDb250YWluZXIgPSBhbmd1bGFyLmVsZW1lbnQoZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcuY2hhdC1ib2R5JykpO1xuICAgICAgICBzY29wZS4kY2hhdElucHV0ID0gZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yKCcuY2hhdC1pbnB1dC1maWVsZCcpO1xuXG4gICAgICAgIHZhciBlbFdpbmRvdyA9IHNjb3BlLiRtc2dDb250YWluZXJbMF07XG4gICAgICAgIHNjb3BlLiRtc2dDb250YWluZXIuYmluZCgnc2Nyb2xsJywgbG9kYXNoLnRocm90dGxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gZWxXaW5kb3cuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgIGlmIChlbFdpbmRvdy5zY3JvbGxUb3AgPD0gMTApIHtcbiAgICAgICAgICAgIHNjb3BlLmhpc3RvcnlMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLiRhcHBseShzY29wZS5pbmZpbml0ZVNjcm9sbCk7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNjb3BlLmhpc3RvcnlMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChzY3JvbGxIZWlnaHQgIT09IGVsV2luZG93LnNjcm9sbEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLiRtc2dDb250YWluZXJbMF0uc2Nyb2xsVG9wID0gMzYwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxNTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pXG5cbjtcblxuYW5ndWxhci5tb2R1bGUoJ21pL3RlbXBsYXRlL2NoYXQuaHRtbCcsIFtdKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21pL3RlbXBsYXRlL2NoYXQuaHRtbCcsXG4gICAgJzxkaXYgY2xhc3M9XCJyb3cgbWktY2hhdFwiPicgK1xuICAgICc8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1zbS0xMlwiPicgK1xuICAgICc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPicgK1xuICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZyBjaGF0LWhlYWRlclwiPicgK1xuICAgICc8aDMgY2xhc3M9XCJwYW5lbC10aXRsZVwiPnt7Y2hhdC50aXRsZX19PC9oMz4nICtcbiAgICAnPC9kaXY+JyArXG4gICAgJzxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5IGNoYXQtYm9keVwiPicgK1xuICAgICc8ZGl2IGNsYXNzPVwicm93IGNoYXQtbWVzc2FnZVwiIG5nLXJlcGVhdD1cIm1lc3NhZ2UgaW4gY2hhdC5tZXNzYWdlc1wiIG5nLWNsYXNzPVwie1xcJ3NlbGYtYXV0aG9yZWRcXCc6IChjaGF0LnVzZXJuYW1lID09IG1lc3NhZ2UudXNlcm5hbWUpfVwiPicgK1xuICAgICc8ZGl2IGNsYXNzPVwiY29sLXhzLTEyIGNvbC1zbS0xMlwiPicgK1xuICAgICc8cD57e21lc3NhZ2UuY29udGVudH19PC9wPicgK1xuICAgICc8cD57e21lc3NhZ2UudXNlcm5hbWV9fTwvcD4nICtcbiAgICAnPC9kaXY+JyArXG4gICAgJzwvZGl2PicgK1xuICAgICc8L2Rpdj4nICtcbiAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWZvb3RlciBjaGF0LWZvb3RlclwiPicgK1xuICAgICc8Zm9ybSBuZy1zdWJtaXQ9XCJjaGF0LnN1Ym1pdENhbGwoKVwiPicgK1xuICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj4nICtcbiAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY2hhdC1pbnB1dC1maWVsZFwiIHBsYWNlaG9sZGVyPVwie3tjaGF0LmlucHV0UGxhY2Vob2xkZXJUZXh0fX1cIiBuZy1tb2RlbD1cImNoYXQubWVzc2FnZVwiLz4nICtcbiAgICAnPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj4nICtcbiAgICAnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBjaGF0LXN1Ym1pdC1idXR0b25cIiB2YWx1ZT1cInt7Y2hhdC5zdWJtaXRCdXR0b25UZXh0fX1cIi8+JyArXG4gICAgJzwvc3Bhbj4nICtcbiAgICAnPC9kaXY+JyArXG4gICAgJzwvZm9ybT4nICtcbiAgICAnPC9kaXY+JyArXG4gICAgJzwvZGl2PicgK1xuICAgICc8L2Rpdj4nICtcbiAgICAnPC9kaXY+J1xuICApO1xufV0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=