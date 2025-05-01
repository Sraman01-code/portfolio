const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const fileInput = document.getElementById("audioFile");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

// Resize canvas to fit window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.6;

let audioContext, analyser, source, bufferLength, dataArray;

// 🎶 Load the selected audio file
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        audio.src = objectURL;
    }
});

// 🎵 Play and initialize audio processing
playBtn.addEventListener("click", () => {
    if (!audioContext) {
        setupAudioContext();
    }

    if (audio.paused) {
        audio.play();
        playBtn.textContent = "Pause";
    } else {
        audio.pause();
        playBtn.textContent = "Play";
    }
});

// 🎧 Setup Audio Context & Analyzer
function setupAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Controls detail level
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    animate();
}

// 🎨 Animate bars with RGB color changes
function animate() {
    requestAnimationFrame(animate);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / bufferLength) * 1.5;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 2;
        
        // Generate RGB color based on frequency
        const red = Math.sin(i * 0.1) * 127 + 128;
        const green = Math.sin(i * 0.2) * 127 + 128;
        const blue = Math.sin(i * 0.3) * 127 + 128;
        
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 2;
    }
}
