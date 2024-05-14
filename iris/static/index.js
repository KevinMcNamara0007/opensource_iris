function addUserInput(cur) {
  console.log("adding user input...")
  var text = cur.instructions.value;
  addUserInputText(text)
}
function addUserInputText(text) {
  let newDiv = document.createElement("div");
  newDiv.className = "responseDiv userChat";
  newDiv.innerHTML = `<div>${text}</div>`;

  var responseHTML = document.getElementById("response");
  responseHTML.insertAdjacentElement('beforeend', newDiv);
}

function displayLoader() {
  let loader = document.createElement("div");
  loader.className = "responseDiv";
  loader.id = "chatLoader";
  loader.innerHTML = `
    <div class="dot-elastic"></div>
  `;

  var responseHTML = document.getElementById("response");
  responseHTML.insertAdjacentElement('beforeend', loader);

  scrollToLast()
}

function hideLoader() {
  let loader = document.getElementById("chatLoader");
  loader.remove()
}

function scrollToLast() {
  const chatWin = document.querySelector(".chatWindow.scrollBar")
  chatWin.lastChild.scrollIntoView({ behavior: "smooth", block: "start"})
}

function insertResponseBox(targetDiv, data, index) {
  let newDiv = document.createElement("div");
  newDiv.className = "responseDiv botChat";
  newDiv.innerHTML =
    `<div class="botChatHeader">
      <div class="botProfile iconWrapper">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.a{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M20.84,2.75a152.53,152.53,0,0,0-1.79,17.88,69.39,69.39,0,0,1,7.46-.6l2.36,0-.48,2.32c-.2,1-.29,1.27-.49,2.1a38.71,38.71,0,0,1,4.8.61l2.37.68-1.2,2.15c-3.13,5.63-8.73,8-10.69,8.72A73,73,0,0,0,24.32,44c.12.57.21,1,.32,1.5M28.58,8a3.69,3.69,0,0,1,0,7.37h0a3.69,3.69,0,0,1-3.69-3.69h0A3.69,3.69,0,0,1,28.58,8Z"></path><circle class="a" cx="24" cy="24" r="21.5"></circle></g></svg>
      </div> AIA` +
      // audioFrequencyBarEle + 
    `</div>` +
    "<div class='chatText'>" +
    data +
    "</div>" +
    '<div class="responseBtns"><button id="copyButton" class="copyText iconBtn" onclick="copyToClipboard(' +
    index +
    `)">
    <svg class="autoPlayImg" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.53 8L14 2.47C13.8595 2.32931 13.6688 2.25018 13.47 2.25H11C10.2707 2.25 9.57118 2.53973 9.05546 3.05546C8.53973 3.57118 8.25 4.27065 8.25 5V6.25H7C6.27065 6.25 5.57118 6.53973 5.05546 7.05546C4.53973 7.57118 4.25 8.27065 4.25 9V19C4.25 19.7293 4.53973 20.4288 5.05546 20.9445C5.57118 21.4603 6.27065 21.75 7 21.75H14C14.7293 21.75 15.4288 21.4603 15.9445 20.9445C16.4603 20.4288 16.75 19.7293 16.75 19V17.75H17C17.7293 17.75 18.4288 17.4603 18.9445 16.9445C19.4603 16.4288 19.75 15.7293 19.75 15V8.5C19.7421 8.3116 19.6636 8.13309 19.53 8ZM14.25 4.81L17.19 7.75H14.25V4.81ZM15.25 19C15.25 19.3315 15.1183 19.6495 14.8839 19.8839C14.6495 20.1183 14.3315 20.25 14 20.25H7C6.66848 20.25 6.35054 20.1183 6.11612 19.8839C5.8817 19.6495 5.75 19.3315 5.75 19V9C5.75 8.66848 5.8817 8.35054 6.11612 8.11612C6.35054 7.8817 6.66848 7.75 7 7.75H8.25V15C8.25 15.7293 8.53973 16.4288 9.05546 16.9445C9.57118 17.4603 10.2707 17.75 11 17.75H15.25V19ZM17 16.25H11C10.6685 16.25 10.3505 16.1183 10.1161 15.8839C9.8817 15.6495 9.75 15.3315 9.75 15V5C9.75 4.66848 9.8817 4.35054 10.1161 4.11612C10.3505 3.8817 10.6685 3.75 11 3.75H12.75V8.5C12.7526 8.69811 12.8324 8.88737 12.9725 9.02747C13.1126 9.16756 13.3019 9.24741 13.5 9.25H18.25V15C18.25 15.3315 18.1183 15.6495 17.8839 15.8839C17.6495 16.1183 17.3315 16.25 17 16.25Z" fill="#000000"/>
    </svg>
    </button>
    </div>`;
  targetDiv.insertAdjacentElement('beforeend', newDiv);
  scrollToLast()
}
function insertImageResponseBox(targetDiv, data) {
  let newDiv = document.createElement("div");
  newDiv.className = "responseDiv botChat";
  newDiv.innerHTML =
          `<div class="botChatHeader">
            <div class="botProfile iconWrapper">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.a{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path class="a" d="M20.84,2.75a152.53,152.53,0,0,0-1.79,17.88,69.39,69.39,0,0,1,7.46-.6l2.36,0-.48,2.32c-.2,1-.29,1.27-.49,2.1a38.71,38.71,0,0,1,4.8.61l2.37.68-1.2,2.15c-3.13,5.63-8.73,8-10.69,8.72A73,73,0,0,0,24.32,44c.12.57.21,1,.32,1.5M28.58,8a3.69,3.69,0,0,1,0,7.37h0a3.69,3.69,0,0,1-3.69-3.69h0A3.69,3.69,0,0,1,28.58,8Z"></path><circle class="a" cx="24" cy="24" r="21.5"></circle></g></svg>
            </div> AIA` +
          `</div>` +
          "<div>" +
          "<img alt='generatedImage' src='" + data + "'/>" +
          "</div>";
  targetDiv.insertAdjacentElement('beforeend', newDiv)
  scrollToLast()
}

