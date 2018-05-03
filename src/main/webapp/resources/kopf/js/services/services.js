kopf.factory('ConfirmDialogService', function () {
    this.header = 'Default Header';
    this.body = 'Default Body';

    this.confirm = function () {
        // when created, does nothing
    };

    this.close = function () {
        // when created, does nothing
    };

    this.open = function (header, body, action, confirmCallback, closeCallback) {
        this.header = header;
        this.body = body;
        this.action = action;
        this.confirm = confirmCallback; //重写
        this.close = closeCallback;
    };

    return this;
});


kopf.factory('ConfirmDialogService2', function () {
    this.header = 'Default Header';
    this.body = 'Default Body';


    this.open = function (header, body, action, confirmCallback, closeCallback) {
        document.getElementById("my_dialog_service.header").innerHTML = header;
        document.getElementById("my_dialog_service.body").innerHTML = body;
        document.getElementById("my_dialog_service.action").innerHTML = action;
        //为什么jquery取不到dom
        //$("#my_dialog_service.header").html(header);
        //$("#my_dialog_service.body").html(body);
        //$("#my_dialog_service.action").html(action);

        if(confirmCallback) {
            $("#myconfirm").unbind('click');
            $('#myconfirm').click(confirmCallback);
        }
        if(closeCallback){
            $("#closeMyConfirm").unbind('click');
            $("#closeMyConfirm").click(closeCallback);
        }
        $("#confirm_dialog2").show();
    };

    return this;
});



kopf.factory('AceEditorService', function () {

    this.init = function (name,actionId,copyId) {
        return new AceEditor(name,actionId,copyId);
    };

    return this;
});

kopf.factory('AlertService', function () {
    this.maxAlerts = 3;

    this.alerts = [];

    // removes ALL alerts
    this.clear = function () {
        this.alerts.length = 0;
    };

    // remove a particular alert message
    this.remove = function (id) {
        $('#' + id).fadeTo(1000, 0).slideUp(200, function () {
            $(this).remove();
        });
        this.alerts = this.alerts.filter(function (a) {
            return id != a.id;
        });
    };

    // creates an error alert
    this.error = function (msg, resp, timeout) {
        timeout = isDefined(timeout) ? timeout : 7500;
        var alert = new Alert(msg, resp, 'error', 'alert-danger', 'fa fa-warning');
        return this.addAlertCanNotRemove(alert, timeout);
    };

    // creates an info alert
    this.info = function (msg, resp, timeout) {
        timeout = isDefined(timeout) ? timeout : 2500;
        var alert = new Alert(msg, resp, 'info', 'alert-info', 'fa fa-info');
        return this.addAlert(alert, timeout);
    };

    // creates success alert
    this.success = function (msg, resp, timeout) {
        timeout = isDefined(timeout) ? timeout : 2500;
        var alert = new Alert(msg, resp, 'success', 'alert-success', 'fa fa-check');
        return this.addAlert(alert, timeout);
    };

    // creates a warn alert
    this.warn = function (msg, resp, timeout) {
        timeout = isDefined(timeout) ? timeout : 5000;
        var alert = new Alert(msg, resp, 'warn', 'alert-warning', 'fa fa-info');
        return this.addAlert(alert, timeout);
    };

    this.addAlert = function (alert, timeout) {
        this.alerts.unshift(alert);
        var service = this;
         setTimeout(function () {
             service.remove(alert.id);
         }, timeout);
        if (this.alerts.length >= this.maxAlerts) {
            this.alerts.length = 3;
        }
        return alert.id;
    };

    this.addAlertCanNotRemove = function (alert, timeout) {
        this.alerts.unshift(alert);
        var service = this;
        /*setTimeout(function () {
            service.remove(alert.id);
        }, timeout);*/
        if (this.alerts.length >= this.maxAlerts) {
            this.alerts.length = 3;
        }
        return alert.id;
    };

    return this;
});

kopf.factory('ClipboardService', ['AlertService', '$document', '$window',
    function (AlertService, $document, $window) {
        var textarea = angular.element($document[0].createElement('textarea'));
        textarea.css({
            position: 'absolute',
            left: '-9999px',
            top: (
                $window.pageYOffset || $document[0].documentElement.scrollTop
            ) + 'px'
        });
        textarea.attr({readonly: ''});
        angular.element($document[0].body).append(textarea);

        this.copy = function (value, success, failure) {
            try {
                textarea.val(value);
                textarea.select();
                $document[0].execCommand('copy');
                success();
            } catch (error) {
                failure();
            }
        };

        return this;
    }]);

