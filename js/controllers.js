

angular.module('testApp').controller('SliderController', ['$scope','$upload','$timeout',
    function ($scope,$upload,$timeout) {


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

    $scope.onFileSelect = function($files) {

        var newImages = [];
        imgCount = 0;

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



                        $timeout(function() {
                            $scope.images.push({id : $scope.images[$scope.images.length-1].id + 1, data:e.target.result, file : {name: nameArray[imgCount]}, impressionCount:0, rate: 0});
                            imgCount ++;
                            $scope.selectedFiles = [];
                        });
                    }
                }(fileReader, i);

            }
        }


    };







    $scope.currentSlide = 0;
    increaseImpression($scope.currentSlide*3);
    increaseImpression($scope.currentSlide*3 + 1);
    increaseImpression($scope.currentSlide*3 + 2);

    $scope.next = function(){
        nextFun();

    }

    var nextFun = function(){
        var sliderSize = Math.ceil($scope.images.length/3);
        if ($scope.currentSlide == sliderSize - 1) {
            $scope.currentSlide = 0;
        } else{
            $scope.currentSlide ++;
        }
        increaseImpression($scope.currentSlide*3);
        increaseImpression($scope.currentSlide*3 + 1);
        increaseImpression($scope.currentSlide*3 + 2);
        open = false;

    }

    $scope.back = function(){
        var sliderSize = Math.ceil($scope.images.length/3);
        if ($scope.currentSlide == 0) {
            $scope.currentSlide = sliderSize - 1;
        } else{
            $scope.currentSlide --;
        }

        increaseImpression($scope.currentSlide*3);
        increaseImpression($scope.currentSlide*3 + 1);
        increaseImpression($scope.currentSlide*3 + 2);
        open = false;
    }




    function increaseImpression(id){
        if ($scope.images[id]){
            $scope.images[id].impressionCount ++;
        }
    }
    play();
//    $interval(nextFun,3000);

    var open = true;
    function play (){
        if (open){
            $timeout(function() {
                nextFun();
                play();
            }, 2000);
        } else {
            closeOpen ()
        }

    }

        function closeOpen (){
            open = false;
            $timeout(function() {
                open = true;
                play();

            }, 2000);
        }

}]);














