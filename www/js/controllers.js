angular.module('starter.controllers', [])


.controller('BankCtrl', function($scope, $state, KibblerService) {
    
    $scope.dogs = KibblerService.getDogs();
})


.controller('FileCtrl', function($scope, KibblerService, FileService, $state ) {
  $scope.download ="";
  $scope.stubDogs = [
          {
              name: "Buddy",
              age: 4,
              breed: "retriever",
              contact: "6196666969",
          },
          {
              name: "Rex",
              age: 3,
              breed: "bloodhound",
              contact: "6195555555",
          }
      ];
  
  $scope.goToDownload = function() {
      $scope.download = FileService.download($scope.myFile);
  };
  
  $scope.submitForm = function() {
    console.log($scope.myFile);
    if($scope.myFile) {
       FileService.upload($scope.myFile)
      //FileService.greetings()
      .then(function(err,result){
        if(err) {
          console.log(err);
        }else{
          console.log(result);
        }
      });
    }
  };
  $scope.getList = function() {
     
      $scope.dogs = angular.copy($scope.stubDogs);
      KibblerService.saveDogs($scope.dogs);
       $state.go('bank');
  };
})


.controller('CardsCtrl', function($scope, TDCardDelegate, $state) {
  var cardTypes = [
    { image: '../img/dog1.jpg' },
    { image: '../img/dog2.jpg' },
    { image: '../img/dog3.jpg' },
    { image: '../img/dog4.jpg' },
    { image: '../img/dog5.jpg' }
  ];


  $scope.bankpage = function() {
      $state.go('file');
  };
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.unshift(angular.extend({}, newCard));
  };
  
  $scope.cards = [];
  for(var i = 0; i < 5; i++) $scope.addCard();
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
})
.controller('ChartCtrl', function($scope) {

    var ctrl = this;

    ctrl.add = add;
    ctrl.data = [
        {
            name: "Fido",
            age: "Four",
            breed: "Pitbull",
            phoneNumber: "6196666969"
        },
        {
            name: "Cargills",
            age: "Seven",
            breed: "Terrier",
            phoneNumber: "6195555555"
        }
    ];

    ////////
    function add(index) {
        window.alert("Added: " + index);
    }
})





    .controller('RegisterCtrl', ['$scope', '$state', 'UserService', '$ionicHistory', '$window', 'SSFAlertsService', 'ionicMaterialInk', 'ionicMaterialMotion', '$timeout',
        function($scope, $state, UserService, $ionicHistory, $window, SSFAlertsService, ionicMaterialInk, ionicMaterialMotion, $timeout) {
            $scope.reg = {};
            $scope.repeat = {};

            $timeout(function() {
                ionicMaterialInk.displayEffect();
                ionicMaterialMotion.ripple();
            }, 0);

            function resetFields() {
                $scope.user.email = "";
                $scope.user.firstName = "";
                $scope.user.lastName = "";
                $scope.user.organization = "";
                $scope.user.password = "";
                $scope.repeatPassword.password = "";
            }

            //Required to get the access token
            function loginAfterRegister() {
                UserService.login($scope.user)
                    .then(function(response) {
                        if (response.status === 200) {
                            //Should return a token
                            $window.localStorage["userID"] = response.data.userId;
                            $window.localStorage['token'] = response.data.id;
                            $ionicHistory.nextViewOptions({
                                historyRoot: true,
                                disableBack: true
                            });
                            $state.go('lobby');
                        }
                        else {
                            // invalid response
                            $state.go('landing');
                        }

                        resetFields();
                    }, function(response) {
                        // something went wrong
                        $state.go('landing');
                        resetFields();
                    });
            }

            $scope.regSubmitForm = function(form) {
                if (form.$valid) {
                    if ($scope.repeat.repeatPassword !== $scope.reg.password) {
                        SSFAlertsService.showAlert("Error", "Opps the Passwords dont match :( try again!");
                    }
                    else {
                        UserService.create($scope.reg)
                            .then(function(response) {
                                if (response.status === 200) {
                                    //Should return a token 
                                    console.log(response);
                                    loginAfterRegister();
                                    form.$setPristine();
                                }
                                else {
                                    // invalid response
                                    SSFAlertsService.showAlert("Error", "Something went wrong, try again.");
                                }

                            }, function(response) {
                                // Code 401 corresponds to Unauthorized access, in this case, the email/password combination was incorrect.
                                if (response.status === 422) {
                                    SSFAlertsService.showAlert("Error", "Email and Password are already registered");
                                }
                                else if (response.data === null) {
                                    //If the data is null, it means there is no internet connection. 
                                    SSFAlertsService.showAlert("Error", "The connection with the server was unsuccessful, check your internet connection and try again later.");
                                }
                                else {
                                    SSFAlertsService.showAlert("Error", "Something went wrong, repsone fail try again.");
                                }
                            });
                    }
                }
            };
        }
    ])
    .controller('LoginCtrl', ['$scope', '$state', 'UserService', '$ionicHistory', '$window', 'SSFAlertsService',

    function($scope, $state, UserService, $ionicHistory, $window, SSFAlertsService) {
        $scope.user = {};
        $scope.title = "Login";
        $scope.testDate = new Date();
        /*
                 SSFAlerts( "Title" , "houston, we have a swaggy update 2!");
                //changes
                var deploy = new Ionic.Deploy();
                deploy.setChannel("dev");

                deploy.check().then(function(hasUpdate) {
                    console.log('Ionic Deploy: Update available: ' + hasUpdate);
                    if (hasUpdate) {
                       
                        //ALERT
                        SSFAlerts( "Title" , "houston, we have a swaggy update 2!");

                        //Perform update
                        deploy.update().then(function(res) {
                            
                            //App will automatically reload when updated successfully
                            console.log('Ionic Deploy: Update Success! ', res);
                           
                        }, function(err) {
                            console.log('Ionic Deploy: Update error! ', err);
                        }, function(prog) {
                            console.log('Ionic Deploy: Progress... ', prog);
                        });

                        //
                    }
                }, function(err) {
                    console.error('Ionic Deploy: Unable to check for updates', err);
                });
                
                */

        //andrews shizzzzz


        //



        ///changes


        if (typeof navigator.globalization !== "undefined") {
            navigator.globalization.getPreferredLanguage(function(language) {
                $translate.use((language.value).split("-")[0]).then(function(data) {
                    console.log("SUCCESS -> " + data);
                }, function(error) {
                    console.log("ERROR -> " + error);
                });
            }, null);
        }

        var rememberMeValue;
        if ($window.localStorage["rememberMe"] === undefined || $window.localStorage["rememberMe"] == "true") {
            rememberMeValue = true;
        }
        else {
            rememberMeValue = false;
        }

        $scope.checkbox = {
            rememberMe: rememberMeValue
        };

        if ($window.localStorage["username"] !== undefined && rememberMeValue === true) {
            $scope.user.email = $window.localStorage["username"];
        }

        $scope.loginSubmitForm = function(form) {
            if (form.$valid) {
                UserService.login($scope.user)
                    .then(function(response) {
                        if (response.status === 200) {
                            //Should return a token
                            $window.localStorage["userID"] = response.data.userId;
                            $window.localStorage['token'] = response.data.id;
                            $ionicHistory.nextViewOptions({
                                historyRoot: true,
                                disableBack: true
                            });
                            $state.go('lobby');
                            $window.localStorage["rememberMe"] = $scope.checkbox.rememberMe;
                            if ($scope.checkbox.rememberMe) {
                                $window.localStorage["username"] = $scope.user.email;
                            }
                            else {
                                delete $window.localStorage["username"];
                                $scope.user.email = "";
                            }
                            $scope.user.password = "";
                            form.$setPristine();
                        }
                        else {
                            // invalid response
                            SSFAlertsService.showAlert("Error", "Something went wrong, try again.");
                        }
                    }, function(response) {
                        // Code 401 corresponds to Unauthorized access, in this case, the email/password combination was incorrect.
                        if (response.status === 401) {
                            SSFAlertsService.showAlert("Error", "Incorrect username or password");
                        }
                        else if (response.data === null) {
                            //If the data is null, it means there is no internet connection. 
                            SSFAlertsService.showAlert("Error", "The connection with the server was unsuccessful, check your internet connection and try again later.");
                        }
                        else {
                            SSFAlertsService.showAlert("Error", "Something went wrong, try again.");
                        }

                    });
            }
        };
    }
])

