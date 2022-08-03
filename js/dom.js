const selectSurahElem = document.querySelector("#surah");
const selectReciters = document.getElementById("reciter");
const selectAyas = document.getElementById("ayah");
const surahDiv = document.getElementById("showSurah");

const url = "https://api.alquran.cloud/v1/surah";
fetch(url, (res) => {
  for (let i = 0; i < res.data.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${res.data[i].number}`);
    option.textContent = res.data[i].name;
    selectSurahElem.appendChild(option);

    selectSurahElem.onchange = (event) => {
      let surahId = selectSurahElem.options[selectSurahElem.selectedIndex].value;
      let reciterId = selectReciters.options[event.target.selectedIndex].value;

      selectAyas.setAttribute("disabled", "disabled");
      event.target.setAttribute("disabled", "disabled");
      fetch(`https://api.alquran.cloud/v1/surah/${surahId}/edition`, (res) => {
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
        renderAyas(res);
      });
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
    let option = document.createElement("option");
    option.setAttribute("value", res[i].id);
    option.textContent = `${res[i].name} - ${res[i].rewaya}`;
    selectReciters.appendChild(option);
    selectReciters.onchange = (event) => {
      console.log(
        getSoundUrl(
          res,
          event.target.options[event.target.selectedIndex].value,
          selectSurahElem.options[selectSurahElem.selectedIndex].value
        )
      );
    };
    selectSurahElem.addEventListener("change", (event) => {
      console.log(
        getSoundUrl(
          res,
          selectReciters.options[selectReciters.selectedIndex].value,
          event.target.options[event.target.selectedIndex].value
        )
      );
    });
  }
});
function getSoundUrl(res, reciterId, surahId) {
  console.log(res, reciterId, surahId);
  let reciterObj = getObjectFromArray(res, "id", reciterId);
  console.log(reciterObj);
  if (reciterObj) {
    const reciterSuras = reciterObj["suras"].split(",");
    console.log(reciterSuras);
    if (reciterSuras.includes(surahId)) {
      let reciterUrl = reciterObj["Server"];
      return `${reciterUrl}/${toThreeDigit(surahId)}.mp3`;
    }
  }
}

selectAyas.onchange = (event) => {
  let ayahId = event.target.options[event.target.selectedIndex].value;
  let paragraph = document.getElementById(ayahId);
  window.scrollTo(0, paragraph.offsetTop);
};
