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
    var q = xmlDoc.getElementsByTagName("ID");
    for (var i = 0; i <q.length; i++) { 
        if(q[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id)
        {
            document.getElementById("container question").value = q[i].getElementsByTagName("QUESTION_TEXT")[0].childNodes[0].nodeValue;
        }else{
            document.getElementById("container question").value = "Error"; 
        }
    } 
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

