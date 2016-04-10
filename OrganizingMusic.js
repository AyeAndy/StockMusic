var synth = new Tone.DuoSynth().toMaster();
var majorScale = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6"];
var minorScale = ["C4", "D4", "Eb4", "F4", "G4", "A4", "Bb4", "C5", "D5", "Eb5", "F5", "G5", "A5", "Bb5", "C6", "Eb6"];
var westernScale = ["G3", "A3", "C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5", "C6", "D6", "E6", "G6"];
var blueScale = ["C3", "Eb3", "F3", "F#3", "G3", "Bb3", "C4", "Eb4", "F4", "F#4", "G4", "Bb4", "C5", "Eb5", "F5", "F#5"];
var currentScale;
var picked;
var audio;
var pattern;
var currentData;
var currentNote;
var bpm = 240;


function getData() {

  var myData = localStorage.getItem("JSONdata");

  var newData = JSON.parse(myData);
  console.log(newData);

  currentData = (newData.dataset_data).data;

  var max = 0;
  var min = 999999;

  for(var i  = 0; i < currentData.length; i++){

    var currentClose = currentData[i][1];

    if(currentClose > max){
      max = currentClose;
    }

    if(currentClose < min){
      min = currentClose;
    }
  }

  var difference = (max-min)/16;
  currentNote = new Array(currentData.length);

  for(var i = 0; i < currentData.length; i++){

    var currentClose = currentData[i][1];

    var counting = currentClose-min;
    var noteToAdd = 0;

    while(counting > difference){

      counting-=difference;
      noteToAdd++;
    }

    currentNote[i] = noteToAdd;
  }

  console.log(currentScale[15].localeCompare("F#5"));

  if(currentScale[15].localeCompare("F#5") == 0){
    audio = new Audio("DrumsBlues.mp3")
  }

  if(currentScale[15].localeCompare("G6") == 0){
    audio = new Audio("Flute.mp3")
    synth = new Tone.SimpleSynth().toMaster();
  }

}

/* Takes in an int representing data, and play the note depending on the data */
function playNotes(){

    getData();

    var toPlay = new Array(currentData.length);

    for(var i = 0; i < currentData.length; i++){
      var note = currentNote[i];
      toPlay[i] = currentScale[note];
    }

    pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, "8n");
    }, toPlay);

    pattern.start(0);

    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
    audio.play();
}

function stopNotes(){

    pattern.stop(0);
    audio.pause();
    Tone.Transport.stop();
}
