var context; //for audio
const audio = document.getElementById("responseAudio");
document.addEventListener('click', function() { context = new AudioContext(); audio.play(); console.log("play silent audio...") }, { once: true });
let frequencyArray = [];
let analyser;
let source;
let request;
let flag = 0;
let height = 0;

var wrapper;
const audioPopup = document.getElementById("audioPopup")
const canvas = document.getElementById("canvas");
const controlBar = document.getElementById("audioControls");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
// var canvas;
// var controlBar;
// var ctx;
// var centerX;
// var centerY;
const bars = 100;
const lineWidth = 3;

function showAudioFrequencyBar(autoPlay, filepath) {
  console.log("create audio...", filepath);
  // Load new audio
  audio.src = filepath;
  audio.load();

  audio.addEventListener("canplay", () => {
    initAudioAnalyzer(audio);
  })
  audio.addEventListener("ended", () => {
    close(audio);
  });
  audio.addEventListener("play", () => {
    beginDraw()
  })
  audio.addEventListener("pause", () => {
    stopDraw()
  })

  function initAudioAnalyzer(audio) {
    console.log("initialize audio analyzer...", audio);
    context = context || (new (AudioContext || webkitAudioContext)());
    analyser = analyser || context.createAnalyser();
    source = source || context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    frequencyArray = new Uint8Array(analyser.frequencyBinCount);

    // Get elements and initialize
    // const lastChat = document.getElementById("response").lastChild;
    // canvas = lastChat.querySelector("#canvas");
    // controlBar = lastChat.querySelector("#audioControls");
    // ctx = canvas.getContext("2d");
    // centerX = canvas.width / 2;
    // centerY = canvas.height / 2;

    // Trigger draw
    showAudioResponseEle()
    canvas.style.display = "block";
    // controlBar.style.display = "flex";
    if(autoPlay) {
      updateAudioControlStyle("on")
      audio.play()
    }
    else {
      updateAudioControlStyle("off")
      audio.pause()
    }
  }
}

function beginDraw() {
  console.log("begin audio visualizer..")
  // audio.play()
  // canvas.style.display = "block";
  // controlBar.style.display = "flex";
  drawCanvas();
}

function stopDraw(audio) {
  console.log("pause audio visualizer...");
  // audio.pause();
  cancelAnimationFrame(request);
}

function close(audio) {
  console.log("end audio visualizer...");
  if(request) {
    cancelAnimationFrame(request);
  }
  cancelAnimationFrame(request);
  audio.src = "";
  canvas.style.display = "none";
  controlBar.style.display = "none";
  wrapper.style.display = "none";
  audioPopup.style.display = "none";
}

const drawCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(frequencyArray);

  ctx.fillStyle = "rgb(0, 69, 255)";
  const barWidth = 2;
  const scale = 1.1;
  for (let i = 0; i < bars; i++) {
    const barX = i * 3;
    const barHeight = frequencyArray[i] / 2;
    const barY = canvas.height / 2 - barHeight / 2; // Align in the middle of canvas
    ctx.fillRect(barX, barY, barWidth, barHeight * scale);
  }

  if (flag === 0) {
    request = requestAnimationFrame(drawCanvas);
  } else {
    flag = 2;
    stopDraw(audio)
  }
};


function handleAudioControl() {
  // const lastChat = document.getElementById("response").lastChild;
  // const control = lastChat.querySelector("#audioControl")
  const control = document.querySelector("#audioControls")
  if(control.classList.contains("pause")) {
    control.classList.remove("pause")
    control.classList.add("resume")
    audio.pause()
  }
  else {
    control.classList.remove("resume")
    control.classList.add("pause")
    audio.play()
  }
}
function handleAudioVolume() {
  // const lastChat = document.getElementById("response").lastChild;
  // const control = lastChat.querySelector("#audioVolume")
  const control = document.querySelector("#audioVolume")
  if(control.classList.contains("unmuted")) {
    control.classList.remove("unmuted")
    control.classList.add("muted")
    audio.muted = true;
    audio.pause();
  }
  else {
    control.classList.remove("muted")
    control.classList.add("unmuted")
    audio.muted = false;
    audio.play();
  }
}
function updateAudioControlStyle(str) {
  // const lastChat = document.getElementById("response").lastChild;
  // const control = lastChat.querySelector("#audioControl")
  const control = document.querySelector("#audioControls")
  if(str==="off") { //sound currently off
    control.classList.remove("pause")
    control.classList.add("resume")
  }
  else if(str==="on") { //sound currently on
    control.classList.remove("resume")
    control.classList.add("pause")
  }
}

function showAudioResponseEle() {
  const loader = document.getElementById("audioLoader")
  loader.style.display = "none"

  wrapper = document.getElementById("audioFrequencyBar")
  wrapper.style.display = "flex"
}