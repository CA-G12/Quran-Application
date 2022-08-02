// (function () {
let surah = document.getElementById("surah");
let ayah = document.getElementById("ayah");

fetch("https://api.alquran.cloud/v1/surah", handleSurahs);
fetch("https://api.alquran.cloud/v1/surah/1/edition", handleAyas);
// })();

function handleSurahs(response) {
  response.data.forEach((ele) => {
    let option = document.createElement("option");
    option.value = ele.number;
    option.textContent = `${ele.number} ${ele.englishName}`;
    surah.appendChild(option);

    option.onselect = (event) => {
      fetch(`https://api.alquran.cloud/v1/surah/${event.target.value}/edition`, handleAyas);
    };
  });
}

function handleAyas(response) {
  let options = [];
  response.data["ayahs"].forEach((ele) => {
    let option = document.createElement("option");
    option.value = ele.number;
    option.textContent = ele.number;
    options.push(option);
  });
  ayah.replaceChildren(options);
}

function renderAyas(surah) {
  fetch("https://api.alquran.cloud/v1/surah/2/edition");
  console.log();
}
