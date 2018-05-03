function readablizeBytes(bytes) {
    if (bytes > 0) {
        var s = ['b', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, e)).toFixed(2) + s[e];
    } else {
        return 0;
    }
}

// Gets the value of a nested property from an object if it exists.
// Otherwise returns the default_value given.
// Example: get the value of object[a][b][c][d]
// where property_path is [a,b,c,d]
function getProperty(object, propertyPath, defaultValue) {
    if (isDefined(object)) {
        if (isDefined(object[propertyPath])) {
            return object[propertyPath];
        }
        var pathParts = propertyPath.split('.'); // path as nested properties
        for (var i = 0; i < pathParts.length && isDefined(object); i++) {
            object = object[pathParts[i]];
        }
    }
    return isDefined(object) ? object : defaultValue;
}

// Checks if value is both non null and undefined
function isDefined(value) {
    return value !== null && typeof value != 'undefined';
}

// Checks if the String representation of value is a non empty string
// string.trim().length is grater than 0
function notEmpty(value) {
    return isDefined(value) && value.toString().trim().length > 0;
}

function isNumber(value) {
    var exp = /\d+/;
    return exp.test(value);
}

// Returns the given date as a String formatted as hh:MM:ss
function getTimeString(date) {
    var hh = ('0' + date.getHours()).slice(-2);
    var mm = ('0' + date.getMinutes()).slice(-2);
    var ss = ('0' + date.getSeconds()).slice(-2);
    return hh + ':' + mm + ':' + ss;
}

//return yyyy-MM-dd
function getDateString(date) {
    var yyyy = (date.getFullYear());
    var MM = ('0' + (parseInt(date.getMonth())+1) ).slice(-2);
    var dd = ('0' + date.getDate() ).slice(-2);
    return yyyy + '-' + MM + '-' + dd;
}

function getDateString2(date) {
    var yyyy = (date.getFullYear());
    var MM = ('0' + (parseInt(date.getMonth())+1) ).slice(-2);
    var dd = ('0' + date.getDate() ).slice(-2);
    var hh = ('0' + date.getHours() ).slice(-2);
    var mm = ('0' + date.getMinutes() ).slice(-2);
    var ss = ('0' + date.getSeconds() ).slice(-2);
    return yyyy + '-' + MM + '-' + dd + " " + hh + ":" + mm + ":" + ss;
}

function getDateString3(date) {
    var yyyy = (date.getFullYear());
    var MM = ('0' + (parseInt(date.getMonth())+1) ).slice(-2);
    var dd = ('0' + date.getDate() ).slice(-2);
    var hh = ('0' + date.getHours() ).slice(-2);
    var mm = ('0' + date.getMinutes() ).slice(-2);
    return yyyy + '-' + MM + '-' + dd + " " + hh + ":" + mm;
}

//return date by offset
function getDate(offset) {
    var dd = new Date();
    dd.setDate(dd.getDate()+offset);
    return dd;
}

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


String.format = function() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for ( var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

function showModal(title,content,isViewByJson) {
    var view = isViewByJson ? JSONTree.create(reps) : content;
    $('#that-modal-title').html("<h5>"+title+"</h5>");
    $('#that-modal-body-content').html(view);
    $('#modal_info2').modal({show: true, backdrop: true});
}