kopf.factory('DebugService', ['$filter', function ($filter) {

    var MaxMessages = 1000;

    var messages = [];

    var updatedAt = 0;

    var addMessage = function (message) {
        var date = new Date();
        messages.push($filter('date')(date, '[yyyy-MM-dd HH:mm:ss] ') + message);
        if (messages.length > MaxMessages) {
            messages.shift();
        }
        updatedAt = date.getTime();
    };

    this.debug = function (message, data) {
        addMessage(message);
        if (data) {
            addMessage(JSON.stringify(data));
        }
    };

    this.getUpdatedAt = function () {
        return updatedAt;
    };

    this.getMessages = function () {
        return messages;
    };

    return this;

}]);

kopf.factory('ExplainService', ['$TreeDnDConvert',
    function ($TreeDnDConvert) {
        function containsString(value, searched) {
            return value.indexOf(searched) >= 0;
        }

        this.isExplainPath = function (path) {
            return path &&
                (containsString(path, '_explain') ||
                containsString(path, '?explain') ||
                containsString(path, 'explain=true'));
        };
        /**
         * Normalize Get document by id and Document search responses.
         * Build explanation tree for TreeDnd directive.
         */
        this.normalizeExplainResponse = function (response) {
            var lHits;
            if (response.hits) {
                // Explain query
                lHits = response.hits.hits;
                // Remove hits from main response
                delete response.hits.hits;
            } else {
                // Explain document
                lHits = [response];
            }
            lHits.forEach(function (lHit) {
                // Sometimes ._explanation, .sometimes explanation, let's normalize it
                if (lHit.explanation) {
                    var lExplanation = lHit.explanation;
                    delete response.explanation;
                    response._explanation = lExplanation;
                }
                lHit.documentId = lHit._index + '/' + lHit._type + '/' + lHit._id;
                if (lHit._explanation) {
                    if (!lHit._score) {
                        lHit._score = lHit._explanation.value;
                    }
                    lHit.explanationTreeData =
                        $TreeDnDConvert.tree2tree([lHit._explanation], 'details');
                }
            });
            return lHits;
        };

        return this;
    }]);

kopf.factory('HostHistoryService', function () {

    this.getHostHistory = function () {
        var history = localStorage.getItem('kopfHostHistory');
        history = isDefined(history) ? history : '[]';
        return JSON.parse(history);
    };

    this.addToHistory = function (connection) {
        var host = connection.host.toLowerCase();
        var username = connection.username;
        var password = connection.password;
        if (username && password) {
            host = host.replace(/^(https|http):\/\//gi, function addAuth(prefix) {
                return prefix + username + ':' + password + '@';
            });
        }
        var entry = {host: host};
        var history = this.getHostHistory();
        for (var i = 0; i < history.length; i++) {
            if (history[i].host === host) {
                history.splice(i, 1);
                break;
            }
        }
        history.splice(0, 0, entry);
        if (history.length > 10) {
            history.length = 10;
        }
        localStorage.setItem('kopfHostHistory', JSON.stringify(history));
    };

    this.clearHistory = function () {
        localStorage.removeItem('kopfHostHistory');
    };

    return this;

});

kopf.factory('DebugService', ['$filter', function ($filter) {

    var MaxMessages = 1000;

    var messages = [];

    var updatedAt = 0;

    var addMessage = function (message) {
        var date = new Date();
        messages.push($filter('date')(date, '[yyyy-MM-dd HH:mm:ss] ') + message);
        if (messages.length > MaxMessages) {
            messages.shift();
        }
        updatedAt = date.getTime();
    };

    this.debug = function (message, data) {
        addMessage(message);
        if (data) {
            addMessage(JSON.stringify(data));
        }
    };

    this.getUpdatedAt = function () {
        return updatedAt;
    };

    this.getMessages = function () {
        return messages;
    };

    return this;

}]);

