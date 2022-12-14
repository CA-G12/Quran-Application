function renderAyas(res) {
  const surahDiv = document.getElementById("showSurah");

  const pars = res["data"]["ayahs"];
  for (let i = 0; i < pars.length; i++) {
    const paragraph = document.createElement("p");
    const line = document.createElement("hr");
    paragraph.textContent = `{ ${i + 1} } - ${pars[i]["text"]}`;
    paragraph.id = pars[i]["number"];
    surahDiv.appendChild(paragraph);
    surahDiv.appendChild(line);
  }
  loadingImage.style.display = "none";
}