let APIKEY = localStorage.getItem("apiKey") ? localStorage.getItem("apiKey") : "";

let modelSelecter = "oai";
let rag = "y";

function updateKey(){
  APIKEY = document.getElementById("apiKey").value;
  localStorage.setItem("apiKey", APIKEY)
}

let history = localStorage.getItem("history")
    ? JSON.parse(localStorage.getItem("history"))
    : [];

let compressedHist = localStorage.getItem("compressedHist")
    ? JSON.parse(localStorage.getItem("compressedHist"))
    : history;

$("#apiform").submit(function (e) {
  e.preventDefault();
});

function evaluatePrompt(){
  document.getElementById("soundWaveContainer").style.display = "none";
  getFillerVoice();
  let instructions = document.getElementById("instructions").value;
  if (document.getElementById("guide")) {
    document.getElementById("guide").style.display = "none";
  }
  displayLoader()

  //Disable form elements
  disableElements()


  let promptLowerCase = instructions.toLowerCase();
  const wordsToCheck = ["image", "picture", "design", "generate"];
  if(wordsToCheck.some(imageWord => promptLowerCase.includes(imageWord))){
    console.log("generating Image")
    generateImage(instructions)
  }else{
    if(rag === "y"){
      semanticSearch()
    }else{
      console.log("no image or rag key word detected")
      callAPI()
    }
  }
}

function semanticSearch(){
  let formData = new FormData();
  let instructions = document.getElementById("instructions").value;
  formData.append("query", instructions)
  $.ajax({
    type: "POST",
    url: "/Inference/semantic_search",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log(data)
      let notes = document.getElementById("notes");
      try{
        if (notes && document.getElementById("notesContainer").style.display !== "none") {
          if (notes.value !== "") {
            notes = document.getElementById("notes");
            data.forEach((item, index)=>{
              notes.value = notes.value + "\n" + "Reference " + index + ": " + item.content
            })
          }
          if (notes.value === "") {
            notes = document.getElementById("notes");
            data.forEach((item, index)=>{
              notes.value = "\n" + "Reference " + index + ": " + item.content
            })
          }
        } else {
          loadNotes();
          notes = document.getElementById("notes");
          data.forEach((item, index)=>{
            notes.value = notes.value + " \n" + "Reference " + index + ": " + item.content
          })
        }
        callAPI()
      }catch (e) {
        callAPI()
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      callAPI()
    },
  });
}

