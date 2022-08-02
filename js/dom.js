// (function () {
//   let surah = document.getElementById("surah");
//   let ayah = document.getElementById("ayah");

//   fetch("https://api.alquran.cloud/v1/surah", handleSurahs);
//   fetch("https://api.alquran.cloud/v1/surah/2/edition", handleAyas);
// })();

// function handleSurahs(response) {
//   response.data.forEach((surah) => {
//     let option = document.createElement("option");
//     option.value = surah.number;
//     option.textContent = `${surah.number} ${surah.englishName}`;
//     surah.appendChild(option);

//     option.onselect = (event) => {};
//   });
// }

// function handleAyas(response) {
//   response.data["ayahs"].forEach((ayah) => {
//     let option = document.createElement("option");
//     option.value = ayah.number;
//     option.textContent = ayah.number;
//     ayah.appendChild(option);
//   });
// }

// function renderAyas(surah) {
//   fetch("https://api.alquran.cloud/v1/surah/2/edition");
//   console.log();
// }

const url = "https://api.alquran.cloud/v1/surah";
fetch(url, (res) => {
  const selectSurah = document.querySelector("#surah");
  for (let i = 0; i < res.data.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("id", `${i}`)
    option.textContent = res.data[i].englishName;
    selectSurah.appendChild(option);
    console.log(res.data[i]);
  }
});

