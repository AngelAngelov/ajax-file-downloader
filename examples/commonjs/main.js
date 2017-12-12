module.import('./ajax-file-downloader').then(function (downloader) {
  const button = document.querySelector('#downloadBtn');

  button.addEventListener('click', () => {
    downloader.get("https://my-json-server.typicode.com/angelangelov/file/xml", (err) => {
      if (err) {
        console.log('ERROR: ', err);
      }

      alert("done!")
    });
  });
});