// The controller is also missing two ejection depedencies 'UserService' and '$window'

/*Also Constructor injections (used by angularJs) needs to be explained. 
The basic idea with constructor-injection is that the object has no defaults and
instead you have a single constructor where all of the collaborators and values 
need to be supplied before you can instantiate the object. ---- Long story short ---
you need to call the dependencies in controllers in order.
    
here's the specific Url: http://misko.hevery.com/2009/02/19/constructor-injection-vs-setter-injection/
*/

.controller('LandingCtrl', ["$ionicPlatform", "$window", "SSFAlertsService", "$ionicLoading", function($ionicPlatform, $window, SSFAlertsService, $ionicLoading) {
    $ionicPlatform.ready(function() {

        var deploy = new Ionic.Deploy();
        deploy.setChannel("dev");

        deploy.check().then(function(hasUpdate) {

            if (hasUpdate) {
                SSFAlertsService.showAlert('New update', 'Starting update');
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner>'
                });

                deploy.update().then(function(res) {
                    //App will automatically reload when updated successfully
                    $ionicLoading.hide();
                    SSFAlertsService.showAlert("update worked", 'Update complete');
                    $window.location.reload(true);
                }, function(err) {
                    SSFAlertsService.showAlert('Update Error', 'Update failed');
                }, function(prog) {
                    //$rootScope.$broadcast('loading:show');
                });
            }
        }, function(err) {
            SSFAlertsService.showAlert('Update error', 'Unable to do upadate.');
        });
    });
}]);
