(function () {
    angular.module('uniforms')
        .factory('quizStateService', ['dataService', function (dataService) {

            var obj = {
                quizActive: false,
                resultsActive: false,                
                changeState: changeState
            };
            
            function changeState(phase, state) {
                if (phase === 'quiz') {
                    obj.quizActive = state;
                } else if (phase === 'results') {
                    obj.resultsActive = state;
                } else {
                    return false;
                }
            }            
            return obj;
        }]);


})();