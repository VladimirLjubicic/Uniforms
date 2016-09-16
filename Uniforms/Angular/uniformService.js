(function () {
    angular.module('uniforms')
        .factory('uniformService', ['$http', function($http){
            var obj = {
                fetchData: fetchData,
            };

            function fetchData() {
                return $http.get('companies/IndexJs')
            };
            return obj;
        }]);
})()