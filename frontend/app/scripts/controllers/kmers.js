'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:KmersCtrl
 * @description
 * # KmersCtrl
 * Controller of the Kmers view
 */
angular.module('frontendApp')
  .controller('KmersCtrl', [ '$scope', 'API', function ($scope, API) {
      $scope.isolateFilesPromises = [];
      $scope.matches = false;
      $scope.error = false;
      $scope.message = {
        text: '',
        status: 0
      };

      $scope.$on('startParsing', function (event, files) {
        var index = -1;
        var parseFiles = function () {
          console.log(index, files.length - 1, files);
          if (index >= files.length - 1) {
            return;
          } else {
            index++;
            return $scope.parseFile(files[index])
              .then(parseFiles)
              .catch(function (error) {
                console.log('ERROR!!', error);
                $scope.message.text = error;
                $scope.message.status = 2;
                $scope.$apply();
              });
          }
        };
        parseFiles();
      });
      $scope.parseFile = function (file) {
        console.log(file);
        var kmerjs = new Kmers.KmerJS(
          file, 'ATGAC', 16, 1, 1, true, 'browser');

          $scope.fileProgress = kmerjs.lines;
          var kmerObj = kmerjs.readFile();
          console.log(kmerObj);
          kmerObj.event.on('progress', function (progress) {
            console.log(progress.transferred, file.size);
            file.kmerSize = kmerjs.kmerMap.size;
            file.dataRead = progress.transferred * 100 / file.size;
            $scope.$apply();
          });

          return kmerObj.promise
            .then(function (kmers) {
              console.log('Assigning kmers!', kmers);
              file.kmers = kmers;
              console.log('Let\'s send some kmers!');
              var kmerStream = new Stream.KmerStream();
              console.log(kmerStream.sendKmers(kmers, API.url));
              return;
            });
      };
    }
  ]);