kopf.factory('PageService', ['ElasticService', 'DebugService', '$rootScope',
    '$document', function(ElasticService, DebugService, $rootScope, $document) {

        var instance = this;

        this.clusterStatus = undefined;
        this.clusterName = undefined;

        this.link = $document[0].querySelector('link[rel~=\'icon\']');

        if (this.link) {
            var faviconUrl = this.link.href;
            var img = $document[0].createElement('img');
            img.src = faviconUrl;
        }

        $rootScope.$watch(
            function() {
                return ElasticService.cluster;
            },
            function(cluster, oldValue) {
                instance.setFavIconColor(cluster ? cluster.status : undefined);
                instance.setPageTitle(cluster ? cluster.name : undefined);
            }
        );

        /**
         * Updates page title if name is different than clusterName
         *
         * @param {string} name - cluster name
         */
        this.setPageTitle = function(name) {
            if (name !== this.clusterName) {
                if (name) {
                    $rootScope.title = 'EserKnife[' + name + ']';
                } else {
                    $rootScope.title = 'EserKnife - no connection';
                }
                this.clusterName = name;
            }
        };

        this.setFavIconColor = function(status) {
            if (this.link && this.clusterStatus !== status) {
                this.clusterStatus = status;
                try {
                    var colors = {green: '#468847', yellow: '#c09853', red: '#B94A48'};
                    var color = status ? colors[status] : '#333';
                    var canvas = $document[0].createElement('canvas');
                    canvas.width = 32;
                    canvas.height = 32;
                    var context = canvas.getContext('2d');
                    context.drawImage(img, 0, 0);
                    context.globalCompositeOperation = 'source-in';
                    context.fillStyle = color;
                    context.fillRect(0, 0, 32, 32);
                    context.fill();
                    this.link.type = 'image/x-icon';
                    var imgUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTMwNDE0RDQ0OTFBMTFFODgzOThFNEREOERDRTI0QUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTMwNDE0RDU0OTFBMTFFODgzOThFNEREOERDRTI0QUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMzA0MTREMjQ5MUExMUU4ODM5OEU0REQ4RENFMjRBQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMzA0MTREMzQ5MUExMUU4ODM5OEU0REQ4RENFMjRBQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pq/eOk8AAAOSSURBVHjaxJdbSBRhFMfP3NakIumuWLahRSQlSmRZkGT2EN0fkozoqehCD9VLEV0guhAZBUIPiVQP9VBUlCCu5EtBsOU1sqRCMTRFK9u1dd2dnf5nmgEbHGd3XfLID1G++b7/nG/O/zufUHx5I5kxHB6mnIwc/XdrVyspkkKWyAXFYA1YCKYDHvQb9IAWUAc8oJuiCDmKMbzIdrALrAeizZh0kAf2gV7wGDwyxNiG6LD4ZuAFt8GGKMabMRscADXgAZgXdQZEQaRgODjFH/SXuyTXXhp/cObWgZPJruRKnt9WgCAINBAYSCvIKqjMz8wvpgSFQMIcVVMrPC2elB+DP65LojS6AKib3DPQcyfPnVu0bP4yCqvhEZPoCuMSIAkSZ1XwfvaW9fn6RAi4ZrcFt0RBKAqGghQYDujVMDI0TYtLAKc9pIYookU4G5fwr0/gqVXAbrBntAm4HL1fvFTT4iFZksx8xLAFEA+++/tJkvTavgJegn5TQDI4a5tC7FnXz26qa63TxQgU31a4ZBcZH+FicAEcNAWcAIvGNAxRpknKJGRAjluAJUrBedHYhlL6/zEV7GcB2SCTJiZ28ttv5W12Gqnxj6bFXQnC6CWcyhlYHdUM2l8RCQ5ZNk61MYNrODt9KR0pOkyiKMa2gqhQ5/dOet7wnNSIas2ExgKmOU3CD2bMyqCsuVkxv6IiK9TQ3kBVjVV6Bq0VJEd7wrE7+of8xgRaDLWfRD48N9Zp6AMznAzkVdsrevL2CUwpNh9g48HJqtuw9SQ0BXSCBU6T9Pn6qbGjSU9pLAK4avh5NjC7DLwBax1PNNgxZyKBTqjr45w8o4mLfhbwGnydIAG1LCAAqiZgcW42ys0v4xz7MphpNzocCdNQaIiUiDKub8CluMzna8F7U8A3UAYu2hlRWkoqFS4pjKshMZsSNRKh+o56CoVDvXDEY9aOiPu0TaBgNCvmC8vy+cvjfnOuol8BHx29d5RN7SL6xI9WAcNGS/YC7bMb/HMzGk9TagpgN4UdV+DPG3ZteTucblvNO89D9IBZKtwrURHBNrpnue8nyUnHnS4mzdXN1VsGhwbvQtCKBK2vBkKBmyX5Jcdw2XG+G6L3+4BcrYGA0/jzVDQNyxjRxs0ntuAFb6m1pxAd6vQMWGVUSE+MC7PFHwIr+bsaz+3Ya3AV7AB8n3eDFKOd55cIgUG2VtAEHhp1rjpN/keAAQCZyRgCrf7aowAAAABJRU5ErkJggg==";
                    //  this.link.href = canvas.toDataURL();
                    this.link.href = imgUrl;
                } catch (exception) {
                    DebugService.debug('Error while changing favicon', exception);
                }
            }
        };

        return this;

    }]);