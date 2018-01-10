# ajax-file-downloader

Small js function to download file from server via AJAX request in pure JavaScript.

### Browser support 
Chome (14+), Firefox (20+), Edge(13+)

### Basic usage
#### get(url, callback)

#### post(url, data, callback)

url - server url

data - JSON data if we are using POST request

callback - function that is called when the download is done. It takes one parameter (err) which value is filler when error occurs during the http request

Response object must be as follows:

```javascript
{
    mimetype: string(mimetype in the form 'major/minor'),
    filename: string(the name of the file to download),
    data: base64(the binary data as base64 to download)
}
```
### The file data returned MUST be base64 encoded because you cannot JSON encode binary data

## Samples
### Using <script> tag 

```javascript
//GET
window.ajaxFileDownloader.get("https://server/path", (err) => {
    if (err) {
        console.log('ERROR: ', err);
    }

    alert("done!")
});

//POST
var additionalData = {
    fileName: "MyFile",
    author: "Mike"
}

window.ajaxFileDownloader.post("https://server/path", additionalData, (err) => {
    if (err) {
        console.log('ERROR: ', err);
    }

    alert("done!")
});
```

### RequireJs
```javascript
define(['./ajax-file-downloader'], (downloader) => {
    const button = document.querySelector('#downloadBtn');

    button.addEventListener('click', () => {
        //Using GET
        downloader.get("https://server/path", (err) => {
            if (err) {
                console.log('ERROR: ', err);
            }

            alert("done!")
        });

        //Using POST
        var additionalData = {
            fileName: "MyFile",
            author: "Mike"
        }
        downloader.post("https://server/path", additionalData,  (err) => {
            if (err) {
                console.log('ERROR: ', err);
            }

            alert("done!")
        });
    });
})
```

### CommonJS
```javascript
module.import('./ajax-file-downloader').then(function (downloader) {
    const button = document.querySelector('#downloadBtn');

    button.addEventListener('click', () => {
        //Using GET
        downloader.get("https://server/path", (err) => {
            if (err) {
                console.log('ERROR: ', err);
            }

            alert("done!")
        });

        //Using POST
        var additionalData = {
            fileName: "MyFile",
            author: "Mike"
        }
        downloader.post("https://server/path", additionalData,  (err) => {
            if (err) {
                console.log('ERROR: ', err);
            }

            alert("done!")
        });
    });
});
```
