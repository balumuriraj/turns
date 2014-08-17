//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.

"use strict";

app.factory('authService', ['$http', '$cookieStore', 'Base64', function ($http, $cookieStore, Base64) {

    var baseUrl = 'http://turnsapi.herokuapp.com';

    return {
        createUser: function(user, $scope){
            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/register',
                method: "POST",
                data: user
            })
            .success(function(responseData) {
                $scope.response = responseData;
                console.log("Response data : " + responseData.name);
                $scope.loading = false;
                $scope.success = true;
            })
            .error(function(data) {
                console.log("Registration failed : " + data);
                $scope.loginerror = true;
                $scope.loading = false;
            });
        },
        
        loginUser: function(user, $scope){

            var encodedcreds= Base64.encode(user.email+':'+user.password);
            
            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;
            
            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/getDetails',
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Login Successful : " + responseData.name);
                $scope.loading = false;
                $cookieStore.put('loggedin', 'true');
                $cookieStore.put('creds', encodedcreds);
                return responseData;
            })
            .error(function(data) {
                console.log("Login failed : ");
                $scope.loginerror = true;
                $scope.loading = false;
            });
        },

        logoutUser: function(){
            $cookieStore.remove('loggedin');
            $cookieStore.remove('creds');
        },
        
        isLoggedIn: function(){
            var loginstatus;
            loginstatus = $cookieStore.get('loggedin');
            if(loginstatus == null)
            {
                loginstatus = false;
            }
            return loginstatus;
        },

        getUserDetails: function(){
            var encodedcreds= $cookieStore.get('creds');

            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;

            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/getDetails',
                method: "GET"
            })
                .success(function(responseData) {
                    console.log("Got user details : " + responseData.name);
                    return responseData;
                })
                .error(function(data) {
                    alert("Please try again!!");
                });
        }
    };
    
}]);

app.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
});