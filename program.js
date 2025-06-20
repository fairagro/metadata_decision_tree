function loadDoc(id) {
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        loadQuestion(this,id);
    }
  };
  xmlRequest.open("GET", "data.xml", true);
  xmlRequest.send();
}

function loadQuestion(xml,id)
{
    var xmlDoc = xml.responseXML;
    var q = xmlDoc.getElementsByTagName("QUESTION");
    
    RemoveButtons();

    var question_content;
    var title_content; 
    for (var i = 0; i <q.length; i++) { 
        if(q[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id)
        {
            question_content = q[i].getElementsByTagName("QUESTION_TEXT")[0].childNodes[0].nodeValue;
            title_content = q[i].getElementsByTagName("CATEGORY")[0].childNodes[0].nodeValue;
            AddButtons(q[i]);
            break;
        }else{
            question_content = "Frage " + id + " nicht gefunden";
            title_content = "Titel zu Frage " + id + " nicht gefunden";
        }
    }
    document.getElementById("container question").innerText = question_content;
    document.getElementById("title").innerText = title_content;
    
}

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
}

function RemoveButtons()
{
    while(document.getElementById("button"))
    {
        const element = document.getElementById("button");
        element.remove();
    }
}

function AddButtons(question)
{
    var buttons_content = question.getElementsByTagName("BUTTON_TEXT");
    var buttons_links = question.getElementsByTagName("BUTTON_LINK");
    const container = document.getElementById("container answer");

    for(var i = 0; i < buttons_content.length; i++)
    {
      var newButton = document.createElement('button');
      var page_link = buttons_links[i].childNodes[0].nodeValue;

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