function callAPI() {
  historyLogMaintenance()
  let notes = document.getElementById("notes");
  let instructions = document.getElementById("instructions").value;
  let formData = new FormData();
  formData.append("api_key", APIKEY);
  if (notes) {
    if (notes.value !== "") {
      formData.append("notes", notes.value);
    }
  }
  formData.append("history", JSON.stringify(compressedHist));
  console.log(formData.get("history"));
  formData.append("prompt", instructions);

  let responseHTML = document.getElementById("response");

  document.getElementById("textAudioContainer").style.display = "none";
  document.getElementById("soundWaveContainer").style.display = "none";
  //remove notes
  document.getElementById("notesContainer").style.display = "none";
  document.getElementById("clearHistoryDiv").style.display = "block";

  if(modelSelecter === "oai"){
    $.ajax({
      type: "POST",
      url: "/Inference/freestyle",
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        if(notes){
          notes.value = "";
        }
        //Remove Loader
        // document.getElementById("loaderContainer").style.display = "none";
        // document.getElementById("loaderContainer").innerHTML = "";
        hideLoader()
        //show Response
        responseHTML.style.display = "flex";

        //Get Audio For Response
        getTextToAudio(data);

        let assistantResponse = data.replaceAll(/\\n/g, " ");
        //Save response history
        let userObject = { role: "user", content: instructions };
        let assistantObject = {
          role: "assistant",
          content: assistantResponse,
        };
        history.push(userObject);
        history.push(assistantObject);
        compressedHist.push(assistantObject);
        localStorage.setItem("history", JSON.stringify(history));
        localStorage.setItem("compressedHist", JSON.stringify(compressedHist))

        //Display Response
        insertResponseBox(responseHTML, data, history.indexOf(assistantObject))
      },
      error: function (xhr, ajaxOptions, thrownError) {
        // document.getElementById("loaderContainer").style.display = "none";
        hideLoader()
        enableElements()
        displayAlert("OpenAI failed to get response.")
      },
    });
  }else{
    callELF();
  }
}

function callELF(){
  let formData = new FormData();
  let instructions = document.getElementById("instructions").value;
  let notes = document.getElementById("notes");
  if (notes) {
    if (notes.value !== "") {
      instructions = instructions + " /n notes: /n" + notes.value;
    }
  }
  formData.append("prompt", instructions);
  formData.append("messages", JSON.stringify(compressedHist));

  let responseHTML = document.getElementById("response");
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8000/Inference/ask_an_expert",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      if(notes){
        notes.value = "";
      }
      //Remove Loader
      // document.getElementById("loaderContainer").style.display = "none";
      // document.getElementById("loaderContainer").innerHTML = "";
      hideLoader()
      //show Response
      responseHTML.style.display = "flex";

      //Get Audio For Response
      try{
        getTextToAudio(data.choices[0].message.content);
      }catch (e) {
        getTextToAudio(data.choices[0].message.content);
      }

      let assistantResponse = data.choices[0].message.content.replaceAll(/\\n/g, " ");
      //Save response history
      let userObject = { role: "user", content: instructions };
      let assistantObject = {
        role: "assistant",
        content: assistantResponse,
      };
      history.push(userObject);
      history.push(assistantObject);
      compressedHist.push(assistantObject);
      localStorage.setItem("history", JSON.stringify(history));
      localStorage.setItem("compressedHist", JSON.stringify(compressedHist));

      //Display Response
      insertResponseBox(responseHTML, data.choices[0].message.content, history.indexOf(assistantObject))
    },
    error: function (xhr, ajaxOptions, thrownError) {
      enableElements()
      displayAlert("ELF failed to load response, try again.")
      // document.getElementById("loaderContainer").style.display = "none";
      hideLoader()
    },
  });
}

