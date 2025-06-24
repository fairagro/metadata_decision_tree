function loadDoc(id) {
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        loadQuestion(this,id);
    }
  };
  xmlRequest.open("GET", "./data.xml", true);
  xmlRequest.send();
}

function loadQuestion(xml,id)
{
    var xmlDoc = xml.responseXML;
    var entries = xmlDoc.getElementsByTagName("ENTRY");
    
    RemoveButtons();
    RemoveHierachy();

    var question_content;
    var title_content;
    for (var i = 0; i <entries.length; i++) { 
        if(parseInt(entries[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue) == id)
        {
            question_content = entries[i].getElementsByTagName("QUESTION_TEXT")[0].childNodes[0].nodeValue;
            title_content = entries[i].getElementsByTagName("CATEGORY")[0].childNodes[0].nodeValue;
            AddButtons(entries[i]);
            //Change Border Colour
            SetQuestionBorderColour(entries[i]);
            AddHierachy(entries[i], id);
            break;
        }else{
            question_content = "Eintrag " + id + " nicht gefunden";
            title_content = "Titel zum Eintrag " + id + " nicht gefunden";
        }
        AddHierachy(entries[i], id);
    }
    document.getElementById("container question").innerHTML = question_content;
    document.getElementById("title").innerText = title_content;
    
}

function RemoveButtons()
{
    while(document.getElementById("button"))
    {
        const element = document.getElementById("button");
        element.remove();
    }
}

function RemoveHierachy()
{
    while(document.getElementById("circle"))
    {
        const element = document.getElementById("circle");
        element.remove();
    }
}

function AddHierachy(entry, id)
{
  if(entry.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue == 'Frage' && entry.getElementsByTagName("ID")[0].childNodes[0].nodeValue != 0 && parseInt(entry.getElementsByTagName("ID")[0].childNodes[0].nodeValue) <= id)
  {
    let page_link = entry.getElementsByTagName("ID")[0].childNodes[0].nodeValue;

    const newDiv = document.createElement('div');
    if(parseInt(entry.getElementsByTagName("ID")[0].childNodes[0].nodeValue) == id)
    {
      newDiv.className = "circle active";
    }else{
      newDiv.className = "circle passive";
    }
    newDiv.id ="circle";
    newDiv.innerText = entry.getElementsByTagName("ID")[0].childNodes[0].nodeValue;
    newDiv.onclick = function(){loadDoc(page_link);};

    document.getElementById("container hierarchy").appendChild(newDiv);
  }
}

function AddButtons(entry)
{
    var buttons_content = entry.getElementsByTagName("BUTTON_TEXT");
    var buttons_links = entry.getElementsByTagName("BUTTON_LINK");
    const container = document.getElementById("container answer");

    for(var i = 0; i < buttons_content.length; i++)
    {
      let newButton = document.createElement('button');
      let page_link = buttons_links[i].childNodes[0].nodeValue;

      newButton.textContent = buttons_content[i].childNodes[0].nodeValue;
      newButton.id = "button";
      newButton.className = "button";

      newButton.onclick = function(){loadDoc(page_link);};
      /*newButton.addEventListener('click', () => {
        loadDoc(page_link);
      }); */

      container.appendChild(newButton);
    }

    // document.getElementById("demo").innerText = "Fun" + buttons_content.length;
    return;
}

function SetQuestionBorderColour(entry)
{
  if(entry.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue =="Antwort")
  {
    document.getElementById("container question").className = "container question highlight";
  }
  else
  {
    document.getElementById("container question").className = "container question";
  }
}

/*
function t(xml,id) {
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("CD");
  var table="<tr><th>Artist</th><th>Title</th></tr>";
  for (var i = 0; i <x.length; i++) { 
    table += "<tr><td>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue + id +
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
} */