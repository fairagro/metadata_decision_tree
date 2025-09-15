var prevID = [];
const defaultDataPath = "./data_german.xml";
let currentDataPath = defaultDataPath;
// Load data from XML file and start main process
function LoadDoc(id) {
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        LoadQuestion(this,id); //Call to main fuction
    }
  };
  xmlRequest.open("GET", currentDataPath, true);
  xmlRequest.send();
}

//Update page with the data for the provided question index
function LoadQuestion(xml,id)
{
    var xmlDoc = xml.responseXML; //Get XML document
    var entries = xmlDoc.getElementsByTagName("ENTRY"); //List of all "ENTRY" entries in the XML document
    if(prevID.at(-1) == 0 && id == 1){prevID = []}
    prevID.push(id);
 

    RemoveButtons();
    UpdateProgressBar(entries, id);

    var question_content;
    var title_content;
    
    //Find entry with the same ID as the provided index
    for (var i = 0; i <entries.length; i++)
    {
        //Case: Entry found 
        if(entries[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id)
        {
            question_content = entries[i].getElementsByTagName("QUESTION_TEXT")[0].childNodes[0].nodeValue;
            title_content = entries[i].getElementsByTagName("CATEGORY")[0].childNodes[0].nodeValue;
            
            AddButtons(entries[i]);
            ResizeResponseButtons();
            SetQuestionBorderColour(entries[i]);
            break;
        }
        //Case: No entry with the given ID
        else
        {
            question_content = "Eintrag " + id + " nicht gefunden";
            title_content = "Titel zum Eintrag " + id + " nicht gefunden";
        }

    }
    
    document.getElementById("container question").innerHTML = question_content;
    document.getElementById("title").innerText = title_content;
    
}

//Removes all elements with the ID "button"
function RemoveButtons()
{
    while(document.getElementById("button"))
    {
        const element = document.getElementById("button");
        element.remove();
    }
}

//Removes all elements with the ID "circle"
function RemoveHierachy()
{
    while(document.getElementById("circle"))
    {
        const element = document.getElementById("circle");
        element.remove();
    }
}

//Adds a circle note for a provided entry
function AddHierachy(entry, id)
{
  //Return if the entry is not a question
  if(entry.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue != 'Frage'){return;}
  //Return if the entry exceeds the index
  if(parseInt(entry.getElementsByTagName("ID")[0].childNodes[0].nodeValue) > id){return;}

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
  newDiv.onclick = function(){LoadDoc(page_link);};

  document.getElementById("container hierarchy").appendChild(newDiv);
}

//Adds every button entry of a provided question entry
function AddButtons(entry)
{
    var buttons_content = entry.getElementsByTagName("BUTTON_TEXT"); //List of all the texts for all the buttons
    var buttons_links = entry.getElementsByTagName("BUTTON_LINK"); //List of all the links for all the buttons
    const container = document.getElementById("container answer"); //Div for positioning buttons of an entry

    //creates a new button element for every BUTTON_TEXT entry
    for(var i = 0; i < buttons_content.length; i++)
    {
      let newButton = document.createElement('button');
      let page_link = buttons_links[i].childNodes[0].nodeValue;

      newButton.textContent = buttons_content[i].childNodes[0].nodeValue;
      newButton.id = "button";
      newButton.className = "button";

      newButton.onclick = function(){LoadDoc(page_link);};
      /*newButton.addEventListener('click', () => {
        LoadDoc(page_link);
      }); */

      container.appendChild(newButton);
    }

    return;
}

//Update progress bar to the provided index
function UpdateProgressBar(entries, id)
{
  var progressBar = document.getElementById("progress bar");

    let questionCounter = 0;

    //Setting the progress after an exit question to 0
    if(id == 0)
    {
      progressBar.value = 0;
    }

    //Set current and max value
    for (var i = 0; i <entries.length; i++) 
    {
      //Dynamic determination of the maximum value by counting all "Frage" (questions) entries
      if(entries[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue == "Frage")
      {
        questionCounter++;
      }

      //Setting progress value
      if(entries[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id)
      {
        //Case: question ("Frage")
        if(entries[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue == "Frage")
        {
          progressBar.value = id-1; //The IDs of question start with 1. Therefore, they need to be reduced by 1 as the current question has not been completed and therefore does not count towards the achieved progress.     
        }
        //Case: End of the tree (signified by having no further links to other entries)
        else if(entries[i].getElementsByTagName("BUTTON_LINK").length == 0)
        {
          progressBar.value = parseInt(progressBar.value) + 1;
        }
      }
    }
  //Set the maximum value of the progress bar
    progressBar.max = questionCounter;
}

// Set border colour of the div "container question" based on the TYPE of the entry
function SetQuestionBorderColour(entry)
{
  if(entry.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue =="Antwort")
  {
    document.getElementById("container question").className = "container question notice"; // Additional remarks: hsl(84, 55%, 55%) - green
  }else if(entry.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue =="Exitfrage")
  {
    document.getElementById("container question").className = "container question warning"; // Exitquestion: hsl(6, 85%, 66%) - red
  }
  else
  {
    document.getElementById("container question").className = "container question"; //default case: hsl(0, 0%, 100%) - white
  }
}

function LoadPrev()
{
  if(prevID.length >= 2)
  {
    //removes the current entry
    prevID.pop();
    //loads previous entry and removes it from the list as loading it adds it to the list again
    LoadDoc(prevID.pop());
  }
}

function ResizeResponseButtons()
{
  let maxWidth = 0;
  let maxHeight = 0;
  let buttons = document.getElementsByTagName("button")

  for(let i = 0; i < buttons.length; i++)
  {
      if(buttons[i].id == "button")
      {
          if(buttons[i].getBoundingClientRect().width > maxWidth)
          {
              maxWidth = buttons[i].getBoundingClientRect().width;
          }

          if(buttons[i].getBoundingClientRect().height > maxHeight)
          {
              maxHeight = buttons[i].getBoundingClientRect().height;
          }
      }
  }

  for(let i = 0; i < buttons.length; i++)
  {
      if(buttons[i].id == "button")
      {
          if(parseFloat(GetTextWidth(buttons[i].innerText, buttons[i].style.fontSize + buttons[i].style.fontFamily)) > 40)
          {
            buttons[i].className = "SmallPadding button";
          }

          buttons[i].style.width = maxWidth + "px";
          buttons[i].style.height = maxHeight + "px";
          //buttons[i].innerText = buttons[i].getBoundingClientRect().height;
        /*
          if (!buttons[i].style.fontSize) 
          {
            buttons[i].style.fontSize = "3em";
          }
        */
          //buttons[i].innerText = GetTextWidth(buttons[i].innerText, buttons[i].style.fontSize + buttons[i].style.fontFamily);
          
      }
  }

  function GetTextWidth(text, font){
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the font
    context.font = font;

    // Measure the text width
    const metrics = context.measureText(text);
    return metrics.width;
  }


}