function historyLogMaintenance(){
  let formData = new FormData();
  formData.append("api_key", APIKEY)
  formData.append("history", JSON.stringify(compressedHist))
  $.ajax({
    type: "POST",
    url: "/Inference/history_management",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      if(data !== null){
        let removeSpecialCharacters = data.replaceAll(/\n/g,'');
        removeSpecialCharacters = removeSpecialCharacters.replaceAll('```','');
        removeSpecialCharacters = removeSpecialCharacters.replaceAll('json','');
        try{
          compressedHist = JSON.parse(removeSpecialCharacters);
        }catch (e) {
          console.log(e)
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log("history management could not be done")
    },
  });
}

function displayChatHistory(){
  let responseHTML = document.getElementById("response");
  if(history.length > 1){
    document.getElementById("textAudioContainer").style.display =
        "flex";
    history.forEach((item)=> {
      if(item.role.includes("user")){
        addUserInputText(item.content)
      }else{
        insertResponseBox(responseHTML, item.content, history.indexOf(item))
      }
    })
  }
}

function loadNotes() {
  let notesHTML = document.getElementById("notesContainer");

  if(notesHTML.style.display === "block") {
    notesHTML.style.display = "none"
  }
  else {
    notesHTML.innerHTML =
        '<div><label>Notes</label><textarea id="notes"></textarea></div>';
    notesHTML.style.display = "block";
  }
}
function getImageText() {
  let instructions = document.getElementById("instructions");
  if(modelSelecter === "oai"){
    if(instructions.value){
      //UE functions
      document.getElementById("soundWaveContainer").style.display = "none";
      if (document.getElementById("guide")) {
        document.getElementById("guide").style.display = "none";
      }
      document.getElementById("textAudioContainer").style.display = "none";
      document.getElementById("soundWaveContainer").style.display = "none";
      //remove notes
      document.getElementById("notesContainer").style.display = "none";
      document.getElementById("clearHistoryDiv").style.display = "block";
      disableElements()

      addUserInputText(instructions.value)
      displayLoader()
      let formData = new FormData();
      formData.append("prompt", instructions.value);
      formData.append("file", $("#image")[0].files[0]);
      formData.append("api_key", APIKEY);
      $.ajax({
        method: "POST",
        url: "/Inference/image_text_extraction",
        data: formData,
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        success: function (result) {
          hideLoader();
          enableElements();
          let responseHTML = document.getElementById("response");
          //show Response
          responseHTML.style.display = "flex";

          //Get Audio For Response
          getTextToAudio(result.message.content);

          let assistantResponse = result.message.content.replaceAll(/\\n/g, " ");
          //Save response history
          let userObject = { role: "user", content: instructions };
          let assistantObject = {
            role: "assistant",
            content: assistantResponse,
          };
          history.push(userObject);
          history.push(assistantObject);
          compressedHist.push(assistantObject);
          localStorage.setItem("compressedHist", JSON.stringify(compressedHist));
          localStorage.setItem("history", JSON.stringify(history));

          //Display Response
          insertResponseBox(responseHTML, result.message.content, history.indexOf(assistantObject))
          $("#image").val(null)
        },
        error: function ajaxError(jqXHR, textStatus, errorThrown) {
          hideLoader()
          enableElements();
          $("#image").val(null)
          displayAlert("OpenAI could not process your request, please try a different prompt and add your image again.")
        },
      });
    }else{
      $("#image").val(null)
      displayAlert("Please include a prompt for your image and add your image again.")
    }
  }else{
    elfImageExtractor()
  }
}

async function getFillerVoice() {
  // document.getElementById("soundWaveContainer").style.display = "flex";
  // const audioPopup = document.getElementById("audioPopup")
  // const audioLoader = document.getElementById("audioLoader")
  // const audioBar = document.getElementById("audioFrequencyBar")
  // audioPopup.style.display = "flex"
  // audioLoader.style.display = "block"
  // audioBar.style.display = "none"
  // let audio = document.getElementById("textToAudio");
  let randomNum = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  showAudioFrequencyBar(autoplay, "fillers/filler" + randomNum + ".wav")
}

function elfImageExtractor(){
  if (document.getElementById("guide")) {
    document.getElementById("guide").style.display = "none";
  }
  displayLoader()
  let formData = new FormData();
  formData.append("image", $("#image")[0].files[0]);
  $.ajax({
    method: "POST",
    url: "http://127.0.0.1:8000/Images/text_extraction",
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    success: function (result) {
      if(result !== null){
        displayImageText(result);
      }else{
        $("#image").val(null)
        hideLoader()
        displayAlert("Elf Failed to extract image text.")
      }
    },
    error: function ajaxError(jqXHR, textStatus, errorThrown) {
      $("#image").val(null)
      hideLoader()
      displayAlert("Elf Failed to extract image text.")
    }
  });
}

function displayImageText(text){
  hideLoader()
  $("#image").val(null)
  let notes = document.getElementById("notes");
  if (notes && document.getElementById("notesContainer").style.display !== "none") {
    if (notes.value !== "") {
      notes = document.getElementById("notes");
      notes.value =
          notes.value +
          "\nImage Text:\n" +
          text;
    }
    if (notes.value === "") {
      notes = document.getElementById("notes");
      notes.value = text;
    }
  } else {
    loadNotes();
    notes = document.getElementById("notes");
    notes.value = text;
  }
}

function ragExtract(){
  document.getElementById("myPopup").style.display = "none";
  let formData = new FormData();
  let file = document.getElementById("file").files[0];
  if (file !== undefined) {
    formData.append("file", file);
    formData.append("api_key", APIKEY);
    formData.append("rag", "y");
  }
  if (document.getElementById("guide")) {
    document.getElementById("guide").style.display = "none";
  }
  displayLoader()
  $.ajax({
    method: "POST",
    url: "/Inference/file_text_extraction",
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    success: function (result) {
      $("#file").val(null)
      hideLoader()
      displayAlert("Successfully added File Permanently")
    },
    error: function ajaxError(jqXHR, textStatus, errorThrown) {
      hideLoader()
      $("#file").val(null)
      displayAlert("Failed to add file, please try again")
    },
  });
}

function deleteAllFiles(){
  $.ajax({
    method: "GET",
    url: "/Inference/reset_rag_data",
    processData: false,
    contentType: false,
    success: function (result) {
      displayAlert("All files have been deleted.")
    },error: function ajaxError(jqXHR, textStatus, errorThrown) {
      displayAlert("Failed to delete all files.")
    }
  })
}
function getFileText() {
  document.getElementById("myPopup").style.display = "none";
  let formData = new FormData();
  let file = document.getElementById("file").files[0];
  if (file !== undefined) {
    formData.append("file", file);
  }
  if (document.getElementById("guide")) {
    document.getElementById("guide").style.display = "none";
  }
  displayLoader()
  $.ajax({
    method: "POST",
    url: "/Inference/file_text_extraction",
    data: formData,
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    success: function (result) {
      $("#file").val(null)
      let notes = document.getElementById("notes");
      if (notes && document.getElementById("notesContainer").style.display !== "none") {
        if (notes.value !== "") {
          notes = document.getElementById("notes");
          notes.value =
              notes.value +
              "\nFile Text:\n" +
              result;
        }
        if (notes.value === "") {
          notes = document.getElementById("notes");
          notes.value = result;
        }
      } else {
        loadNotes();
        notes = document.getElementById("notes");
        notes.value = result;
      }
      hideLoader()
    },
    error: function ajaxError(jqXHR, textStatus, errorThrown) {
      hideLoader()
      displayAlert("Failed to get file text, please try again.")
    },
  });
}

window.onload = function () {
  document.getElementById("stopButton").style.display = "none";
  document.getElementById("textAudioContainer").style.display = "none";
  document.getElementById("showVoiceRecordingDiv").style.display = "none";
  document.getElementById("loaderContainer").style.display = "none";
  document.getElementById("apiKey").value = APIKEY;
  if(document.getElementById("apiKey").value !== ""){
    document.getElementById("apiKey").style.display = "none"
  }
  displayChatHistory();
  if(history.length < 1){
    document.getElementById("clearHistoryDiv").style.display = "none";
    document.getElementById("response").innerHTML = guideDiv;
  }
};
function showVoiceRecorder() {
  document.getElementById("showVoiceRecordingDiv").style.display =
      "block";

  document.getElementById("soundWaveContainer").style.display = "block";
}
function hideVoiceRecorder() {
  document.getElementById("showVoiceRecordingDiv").style.display = "none";
}
function clearChatHistory() {
  localStorage.removeItem("history");
  history = [];
  localStorage.removeItem("compressedHist");
  compressedHist = [];
  document.getElementById("textAudioContainer").style.display = "none";
  document.getElementById("response").innerHTML = guideDiv;
  document.getElementById("textToAudio").innerHTML = "";
  document.getElementById("clearHistoryDiv").style.display = "none";
}

function generateImage(text){
  let formData = new FormData();
  formData.append("api_key", APIKEY);
  formData.append("prompt", text);
  document.getElementById("clearHistoryDiv").style.display = "block";
  $.ajax({
    type: "POST",
    url: "/Inference/imageGeneration",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      let responseHTML = document.getElementById("response");
      //show Response
      responseHTML.style.display = "flex";

      insertImageResponseBox(responseHTML, data)

      //Enable All Form Elements and Disable Loader
      enableElements()
      hideLoader()
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //Enable All Form Elements and disable loader
      enableElements()
      hideLoader()
      displayAlert("Could not generate Image, please try again.")
    },
  });
}

