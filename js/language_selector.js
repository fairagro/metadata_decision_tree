const germanButton = document.getElementById("german");
const englishButton = document.getElementById("english");
const languageButtons = document.querySelectorAll('a[id*="language"]');
let currentLanguage = "german";

function SetLanguage(language) {
    currentLanguage = language;
    ResetSelectedButton();
    document.getElementById(`language ${language}`).className = "language-selected";
    //document.getElementById("demo").innerText = currentLanguage;
    currentDataPath = `./data_${language}.xml`;
    LoadDoc(prevID.at(-1))
}

function ResetSelectedButton()
{
    for(let button of languageButtons)
    {
        button.className = "language";
    }
}


function StyleButtons() {
    let languageButtons2 = document.querySelectorAll('[class*="glink nturl notranslate"]');
    document.getElementById("demo").innerText = languageButtons2.length;
    for(let button of languageButtons2)
    {
        button.className = "language";
    }
}