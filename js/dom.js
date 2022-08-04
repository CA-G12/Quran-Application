const selectSurahElem = document.querySelector("#surah");
const selectReciters = document.getElementById("reciter");
const selectAyas = document.getElementById("ayah");
const surahDiv = document.getElementById("showSurah");
const soundPlayer = document.querySelector(".soundPlayer");
const loadingImage = document.querySelector(".loading");
let fileUrl = "";

fetch("https://api.alquran.cloud/v1/surah", renderSurahs);

function renderSurahs(res) {
  for (let i = 0; i < res.data.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${res.data[i].number}`);
    option.textContent = res.data[i].name;
    selectSurahElem.appendChild(option);

    selectSurahElem.onchange = (event) => {
      let surahId = selectSurahElem.options[selectSurahElem.selectedIndex].value;
      selectAyas.setAttribute("disabled", "disabled");
      event.target.setAttribute("disabled", "disabled");
      selectReciters.setAttribute("disabled", "disabled");

      while (surahDiv.firstChild) {
        surahDiv.removeChild(surahDiv.lastChild);
      }
      loadingImage.style.display = "block";

      fetch(`https://api.alquran.cloud/v1/surah/${surahId}/edition`, handleAyahs);
    };
  }
}

function handleAyahs(res) {
  while (selectAyas.firstChild) {
    selectAyas.removeChild(selectAyas.lastChild);
  }

  if (res.data["ayahs"].length) {
    let ayasList = res["data"]["ayahs"];

    for (let i = 1; i < ayasList.length; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", ayasList[i]["number"]);
      option.textContent = i;
      selectAyas.appendChild(option);
    }
  }
  selectAyas.removeAttribute("disabled");
  selectSurahElem.removeAttribute("disabled");
  selectReciters.removeAttribute("disabled", "disabled");

  renderAyas(res);
}

// Get Recipters
fetch("https://qurani-api.herokuapp.com/api/reciters/", (res) => {
  for (let i = 0; i < res.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", res[i].id);
    option.textContent = `${res[i].name} - ${res[i].rewaya}`;
    selectReciters.appendChild(option);

    selectReciters.onchange = (event) => {
      let surahOption = selectSurahElem.options[selectSurahElem.selectedIndex];

      fileUrl = getSoundUrl(res, event.target.options[event.target.selectedIndex].value, surahOption.value);
      soundPlayer.src = fileUrl;
      document.querySelector(".playr-filename").innerHTML = `<span>${
        selectSurahElem.options[selectSurahElem.selectedIndex].textContent
      } - بصوت القارئ الشيخ ${selectReciters.options[selectReciters.selectedIndex].textContent}</span>`;
      window.player.play();
    };
    selectSurahElem.addEventListener("change", (event) => {
      fileUrl = getSoundUrl(
        res,
        selectReciters.options[selectReciters.selectedIndex].value,
        selectSurahElem.options[selectSurahElem.selectedIndex].value
      );
      soundPlayer.src = fileUrl;
      document.querySelector(".playr-filename").innerHTML = `<span>${
        selectSurahElem.options[selectSurahElem.selectedIndex].textContent
      } - بصوت القارئ الشيخ ${selectReciters.options[selectReciters.selectedIndex].textContent}</span>`;
      window.player.play();
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
