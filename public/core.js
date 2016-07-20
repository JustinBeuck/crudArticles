var articleCrud = angular.module('articleCrud', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $scope.getArticles = function() {
        $http.get('/articles')
            .success(function(data) {
                $scope.articles = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.createArticle = function() {
        $http.post('/articles', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.articles = data;
                $scope.getArticles();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteArticle = function(id) {
        $http.delete('/articles/' + id)
            .success(function(data) {
                $scope.articles = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}