(function () {
    angular.module('uniforms')
        .controller('quizCtrl', ['$scope', '$timeout', '$location', 'uniformService', function ($scope, $timeout, $location, uniformService) {

            uniformService.fetchData().then(function (response) {
                uniformData = response.data
            });

            $scope.quizActive = false;
            $scope.resultsActive = false;
            $scope.questionElements = [];
            $scope.questionCounter = 0;
            var numCorrect = 0;
            $scope.timeCounter = 1500;
            $scope.score = 0;
            var correctInARow = 0;

            $scope.startQuiz = function () {
                $scope.quizActive = true;
                $scope.questionCounter = 0;
                numCorrect = 0;
                nextQuestion();
            };

            var getQuestionElements = function () {
                for (var i = 0; i < 4; i++) {
                    var index = Math.floor(Math.random() * uniformData.length);
                    $scope.questionElements.push(uniformData[index]);
                    uniformData.splice(index, 1)
                };
                getQuestionTitle();
                uniformData = uniformData.concat($scope.questionElements);
            };

            var getQuestionTitle = function () {
                var j = Math.floor(Math.random() * $scope.questionElements.length);
                $scope.questionTitle = $scope.questionElements[j];
            };

            var nextQuestion = function () {
                $scope.questionElements = [];
                $scope.questionCounter++;
                getQuestionElements();
                runClock();
            };

            $scope.evaluateAnswers = function (answer) {
                isAnswerCorrect(answer);
                giveInARowBonus();
                resetClock();
                nextQuestion();
            };

            var isAnswerCorrect = function (x) {
                if ($scope.questionTitle.Uniform === x) {
                    numCorrect++;
                    $scope.score += $scope.timeCounter;
                    correctInARow++;
                } else {
                    correctInARow = 0
                }
            };

            var giveInARowBonus = function () {
                if (correctInARow === 3 || correctInARow%5 === 0 && correctInARow !== 0) {
                    $scope.timeCounter = $scope.timeCounter + 500
                }
            };
           
            var runClock = function () {    
                $scope.timeCounter--;
                if ($scope.timeCounter > 0) {
                    myTimeout = $timeout(runClock, 10)
                } else {
                    //$location.url('results')
                    getResults();
                }
            };
            
            var resetClock = function () {
                $timeout.cancel(myTimeout);
            };

            var getResults = function () {
                $scope.quizActive = false;
                $scope.resultsActive = true;
                $scope.playerScore = numCorrect + '/' + $scope.questionCounter
                $scope.playerScorePercentage = numCorrect / $scope.questionCounter * 100
                messageToUser();
            };

            $scope.finalizeQuiz = function () {
                $scope.resultsActive = false;
                $scope.questionElements = [];
                $scope.questionCounter = 0;
                numCorrect = 0;
                $scope.score = 0;
                $scope.timeCounter = 1500;
            };

            var messageToUser = function () {
                var x = $scope.score;
                if (x < 5000) {
                    $scope.message = 'That Was Pathetic!'
                }
                else if (x >= 5000 && x < 10000) {
                    $scope.message = 'Alright, not bad. But you could do better. Try again.'
                }
                else if (x >= 10000 && x < 15000) {
                    $scope.message = 'Well done. You really know your uniforms!'
                }
                else if (x >= 15000 ) {
                    $scope.message = 'Congratulations! You officialy have no life.'
                }                
            };
        }]);
})();