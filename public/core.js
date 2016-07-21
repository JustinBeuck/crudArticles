var articleCrud = angular.module('articleCrud', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.editorEnabled = false;

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

    $scope.getArticle = function() {
        $http.get('/articles/'+ id)
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

    $scope.deleteArticle = function(id) {
        $http.delete('/articles/' + id)
            .success(function(data) {
                $scope.articles = data;
                $scope.getArticles();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.enableEditor = function() {
        $scope.editorEnabled = true;
        $scope.editableArticle = $scope.articles;
    };
  
    $scope.disableEditor = function() {
        $scope.editorEnabled = false;
    };

}