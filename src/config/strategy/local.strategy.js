var passport      = require('passport');
var localStrategy = require('passport-local').Strategy;

module.exports = function(){
    passport.use(new localStrategy({
        userNameField: 'userName',
        paswordField: 'password'
    },
    function(userName, password, done){
        var user = {
            user: userName,
            password: password
        };
        done(null, user);
    }));
}
