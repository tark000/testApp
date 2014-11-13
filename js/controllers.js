

angular.module('testApp').controller('SliderController', ['$scope','$upload','$timeout', function ($scope,$upload,$timeout) {


    //slider
    $scope.myInterval = 3000;


    //default images
    var slides = $scope.images = [];
    $scope.addSlide = function(id) {
        var newWidth = 601 + slides.length;
        $scope.images.push({
            data: 'http://placekitten.com/' + newWidth + '/300',
            text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4],
            id: id,
            file: {name: "image" + id},
            impressionCount: id*5 + 50,
            rate: 3

        });
    };
    for (var i=0; i<4; i++) {
        $scope.addSlide(i);
    }



    //add file to slides list
    $scope.selectedFiles = [];

    $scope.onFileSelect = function($files) {

        angular.forEach($files, function(v) {

            $scope.selectedFiles.push(v);

        });


        for ( var i = 0; i < $scope.selectedFiles.length; i++) {
            var $file = $scope.selectedFiles[i];
            if (window.FileReader && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($scope.selectedFiles[i]);
                var loadFile = function(fileReader, index) {
                    fileReader.onload = function(e) {
                        $timeout(function() {
                            $scope.images.push({id : index, data:e.target.result, file : $file, impressionCount:0, rate: 0});
                        });
                    }
                }(fileReader, i);
            }
        }

    };



    //change impression count

    var lastId;
    $scope.$watch(function () {
        for (var i = 0; i < $scope.images.length; i++) {
            if ($scope.images[i].active && lastId != $scope.images[i].id) {
                console.log("id",$scope.images[i].id)
                $scope.images[i].impressionCount ++;
                lastId = $scope.images[i].id;
            }
        }
    }, function (currentSlide, previousSlide) {
        if (currentSlide !== previousSlide) {
            console.log('currentSlide:', currentSlide);
        }
    });

}]);














