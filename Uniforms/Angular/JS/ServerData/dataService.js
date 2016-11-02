(function () {
    angular.module('uniforms')
        .factory('dataService', ['$http', function ($http) {

            var obj = {
                uniformData: [],
            };

            var p = $http.get('companies/IndexJs').then(function (response) {
                obj.uniformData.push.apply(obj.uniformData, response.data);
            })

            return obj;
        }]);
})();