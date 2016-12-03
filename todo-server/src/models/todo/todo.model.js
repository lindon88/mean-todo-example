/**
 * Created by Lindon on 11/26/2016.
 */

/**
 * Todo_ model
 * @type {{id: string, title: string, description: string, isComplete: string, isInFavorite: string, priority: string, created: string, updated: string, completed: string, setId: Function, setTitle: Function, setDescription: Function, setIsComplete: Function, setIsInFavorite: Function, setPriority: Function, setCreated: Function, setUpdated: Function, setCompleted: Function, getId: Function, getTitle: Function, getDescription: Function, getIsComplete: Function, getIsInFavorite: Function, getPriority: Function, getCreated: Function, getUpdated: Function, getCompleted: Function}}
 */
var Todo = {

    id: "",
    userId: "",
    title: "",
    description: "",
    isComplete: "",
    isInFavorite: "",
    priority: "",
    created: "",
    updated: "",
    completed: "",

    setId: function(value){
        this.id = value;
    },

    setUserId: function(value){
        this.userId = value;
    },

    setTitle: function(value){
        this.title = value;
    },

    setDescription: function(value){
        this.description = value;
    },

    setIsComplete: function(value){
        this.isComplete = value;
    },

    setIsInFavorite: function(value){
        this.isInFavorite = value;
    },

    setPriority: function(value){
        this.priority = value;
    },

    setCreated: function(value){
        this.created = value;
    },

    setUpdated: function(value){
        this.updated = value;
    },

    setCompleted: function(value){
        this.completed = value;
    },

    getId: function(){
        return this.id;
    },

    getUserId: function(){
        return this.userId;
    },

    getTitle: function(){
        return this.title;
    },

    getDescription: function(){
        return this.description;
    },

    getIsComplete: function(){
        return this.isComplete;
    },

    getIsInFavorite: function(){
        return this.isInFavorite;
    },

    getPriority: function(){
        return this.priority;
    },

    getCreated: function(){
        return this.created;
    },

    getUpdated: function(){
        return this.updated;
    },

    getCompleted: function(){
        return this.completed;
    }

};

module.exports = Todo;