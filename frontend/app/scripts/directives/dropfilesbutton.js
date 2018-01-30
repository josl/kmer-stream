'use strict';

/**
 * @ngdoc directive
 * @name frontendrApp.directive:dropFilesButton
 * @description
 * # dropFilesButton
 */
angular.module('frontendApp')
    .directive('dropFilesButton', function () {
        return {
            templateUrl: 'templates/dropFilesButton.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                console.log(scope, element, attrs, scope.isolateFiles);
                scope.tabs = scope.$parent.tabs;
                scope.filesValid = false;
                scope.isService = attrs.isService;
                scope.parsedFiles = 0;
                scope.dropping = function ($files) {
                    if ($files.length !== 0){
                        console.log('Start parsing');
                        scope.$broadcast('startParsing', $files);
                    }
                };
                scope.validate = function ($file) {
                    // console.log(scope.isolateFiles, $file);
                    $file.match = false;
                    $file.species = '';
                    $file.firstTime = ($file.firstTime? false: true);
                    $file.status = {
                        isFirstOpen: true,
                        isFirstDisabled: false
                    };
                    return true;
                };
            }
        };
    });
