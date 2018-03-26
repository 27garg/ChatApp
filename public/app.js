angular.module("chatApp",["ngRoute","firebase"])
    .config(config)
    .controller("homeCtrl",homeCtrl)
    .controller("chatCtrl",chatCtrl)

    function config($routeProvider){
        
        $routeProvider
        .when("/",{
            templateUrl:"login.html",
            controller:"homeCtrl",
            controllerAs:"home"
        })
        .when("/chat",{
            templateUrl:"chat.html",
            controller:"chatCtrl",
            controllerAs:"chat"
        })
        .otherwise({redirectTo:"/"})
    }

        function chatCtrl($firebaseAuth,$location,$firebaseArray){
            var chat = this;
            chat.msg = [];

            var ref = firebase.database().ref();
           chat.msg = $firebaseArray(ref);

         chat.signout = function(){

        firebase.auth().signOut().then(function(result) {
        console.log('Signed Out');
      
        }, function(error) {
        console.error('Sign Out Error', error);
        });
        $location.path("/")
        }

        chat.send = function(){
            var obj = {name:chat.name,status:false}
            chat.msg.$add(obj)
            console.log(chat.msg)
            chat.name = ""
        }
    }

    function homeCtrl($firebaseAuth,$location){
        var home = this;

        var auth1= $firebaseAuth();

        home.googlelogin = function(){
            auth1.$signInWithPopup("google").then(function(result) {
                console.log("UserName:",result.user.displayName);
                console.log("Signed in as:", result.user.uid);
                $location.path("/chat")
              }).catch(function(error) {
                console.error("Authentication failed:", error);
              });
        }

        var auth2= $firebaseAuth();

        home.facebooklogin = function(){
            auth2.$signInWithPopup("facebook").then(function(result) {
                console.log("Signed in as:", result.user.uid);
                $location.path("/chat")
              }).catch(function(error) {
                console.error("Authentication failed:", error);
              });
        }
    }