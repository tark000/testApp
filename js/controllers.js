

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
    var imgCount;
    $scope.onFileSelect = function($files) {
        imgCount = 0;
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
                            $scope.images.push({id : $scope.images[$scope.images.length-1].id + 1, data:e.target.result, file : $file, impressionCount:0, rate: 0});
                            imgCount ++;
                            console.log("i = ",i)
                            if (i == imgCount){
                                createArray();
                            }

                        });
                    }
                }(fileReader, i);

            }
        }


    };



    //change impression count

    var lastId;
    $scope.$watch(function () {

        for (var i = 0; i < $scope.groupedSlides.length; i++) {


            if ($scope.groupedSlides[i].active && lastId != i) {
                console.log("id",i)

                angular.forEach($scope.groupedSlides[i], function(image) {

                    image.impressionCount ++;

                });

                lastId = i;
            }
        }
    }, function (currentSlide, previousSlide) {
        if (currentSlide !== previousSlide) {
            console.log('currentSlide:', currentSlide);
        }
    });








    // create multiple images in one slider
    function createArray (){

        var i, a = [], b=[];

        for (i = 0; i < $scope.images.length; i += 3) {
            b = [];
            b.push($scope.images[i]);
            if ($scope.images[i + 1]){
                b.push($scope.images[i + 1]);
            }
            if ($scope.images[i + 2]){
                b.push($scope.images[i + 2]);
            }
            a.push(b);
        }
        $scope.groupedSlides = a;
    }

    createArray();

}]);














