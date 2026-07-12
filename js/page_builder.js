const defaultPageDataPath = "./xml/references_german.xml";
let currentPageDataPath = defaultPageDataPath;

// Load data from XML file and start main process
function LoadPage() {
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('container').replaceChildren();
      var xmlDoc = xmlRequest.responseXML;
      var allElements = xmlDoc.getElementsByTagName("entry");

      for (let i = 0; i < allElements.length; i++) {
        let currentElement = allElements[i];
        AddElement(currentElement, document.getElementById(currentElement.getElementsByTagName("parentID")[0].textContent));
      }

      document.getElementById("title").innerText = xmlDoc.getElementsByTagName("headline")[0].textContent;;

      console.log(xmlDoc);
      console.log(xmlDoc.documentElement.tagName);
      console.log(allElements.length);
    }
  };
  xmlRequest.open("GET", currentPageDataPath, true);
  xmlRequest.send();
}

function SetPath(page) {
  currentPageDataPath = "./xml/" + page + "_" + sessionStorage.getItem("currentLanguage") + ".xml";
}

function AddElement(element, parent) {
  let type = element.getElementsByTagName("type")[0].textContent;
  let id = element.getElementsByTagName("id")[0].textContent;
  let text = element.getElementsByTagName("text")[0].textContent;

  let htmlElement = document.createElement(type);
  htmlElement.id = id;
  htmlElement.innerHTML = text;
  parent.appendChild(htmlElement);
}