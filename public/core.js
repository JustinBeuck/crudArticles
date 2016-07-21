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

    $scope.updateArticle = function(id) {
        $http.put('/articles/' + id, $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.articles = data;
                $scope.disableEditor();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.enableEditor = function(id) {
        $scope.editorEnabled = true;
        $http.get('/articles/'+ id)
            .success(function(data) {
                $scope.articles = data;
                $scope.formData = {
                    title: data[0].title,
                    content: data[0].body,
                    author : data[0].author
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
  
    $scope.disableEditor = function() {
        $scope.editorEnabled = false;
        $scope.getArticles();
    };

}