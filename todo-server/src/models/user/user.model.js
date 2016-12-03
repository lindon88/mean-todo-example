/**
 * Created by Lindon on 11/14/2016.
 */

var User = {

    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",

    setId: function(value){
        this.id = value;
    },

    setUserName: function(value){
        this.userName = value;
    },

    setFirstName: function(value){
        this.firstName = value;
    },

    setLastName: function(value){
        this.lastName = value;
    },

    setEmail: function(value){
        this.email = value;
    },

    setPassword: function(value){
        this.password = value;
    },

    getId: function(){
        return this.id;
    },

    getUserName: function(){
        return this.userName;
    },

    getFirstName: function(){
        return this.firstName;
    },

    getLastName: function(){
        return this.lastName;
    },

    getEmail: function(){
        return this.email;
    },

    getPassword: function(){
        return this.password;
    }

};

module.exports = User;