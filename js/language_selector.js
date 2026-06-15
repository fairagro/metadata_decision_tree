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
    SetNavigatorLabels();
}

//Sets the current language and updates the Decision Tree UI
function SetLanguageAndRefreshDT(language) {
    SetLanguage(language);
    ApplyLanguageToUI();
    LoadDoc(prevID.at(-1));
}

//Sets all language buttons to their unselected design
function ResetSelectedButton() {
    for (let button of languageButtons) {
        button.className = "language";
    }
}

//Sets contents of all navigator elements to current language
function SetNavigatorLabels() {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML; //Get XML document

            var ui = xmlDoc.getElementsByTagName("UI");
            var nav = ui[0].getElementsByTagName("NAVIGATOR"); //List of all "UI" entries in the XML document

            document.getElementById("nav_decisiontree").innerText = nav[0].getElementsByTagName("DECISIONTREE")[0].childNodes[0].nodeValue;
            document.getElementById("nav_glossar").innerText = nav[0].getElementsByTagName("GLOSSARY")[0].childNodes[0].nodeValue;
            document.getElementById("nav_metadataguide").innerText = nav[0].getElementsByTagName("METADATAGUIDE")[0].childNodes[0].nodeValue;
            document.getElementById("nav_contact").innerText = nav[0].getElementsByTagName("CONTACT")[0].childNodes[0].nodeValue;
            document.getElementById("nav_bibliography").innerText = nav[0].getElementsByTagName("BIBLIOGRAPHY")[0].childNodes[0].nodeValue;
        }
    };
    xmlRequest.open("GET", currentDataPath, true);
    xmlRequest.send();
}

// Load data from XML and aplly to Decision Tree UI
function ApplyLanguageToUI() {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML; //Get XML document
            var ui = xmlDoc.getElementsByTagName("UI"); //List of all "UI" entries in the XML document
            SetUILabels(ui);
        }
    };
    xmlRequest.open("GET", currentDataPath, true);
    xmlRequest.send();
}

//Set Decision Tree UI contents to current language
function SetUILabels(ui) {
    var textElement = ui[0].getElementsByTagName("TEXTELEMENT");
    if (document.getElementById("back") != null) {
        document.getElementById("back").innerText = textElement[0].getElementsByTagName("BACKBUTTON")[0].childNodes[0].nodeValue;
    }
}