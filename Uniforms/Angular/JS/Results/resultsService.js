(function () {
    angular.module('uniforms')
        .factory('resultsService', function () {
            var obj = {
                questionCounter: 0,
                numCorrect: 0,
                score: 0,
                getMessage: getMessage
            };

            function getMessage(x) {

                if (x < 5000) {
                    msg = "That was... Well, let's just say it wasn't particularly good!";
                }
                else if (x >= 5000 && x < 10000) {
                    msg = 'Alright, not bad. But you could do better. Try again.';
                }
                else if (x >= 10000 && x < 15000) {
                    msg = 'Well done. You really know your uniforms!';
                }
                else if (x >= 15000) {
                    msg = 'Congratulations! You officialy have no life.';
                }
                return msg;
            }

            return obj;

        });
})();