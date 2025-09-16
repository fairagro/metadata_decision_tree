const languageButtons = document.querySelectorAll('a[id*="language"]'); //Array of all language buttons
let currentLanguage = "german";

//Sets the current language and updates the UI
function SetLanguage(language) {
    currentLanguage = language;
    ResetSelectedButton();
    document.getElementById(`language ${language}`).className = "language-selected";
    //document.getElementById("demo").innerText = currentLanguage;

    //Set current data path to the selected language
    currentDataPath = `./data_${language}.xml`; 
    LoadDoc(prevID.at(-1))
}

//Sets all language buttons to their unselected design
function ResetSelectedButton()
{
    for(let button of languageButtons)
    {
        button.className = "language";
    }
}

//Styles the language buttons from gtranslate (external translation services based on google translate)
function StyleButtons() {
    let languageButtons2 = document.querySelectorAll('[class*="glink nturl notranslate"]');
    document.getElementById("demo").innerText = languageButtons2.length;
    for(let button of languageButtons2)
    {
        button.className = "language";
    }
}