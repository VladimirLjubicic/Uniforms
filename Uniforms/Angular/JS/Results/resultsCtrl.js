(function () {
    angular.module('uniforms')
        .controller('resultsCtrl', ['$scope', '$location', 'quizStateService', 'resultsService', 'dataService',
            function ($scope, $location, quizStateService, resultsService, dataService) {

            $scope.quizStateService = quizStateService;
            $scope.resultsService = resultsService;

            var getResults = function () {
                if (quizStateService.resultsActive) {
                    $scope.playerScore = resultsService.numCorrect + '/' + resultsService.questionCounter;
                    messageToUser();
                } else {
                    $location.url('/');
                }
            };

            var messageToUser = function () {
                $scope.message = resultsService.getMessage(resultsService.score);
            };

            $scope.finalizeQuiz = function () {
                quizStateService.changeState('results', false);
                dataService.questionElements = [];
                dataService.questionTitle = [];
                resultsService.questionCounter = 0;
                resultsService.numCorrect = 0;
                resultsService.score = 0;
                window.location.href = '/';
            };

            getResults();
            console.log($scope.quizStateService.quizActive);
            console.log($scope.quizStateService.resultsActive);
        }]);
})();