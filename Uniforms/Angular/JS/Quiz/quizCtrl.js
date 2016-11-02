(function () {
    angular.module('uniforms')
        .controller('quizCtrl', ['$scope', '$timeout', '$location', 'dataService', 'resultsService', 'quizStateService',
            function ($scope, $timeout, $location, dataService, resultsService, quizStateService) {

                var uniformData = dataService.uniformData;                
                                
                $scope.quizStateService = quizStateService;
                $scope.resultsService = resultsService;
                $scope.questionTitle = [];
                $scope.timeCounter = 1000;
                var correctInARow = 0;
                
                function nextQuestion() {                    
                    resultsService.questionCounter++;
                    $scope.questionElements = [];
                    getQuestionElements();
                    runClock();
                };

                var getQuestionElements = function() {
                    for (var i = 0; i < 4; i++) {
                        var index = Math.floor(Math.random() * uniformData.length);
                        $scope.questionElements.push(uniformData[index]);
                        uniformData.splice(index, 1);
                    }
                    getQuestionTitle();
                    uniformData = uniformData.concat($scope.questionElements);
                }

                var getQuestionTitle = function() {
                    var j = Math.floor(Math.random() * $scope.questionElements.length);
                    $scope.questionTitle = $scope.questionElements[j];
                };

                $scope.evaluateAnswers = function (answer) {
                    $scope.questionElements = [];
                    isAnswerCorrect(answer);
                    giveInARowBonus();
                    resetClock();
                    nextQuestion();
                };

                var isAnswerCorrect = function (x) {
                    if ($scope.questionTitle.Uniform === x) {
                        resultsService.numCorrect++;
                        resultsService.score += $scope.timeCounter;
                        correctInARow++;
                    } else {
                        correctInARow = 0;
                    }
                };

                var giveInARowBonus = function () {
                    if (correctInARow === 3 || correctInARow%5 === 0 && correctInARow !== 0) {
                        $scope.timeCounter = $scope.timeCounter + 500;
                    }
                };
           
                var runClock = function () {
                    if ($scope.timeCounter > 0) {
                        $scope.timeCounter--;
                        myTimeout = $timeout(runClock, 10);
                    } else {
                        quizStateService.changeState('quiz', false);
                        quizStateService.changeState('results', true);
                        $location.url('results');                        
                    }
                };
            
                var resetClock = function () {
                    $timeout.cancel(myTimeout);
                };               
                              
                (function start() {
                    if (quizStateService.quizActive) {
                        nextQuestion();
                    } else {                        
                        $location.url('/');
                    }
                })();               
        }]);
})();