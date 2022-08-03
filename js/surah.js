function renderAyas(res) {
  const surahDiv = document.getElementById("showSurah");
  while (surahDiv.firstChild) {
    surahDiv.removeChild(surahDiv.lastChild);
  }
  const pars = res["data"]["ayahs"];
  for (let i = 0; i < pars.length; i++) {
    const paragraph = document.createElement("p");
    const line = document.createElement("hr");

    for (var x in pars) {
      paragraph.textContent = pars[i]["text"];
    }
    surahDiv.appendChild(paragraph);
    surahDiv.appendChild(line);
  }
}
