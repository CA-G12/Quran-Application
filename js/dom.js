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
