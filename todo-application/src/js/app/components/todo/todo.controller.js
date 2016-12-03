/**
 * Created by Lindon on 11/19/2016.
 */

(function(){
    "use strict";

    angular.module("app.components.todo").controller("TodoController", TodoController);

    TodoController.$inject = ["$scope", "$localStorage", "$timeout", "TodoService", "FormService"];

    /**
     * Todo_ controller
     * @param $scope
     * @constructor
     */
    function TodoController($scope, $localStorage, $timeout, TodoService, FormService){
        var ctrlTodo = this;

        ctrlTodo.formId = "todoForm";
        ctrlTodo.rawItems = [];
        ctrlTodo.groupedItems = [];
        ctrlTodo.filters = null;
        ctrlTodo.searchText = null;

        // render todo_ add form
        FormService.todoAddForm().then(
            function(response){
                angular.extend(ctrlTodo, response);


                ctrlTodo.model.created = moment().format("YYYY-MM-DD HH:mm");
                $timeout(function(){
                    ctrlTodo.model.priority = { id: "2", name: "Medium" };
                });

                // initial call
                ctrlTodo.getAllTodoItems();
            }
        );

        /**
         * Get all todo_ items
         */
        ctrlTodo.getAllTodoItems = function(){
            // get all todo_ items
            TodoService.getAll().then(function(response){
                ctrlTodo.rawItems = response;
                ctrlTodo.filterAndGroupByDate(response, ctrlTodo.filters, ctrlTodo.searchText);
            });
        };

        /**
         * Group by date and filter data
         * @param items
         * @param filters
         */
        ctrlTodo.filterAndGroupByDate = function(items, filters, searchText){
            // create groups
            var groups = _.groupBy(items, function(obj){
                obj.show = false;
                if(filters != null && filters.length > 0){
                    for(var i = 0; i < filters.length; i++){
                        var filter = filters[i];
                        if(filter == obj.priorityClass){
                            obj.show = true;
                        }

                        if(filter == "complete" && obj.isComplete == 1){
                            obj.show = true;
                        }
                    }
                }

                // text search on filtered or not filtered items
                if(typeof searchText !== "undefined" && searchText !== null && searchText !== ""){
                    if(obj.title.indexOf(searchText) > -1){
                        if(filters == null || filters.length == 0){
                            obj.show = true;
                        }
                        else if(filters != null && filters.length > 0){
                            obj.show = true & obj.show;
                        }
                        else{
                            obj.show = false;
                        }
                    }
                    else if(filters == null || filters.length == 0){
                        obj.show = false;
                    }
                    else if(filters != null && filters.length > 0){
                        obj.show = false & obj.show;
                    }
                }

                if((filters == null || filters.length == 0) && (searchText == null || searchText == "")){
                    obj.show = true;
                }

                if(obj.show == false){
                    return -1;
                }

                // get current date
                var now = moment().endOf("day");
                var itemDate = null;
                var difference = null;

                if(obj.created != null && obj.created != ""){
                    itemDate = moment(obj.created);
                }
                else if(obj.updated != null){
                    itemDate = moment(obj.updated);
                }

                difference = now.hours() - now.diff(itemDate.endOf("day"), "hours");
                if(difference >= 0 && difference < 24){
                    return "Today";
                }
                else{
                    return moment(itemDate).format("DD.MM.YYYY, dddd");
                }
            });

            // map articles
            ctrlTodo.groupedItems = _.map(groups, function(group, day){
                if(day == -1){
                    return false;
                }

                return{
                    day: day,
                    items: group
                }
            });
        };

        /**
         * On submit event handler
         */
        ctrlTodo.onSubmit = function(form){
            if(typeof this.model !== "undefined" && typeof $localStorage.user !== "undefined"){
                var requestItem = {
                    id: this.model.id,
                    userId: $localStorage.user.id,
                    title: this.model.title,
                    priority: this.model.priority.id,
                    created: moment(this.model.created, "YYYY-MM-DD HH:mm").unix() * 1000
                };

                // save todo_ item
                TodoService.saveTodo(requestItem).then(
                    function(response){
                        ctrlTodo.getAllTodoItems();
                    },
                    function(error){
                        alert("Error while saving todo item");
                    }
                );

                // reset title
                this.model.title = "";
            }
        };

        // on selected filters event handler
        $scope.$on("selectedFilters", function(event, args){
            ctrlTodo.searchText = args.searchText;
            ctrlTodo.filters = args.filters;
            ctrlTodo.filterAndGroupByDate(ctrlTodo.rawItems, args.filters, ctrlTodo.searchText);
        });

        // on edit todo_ item
        $scope.$on("editTodo", function(event, args){
            if(typeof args !== "undefined" && typeof args.item !== "undefined"){
                ctrlTodo.model.id = args.item.id;
                ctrlTodo.model.title = args.item.title;
                ctrlTodo.model.created = moment(args.item.created).format("YYYY-MM-DD HH:mm");
                ctrlTodo.model.priority = {
                    id: args.item.priority,
                    name: args.item.priorityClass
                };
            }
        });

        /**
         * Todo_ complete event handler
         */
        $scope.$on("completeTodo", function(event, args){
            if(typeof args !== "undefined" && typeof args.item !== "undefined"){
                args.item.isComplete = true;

                // remove properties that are not needed in backend
                delete args.item._id;
                delete args.item.priorityClass;
                delete args.item.show;

                // save todo_ item
                TodoService.saveTodo(args.item).then(
                    function(response){
                        ctrlTodo.getAllTodoItems();
                    },
                    function(error){
                        alert("Error while saving todo item");
                    }
                );
            }
        });

        /**
         * Todo_ remove event handler
         */
        $scope.$on("removeTodo", function(event, args){
            if(typeof args !== "undefined" && typeof args.item !== "undefined" && typeof args.item.id !== "undefined"){
                TodoService.removeTodo(args.item.id).then(
                    function(response){
                        ctrlTodo.getAllTodoItems();
                    },
                    function(error){
                        alert("Error while removing todo item!");
                    }
                );
            }
        });
    }
})();