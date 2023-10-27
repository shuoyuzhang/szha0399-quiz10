let song;
let fft;
let audioStarted = false;

function preload() {
  soundFormats('mp3');
  song = loadSound('audio/sample-visualisation.mp3');
}

function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  song.connect(fft);
  angleMode(DEGREES);  // 使用角度单位为度
}

function draw() {
  background(220);

  if (!audioStarted) {
    return;
  }

  translate(width / 2, height / 2);  // 将原点移到画布中心

  let spectrum = fft.analyze();
  noFill();
  beginShape();

  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, 360);  // 映射到0-360度
    let rad = map(spectrum[i], 0, 255, 20, 200);  // 设置基础半径和音频振幅的映射
    
    let x = rad * cos(angle);
    let y = rad * sin(angle);
    
    let col = color(map(i, 0, spectrum.length, 0, 255), 255, 255);
    stroke(col);
    
    vertex(x, y);
  }
  endShape(CLOSE);  // 闭合形状

}

function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    song.play();
    audioStarted = true;
    return;
  }

  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}