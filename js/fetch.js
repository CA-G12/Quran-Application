function fetch(url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        let data = JSON.parse(xhr.responseText);
        return cb(data);
      } else {
        Error("Error when loading the page" + xhr.status + " - " + xhr.statusText);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