let autoplay = true;
function getTextToAudio(text) {
  const audioPopup = document.getElementById("audioPopup")
  const audioLoader = document.getElementById("audioLoader")
  const audioBar = document.getElementById("audioFrequencyBar")
  audioPopup.style.display = "flex"
  audioLoader.style.display = "block"
  audioBar.style.display = "none"

  let formData = new FormData();
  formData.append("text", text);
  formData.append("api_key", APIKEY);
  $.ajax({
    type: "POST",
    url: "/Inference/textToVoice",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      //Enable All Form Elements
      enableElements()

      let audio = document.getElementById("textToAudio");
      showAudioFrequencyBar(autoplay, data)
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //Enable All Form Elements
      enableElements()
      displayAlert("Could not get audio.")
    },
  });
}

function elfTTS(text) {
  const audioPopup = document.getElementById("audioPopup")
  const audioLoader = document.getElementById("audioLoader")
  const audioBar = document.getElementById("audioFrequencyBar")
  audioPopup.style.display = "flex"
  audioLoader.style.display = "block"
  audioBar.style.display = "none"

  try{
    //Enable All Form Elements
    enableElements()
    let audio = document.getElementById("textToAudio");
    showAudioFrequencyBar(autoplay, "http://127.0.0.1:8000/Inference/tts?transcript=" + text)
  }catch (e) {
    //Enable All Form Elements
    enableElements()
    displayAlert("Elf failed to generate audio.")
  }
}

