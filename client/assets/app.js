  var app = angular.module('app', ['ngRoute']);

  app.config(function ($routeProvider) {
  $routeProvider

      .when('/index', {
        templateUrl: 'partials/login.html',
        // controller: 'friendsController',
        // controllerAs: 'NC'
      })
      .when('/question/:id/new_answer', {
        templateUrl: 'partials/new_answer.html',
        // controller: 'friendsController',
        // controllerAs: 'NC'
      })
      .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'routeController',
        // controller: 'friendsController',
        // controllerAs: 'NC'
      })
      .when('/dashboard', {
        templateUrl: 'partials/info.html',
      })

      .when('/new_question', {
        templateUrl: 'partials/new.html',
        // controller: 'newController',
        // controllerAs: 'NC'
      })
      // when someone enters a url 'localhost:8000/#/edit', load the following partial
      // the _id property will be passed into the $routeParams object as long as it's
      // $routeParams is injected
      .when('/edit/:id', {
        templateUrl: 'partials/edit.html',
        // controller: 'editController',
        // controllerAs: 'EC'
      })
      .when('/show/:id', {
        templateUrl: 'partials/show.html',
        // controller: 'editController',
        // controllerAs: 'EC'
      })
      // when someone uses any other route than above, load the following partial
      .otherwise('/index');
  });
  app.controller('routeController', ['$scope', '$location', function($scope, $location) {
    // $scope.currentPath = $location.path() === '/';
    $scope.location = $location;

  }]);

  app.factory('friendsFactory',function($http){
    // console.log('start friendsFactory');
    var factory ={};
    var users = [];
    var user = {};

    factory.createUser = function(newUser) {
        user = newUser;
    }

    factory.getUser = function() {
      return user;
    }

    factory.createQuestion = function(newQuestion, callback) {
                // console.log('create Question in factory!!!!');
                // console.log(newQuestion);
                $http.post('/questions', newQuestion).then(function(returned_data) {
                  console.log(returned_data.data);
                  // console.log("middle of createQuestion in factory");
                if (typeof(callback) == 'function'){
                  callback(returned_data.data);
                }
                })
            }

    factory.updateAnswer = function(answerId, likes, callback) {
      console.log('factory.updateAnswer, answerId:', answerId, 'likes', likes);
      $http.put('/answers/'+answerId, {
          likes: likes
      }).then(function(returned_data) {
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    }

    factory.indexQuestion = function(callback){
      console.log("factory indexQuestion:")
      $http.get('/questions').then(function(returned_data){

      // console.log(" = returned_data.data");
      console.log(returned_data.data);
      console.log("factory indexQuestion:",returned_data.data, "after returned_data.data");
      // console.log("after returned_data.data");
      if (typeof(callback) == 'function'){
        callback(returned_data.data);
      }
      });
    }
    factory.createAnswerbyId = function(id, answerContent, user, callback) {

      console.log("inside factory.createAnswerbyId");
                $http.post('/answers/' + id, {
                  user: user.name,
                  text: answerContent
                }).then(function(returned_data) {
                  console.log("inside factory.createAnswerbyId again and again");
                if (typeof(callback) == 'function'){
                  callback(returned_data.data);
                }
                })
            }
    // factory.indexAnswer = function(callback){
    //
    //   $http.get('/answers').then(function(returned_data){
    //   console.log(returned_data.data);
    //   users = returned_data.data;
    //   if (typeof(callback) == 'function'){
    //     callback(returned_data.data);
    //   }
    //   });
    // }
    // factory.createAnswerbyId = function(id, callback) {
    //
    //
    //             $http.post('/answers/:id').then(function(returned_data) {
    //
    //             if (typeof(callback) == 'function'){
    //               callback(returned_data.data);
    //             }
    //             })
    //         }
    // factory.indexAnswerById = function(id,callback){
    //
    // }



    factory.getQuestionById = function(id, callback) {
      console.log("factory.getQuestionById");

      $http.get('/questions/' + id)
      .then(function(returned_data) {
        callback(returned_data.data);
        console.log(returned_data.data);
      });
    }


      return factory;
  })


  app.controller('friendsController',['$scope', '$location', 'friendsFactory','$routeParams', function($scope,$location,friendsFactory,$routeParams){

    var friends = [];
    var users = [];
    var questions =[];
    var answers =[];


  

    function setQuestions(data){
      $scope.questions = data;
      $scope.question = {};
    }
    function setAswers(data){
      $scope.answers = data;
      $scope.answer = {};
    }

    $scope.createUser=function(){
      friendsFactory.createUser($scope.newUser);
      $location.url('/dashboard');
    }


    $scope.getUser = function() {
      var user = friendsFactory.getUser();
      return user.name;
    }


    // $scope.createAnswer = function(){
    //   friendsFactory.createAnswer = function(){
    //
    //   }
    // }

    $scope.indexQuestion = function(){
      // console.log("$scope.indexQuestion");

      friendsFactory.indexQuestion(function(data){
        $scope.questions = data;

        $scope.question = {};
      });

    }
    $scope.indexQuestion ();
    // console.log($scope.indexQuestion ());
    // console.log("right after $scope.indexQuestion();");


    // $scope.indexAnswer = function(){
    //
    //
    //   friendsFactory.indexAnswer(function(data){
    //     $scope.questions = data;
    //     $scope.question = {};
    //   });
    //
    // }

    // $scope.indexQuestion ();
    // console.log("$scope.indexQuestion ():",$scope.indexQuestion ());
    // console.log("right after $scope.indexQuestion();");
    // $scope.indexAnswer();

    $scope.cancel=function(){
      $location.url('/dashboard');
    }
    $scope.cancellogout=function(){
      $location.url('/index');
    }


    $scope.createQuestion = function(){

      friendsFactory.createQuestion($scope.newQuestion,setQuestions);
      $scope.newQuestion = {};

      $location.url('/dashboard');
    }
    // $scope.createAnswer = function(){
    //
    //   friendsFactory.createAnswer($scope.newAnswer,setQuestions);
    //   $scope.newAnswer = {};
    // }

  }])

  app.controller('showFriendIdController', ['$scope', 'friendsFactory', '$routeParams', '$location',
   function($s, ff, $r, $l){


  $s.getQuestionById = function() {
    console.log("$s.getQuestionById");
    ff.getQuestionById($r.id, function(data) {
      console.log('$r.id', $r.id);
      console.log('set data', data, 'to $s.question');
      $s.question = data;
    });
  }
  // $s.getQuestionById = function() {
  //   console.log("$s.getQuestionById");
  //   ff.getQuestionById($r._id, function(data) {
  //     console.log('$r._id', $r.id);
  //     console.log('set data', data, 'to $s.question');
  //     $s.question = data;
  //   });
  // }
  $s.cancel=function(){
      $l.url('/dashboard');
    }

  $s.createAnswerbyId = function(){
    console.log("$s.createAnswerbyId");
    var user = ff.getUser();
    console.log('user', user);
    console.log('r.id', $r.id);
    console.log('s.answer', $s.answer);

    ff.createAnswerbyId($r.id, $s.answer, user, function(data) {
       console.log('$s.answer', $s.answer);
       console.log('data', data);
    });
    // debugger;
    console.log("$s.createAnswerbyId in the end");
    $l.url('/edit/'+ $r.id);
    // debugger;
  }

  $s.plusLike = function(answerId, likes) {
    var increment = parseInt(likes) + 1;

    ff.updateAnswer(answerId, increment, function(data) {
      console.log('payload data', data);
      var url = '/edit/'+ $r.id;
      console.log('redirect to url', url);
      $l.url(url);
      $s.getQuestionById();
    });
  }
  // $s.indexAnswerById($r.id, function(data){
  //   ff.indexAnswerById($r.id, function(data){
  //     console.log("$s.indexAnswerById($r.id, function(data):", data);
  //   })
  // })
  $s.getQuestionById();


}])