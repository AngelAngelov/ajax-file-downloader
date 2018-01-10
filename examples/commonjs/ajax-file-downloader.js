/* ajax-file-downloader.js v1.0.1
 * https://github.com/AngelAngelov/ajax-file-downloader
 * Small library to download file from server via AJAX
 * response format should be as follows
 * {
 *  "mimetype": "The MIME type of the file",
 *  "filename": "Filename.txt",
 *  "data": "Base64 encoded string that contains file content"  
 * }
 * Encoded content is used to build Blob element 
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(module['exports'] || exports);
    } else {
        // Browser globals
        window.ajaxFileDownloader = {};
        factory(window.ajaxFileDownloader);
    }
}(function (exports) {
    var obj = typeof exports !== 'undefined' ? exports : {};

    //Download file via AJAX POST method
    obj.post = function (url, data, doneFunc) {
        sendRequest('POST', url, data, function (err, data) {
            if (err) {
                //process error
                if (doneFunc && typeof doneFunc == 'function') {
                    doneFunc(err);
                }
                return;
            }

            parseSuccessRequest(data);

            if (doneFunc && typeof doneFunc == 'function') {
                doneFunc();
            }
        })
    }

    //Download file via AJAX GET method
    obj.get = function (url, doneFunc) {
        sendRequest('GET', url, null, function (err, data) {
            if (err) {
                //process error
                if (doneFunc && typeof doneFunc == 'function') {
                    doneFunc(err);
                }
                return;
            }

            parseSuccessRequest(data);

            if (doneFunc && typeof doneFunc == 'function') {
                doneFunc();
            }
        })
    }

    /* AJAX request to the server
     * TODO: configure "Content-type"
     */
    function sendRequest(type, url, data, cb) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status >= 200 && this.status < 300) {
                    cb(null, JSON.parse(this.responseText));
                } else {
                    let error = {
                        statusCode: this.status,
                        text: this.responseText
                    };

                    cb(error, null);
                }
            }
        };
        xhttp.open(type, url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }

    //Create an <a> element wich will be used for downloading the content from the Blob
    function parseSuccessRequest(result) {
        if (window.URL && window.Blob && window.atob) {
            // Do it the HTML5 compliant way
            var blob = base64ToBlob(result.data, result.mimetype);

            // we create an <a> element with a link to the blob
            var a = document.createElement('a');

            // in IE 11 dows not have 'download' attr in a tag
            if ('download' in a) {
                var url = window.URL.createObjectURL(blob);

                document.body.appendChild(a);
                a.href = url;
                a.download = result.filename;
                a.click();
                
                //remove the <a> element from the DOM
                document.body.removeChild(a);
            } else {
                navigator.msSaveBlob(blob, result.filename);
            }
        }
    }

    /* Convert Base64 encoded string into a Blob
     * The byte array is sliced into smaller chunks with size 512 by default 
     * but chunk size can be changed with parameter "slicesize"
     */
    function base64ToBlob(base64, mimetype, slicesize) {
        if (!window.atob || !window.Uint8Array) {
            // The current browser doesn't have the atob function. Cannot continue
            return null;
        }
        mimetype = mimetype || '';
        slicesize = slicesize || 512;
        var bytechars = atob(base64); //decode base64
        var bytearrays = [];

        for (var offset = 0; offset < bytechars.length; offset += slicesize) {
            //slice the byte array 
            var slice = bytechars.slice(offset, offset + slicesize);
            var bytenums = new Array(slice.length);
            //process the sliced chunk
            for (var i = 0; i < slice.length; i++) {
                bytenums[i] = slice.charCodeAt(i);
            }
            var bytearray = new Uint8Array(bytenums);
            bytearrays[bytearrays.length] = bytearray;
        }
        return new Blob(bytearrays, { type: mimetype });
    };

    return obj;
}));