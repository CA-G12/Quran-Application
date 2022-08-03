const selectSurah = document.querySelector("#surah");
selectSurah.addEventListener("change", () => {
  return selectSurah.options[selectSurah.selectedIndex].value;
});
selectSurah.addEventListener("change", () => {
  console.log(selectSurah.options[selectSurah.selectedIndex].id);
  const id = selectSurah.options[selectSurah.selectedIndex].id;
  fetch(`https://api.alquran.cloud/v1/surah/${selectSurah.options[selectSurah.selectedIndex].value}/edition`, (res) => {
    const pars = res["data"]["ayahs"];
    for (let i = 0; i < pars.length; i++) {
      const surahDiv = document.getElementById("showSurah");
      const paragraph = document.createElement("p");
      const line = document.createElement("hr");

      for (var x in pars) {
        paragraph.textContent = pars[i]["text"];
      }
      surahDiv.appendChild(paragraph);
      surahDiv.appendChild(line);
    }
  });
});

fetch(url, (res) => {
  const selectSurah = document.querySelector("#surah");
  for (let i = 0; i < res.data.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${res.data[i].englishName}`);
    option.setAttribute("id", `${i + 1}`);
    option.textContent = res.data[i].englishName;
    selectSurah.appendChild(option);
  }
});
