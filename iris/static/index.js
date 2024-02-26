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
}

function hideLoader() {
  let loader = document.getElementById("chatLoader");
  loader.remove()
}

function showAudioFrequencyBar() {
  const audio = document.getElementById("botAudio")
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const context = new AudioContext()
  const analyser = context.createAnalyser()
  const source = context.createMediaElementSource(audio)
  const fbc_array = new Uint8Array(analyser.frequencyBinCount)

  window.addEventListener('load', ()=>{
    source.connect(analyser)
    analyser.connect(context.destination)

    loop(canvas, ctx, fbc_array)
  }, false)
}

function loop(canvas, ctx, fbc_array) {
  window.requestAnimationFrame(loop)
  analyser.getByteFrequencyData(fbc_array)

  ctx.clearRect(0,0,canvas.width, canvas.height)
  ctx.fillStyle="#ff0000"

  let bar_x, bar_width, bar_height;
  let bars = 100

  for(let i = 0; i < bars; i++) {
    bar_x = i*3
    bar_width=2
    bar_height = -(fbc_array[i]/2)
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)

  }
}