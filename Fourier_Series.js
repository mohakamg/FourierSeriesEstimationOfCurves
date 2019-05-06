let time = 0;
let wave = [];
let x = 0, y = 0;
let prevx = 0, prevy = 0;
let radius = 0;
let harmonic = 0;
var n = 2;
var radio, stepSize = 1;
let inp, max_hars;

function setup() {
  createCanvas(1024,500);

  radio = createRadio();
  radio.option('Sawtooth',1);
  radio.option('Square Wave',2);
  radio.option('Even Harmonics',3);

  max_hars = createElement('p', 'Max Harmonics: Enter Below');
  inp = createInput('');
  inp.input(myInputEvent);



}

function myInputEvent(){
  return this.value();
}



function draw() {
  // Set the bacgkround of the canvas to black
  background(0);

  // Initialize positions in loop to zero
  x = 0; y = 0;

 // Move the origin
  translate(250, 250);

  var val = radio.value();
  n = parseInt(inp.value());

  for(let i = 1; i < n+1 ; i = i + 1){
    // Draw the first harmonic
    prevx = x; prevy = y;

    if(val == 1){
      harmonic = i;
    } else if(val == 2){
      harmonic = 2*i - 1;
    } else if(val == 3){
      harmonic = i + 1;
    }
    console.log(harmonic);


    radius = 120 / harmonic ;
    // Plot a circle
    noFill();
    ellipse(prevx, prevy, radius*2);

    // Plot a rotating bead
    x += radius * cos(harmonic * time);
    y += radius * sin(harmonic * time);
    stroke(255);
    fill(255);
    ellipse(x, y, 8);
  }


  wave.unshift(y);
  translate(300,0);
  line(x-300, y, 0, wave[0]);

  beginShape();
     noFill();
     for(let i = 0; i < wave.length; i++){
       vertex(i, wave[i]);
     }
  endShape();

  if(wave.length>250){
    wave.pop();
  }

  time += 0.05;

}
