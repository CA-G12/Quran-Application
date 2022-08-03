const url = "https://api.alquran.cloud/v1/surah";
fetch(url, (res) => {
  const selectSurah = document.querySelector("#surah");
  for (let i = 0; i < res.data.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${res.data[i].number}`);
    option.textContent = res.data[i].englishName;
    selectSurah.appendChild(option);

    selectSurah.onchange = (event) => {
      let selectAyas = document.getElementById("ayah");
      selectAyas.setAttribute("disabled", "disabled");
      event.target.setAttribute("disabled", "disabled");
      fetch(
        `https://api.alquran.cloud/v1/surah/${selectSurah.options[selectSurah.selectedIndex].value}/edition`,
        (res) => {
          if (res.data["ayahs"].length) {
            let ayasList = res["data"]["ayahs"];

            while (selectAyas.firstChild) {
              selectAyas.removeChild(selectAyas.lastChild);
            }
            for (let i = 1; i < ayasList.length; i++) {
              let option = document.createElement("option");
              option.setAttribute("value", ayasList[i]["number"]);
              option.textContent = i;
              selectAyas.appendChild(option);
            }
          }
          selectAyas.removeAttribute("disabled");
          event.target.removeAttribute("disabled");
        }
      );
    };
  }
});

// Get Recipters
const recitersUrl = "https://qurani-api.herokuapp.com/api/reciters/";
fetch(recitersUrl, (res) => {
  for (let i = 0; i < res.length; i++) {
    console.log(res[i].id + " - " + res[i].name + " - " + res[i].rewaya);
    console.log(res[i].name + " - " + res[i].rewaya);
    console.log(getSoundUrl(res, 1, 1));
  }

  function getSoundUrl(res, reciterId, surahId) {
    let reciterObj = getObjectFromArray(res, "id", reciterId);
    if (reciterObj) {
      const reciterSuras = reciterObj["suras"].split(",");
      if (reciterSuras.include(surahId)) {
        let reciterUrl = reciterObj["Server"];
        return `${reciterUrl}/${toThreeDigit(surahId)}.mp3`;
      }
    }
  }
});