function enableElements(){
  //Enable All Form Elements
  $('#apiform').prop('disabled', false);
  $('#instructions').prop('disabled', false);
  $('#notesButton').prop('disabled', false);
  $('#recordButton').prop('disabled', false);
  $('#image').prop('disabled', false);
  $('#file').prop('disabled', false);
  $('#searchButton').prop('disabled', false);
  $('#searchButton').removeClass('disabled');
  $('#imageButton').removeClass('disabled');
  $('#fileButton').removeClass('disabled');
  $('#instructions').val("");
}

function disableElements(){
  //Disable All Form Elements To Wait for response
  $('#apiform').prop('disabled', true);
  $('#instructions').prop('disabled', true);
  $('#notesButton').prop('disabled', true);
  $('#recordButton').prop('disabled', true);
  $('#image').prop('disabled', true);
  $('#file').prop('disabled', true);
  $('#searchButton').prop('disabled', true);
  $('#searchButton').addClass('disabled');
  $('#imageButton').addClass('disabled');
  $('#fileButton').addClass('disabled');
}

function setAutoPlay() {
  let autoPlayBtn = document.getElementById('togBtn')
  if (autoPlayBtn.checked) {
    autoplay = true
  }
  else {
    autoplay = false
  }
}

function setModel() {
  let modelBtn = document.getElementById('togBtn1')
  if (modelBtn.checked) {
    modelSelecter = "oai"
    console.log(modelSelecter)
  }
  else {
    modelSelecter = "elf"
    console.log(modelSelecter)
  }
}

function setRag(){
  let ragBtn = document.getElementById('togBtn2')
  if (ragBtn.checked) {
    rag = "y"
    console.log(rag)
  }
  else {
    rag = "n"
    console.log(rag)
  }
}

function popUpToggle() {
  document.getElementById("myPopup").style.display = "block";
}

function copyToClipboard(index) {
  // Copies the text to clipboard
  navigator.clipboard.writeText(history[index].content);
}

const guideDiv =
    `<div id="guide">
        <span>Sample prompts:</span>
        <div class="example">
        Generate me an image of a dog holding ice cream cones.
        <img src="assets/dog.png" alt="dog">
        </div>
        <div class="example">
          Draft a business plan for the Research and Development team for 2024
          <div>
          <b>Business Plan for Research and Development Team 2024</b>\n\n1. Executive Summary:\nThe objective for 2024 is to enhance our organization's market position by developing innovative products and improving existing ones, ensuring they are sustainable, cost-effective, and meet consumer needs. We aim for a 15% growth in our product line's market share by Q4 2024.\n\n2. Team Structure and Roles:\n- Head of R&D: Overseeing all R&D activities...\n
          </div>
        </div>
      </div>`


function toggleAPIKey(){
  let apikey = document.getElementById("apiKey");
  if(apikey.style.display === "none"){
    apikey.style.display = "block"
  }else{
    apikey.style.display = "none"
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const displayAlert = msg => {
  document.getElementById("popup").style.display = "block"
  document.getElementById("alert").innerText = msg
  delay(3000).then(()=>{
    document.getElementById("alert").innerText = ""
    document.getElementById("popup").style.display = "none"
  })
}