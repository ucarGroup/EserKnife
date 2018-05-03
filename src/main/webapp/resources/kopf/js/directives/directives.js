kopf.directive('hello', function ($timeout) {
    //return {
    //    restrict: 'A',
    //    link: function ($scope,$element,$attrs) {
    //        //alert("wo");
    //        debugger;
    //        console.log($element);
    //        //if ($scope.$last === true) {
    //        //    $timeout(function () {
    //        //        $scope.$emit('ngRepeatFinished');
    //        //    });
    //        //}
    //        //console.log("555===>>>"+document.getElementById("picturePlacenode1"));
    //
    //    },
    //    template:'<h1>wo</h1>'
    //}
    return function(scope,element,attrs) {
        if (scope.$last === true) {
            $timeout(function () {
                scope.$emit('ngRepeatFinished');
            });
        };
    };
});
