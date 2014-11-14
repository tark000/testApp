

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
    for (var i=0; i<5; i++) {
        $scope.addSlide(i);
    }



    //add file to slides list
    $scope.selectedFiles = [];
    var imgCount;
    var oldSize;
    $scope.onFileSelect = function($files) {
        var newImages = [];
        imgCount = 0;
        oldSize = $scope.images.length;
        var nameArray = [];
        angular.forEach($files, function(v) {

                $scope.selectedFiles.push(v);

        });


        for ( var i = 0; i < $scope.selectedFiles.length; i++) {
            var $file = $scope.selectedFiles[i];

            if (window.FileReader && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();

                nameArray.push($file.name);
                fileReader.readAsDataURL($scope.selectedFiles[i]);
                var loadFile = function(fileReader, index) {
                    fileReader.onload = function(e) {

                        $scope.images.push({id : $scope.images[$scope.images.length-1].id + 1, data:e.target.result, file : {name: nameArray[imgCount]}, impressionCount:0, rate: 0});
                        newImages.push({id : $scope.images[$scope.images.length-1].id + 1, data:e.target.result, file : {name: nameArray[imgCount]}, impressionCount:0, rate: 0});
                        imgCount ++;
                        console.log("i = ",i)
                        if (i == imgCount){

                            createArray(oldSize);
                        }
                        $timeout(function() {


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
    $scope.groupedSlides = [];
    var lastSlidePosition;
    function createArray (size){
        console.log(size);
        var i, a,col = [], b=[];



        if (size){
            if (lastSlidePosition == 1){
                $scope.groupedSlides[$scope.groupedSlides.length -1].push($scope.images[size],$scope.images[size + 1]);
                col = size + 2
                for (i = 0; i < $scope.images.length - size; i += 3) {
                    b = [];

                    b.push($scope.images[col + i]);
                    lastSlidePosition = 1;
                    if ($scope.images[col +  i + 1]){
                        b.push($scope.images[col +  i + 1]);
                        lastSlidePosition = 2;
                    }
                    if ($scope.images[col +  i + 2]){
                        b.push($scope.images[col +  i + 2]);
                        lastSlidePosition = 3;
                    }

                    $scope.groupedSlides.push(b);
                }

            }
            if (lastSlidePosition == 2){
                $scope.groupedSlides[$scope.groupedSlides.length -1].push($scope.images[size]);
                col = size + 1
                for (i = 0; i < $scope.images.length - size; i += 3) {
                    b = [];

                    b.push($scope.images[col + i]);
                    lastSlidePosition = 1;
                    if ($scope.images[col +  i + 1]){
                        b.push($scope.images[col +  i + 1]);
                        lastSlidePosition = 2;
                    }
                    if ($scope.images[col +  i + 2]){
                        b.push($scope.images[col +  i + 2]);
                        lastSlidePosition = 3;
                    }

                    $scope.groupedSlides.push(b);
                }

            }



        } else{
            for (i = 0; i < $scope.images.length; i += 3) {
                b = [];

                b.push($scope.images[i]);
                lastSlidePosition = 1;
                if ($scope.images[i + 1]){
                    b.push($scope.images[i + 1]);
                    lastSlidePosition = 2;
                }
                if ($scope.images[i + 2]){
                    b.push($scope.images[i + 2]);
                    lastSlidePosition = 3;
                }

                $scope.groupedSlides.push(b);
            }
        }







    }

    createArray();

}]);














