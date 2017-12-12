define(['./ajax-file-downloader'], function (downloader) {
    const button = document.querySelector('#downloadBtn');

    button.addEventListener('click', function() {
        downloader.get("https://my-json-server.typicode.com/angelangelov/file/xml", function(err) {
            if (err) {
                console.log('ERROR: ', err);
            }

            alert("done!")
        });
    });
})