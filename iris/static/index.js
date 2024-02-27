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
  responseHTML.insertAdjacentElement('afterbegin', newDiv);
}

function displayLoader() {
  let loader = document.createElement("div");
  loader.className = "responseDiv";
  loader.id = "chatLoader";
  loader.innerHTML = `
    <div class="dot-elastic"></div>
  `;

  var responseHTML = document.getElementById("response");
  responseHTML.insertAdjacentElement('afterbegin', loader);
}

function hideLoader() {
  let loader = document.getElementById("chatLoader");
  loader.remove()
}