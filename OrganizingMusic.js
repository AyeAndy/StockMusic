var synth = new Tone.SimpleSynth().toMaster();
var majorScale = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
var minorScale = ["C4", "D4", "Eb4", "F4", "G4", "A4", "Bb4", "C5"];
var pattern;
var currentData;
var currentNote;


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

  var difference = (max-min)/8;
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

}

/* Takes in an int representing data, and play the note depending on the data */
function playNotes(){

    var synth = new Tone.SimpleSynth().toMaster();
    var toPlay = new Array(currentData.length);

    for(var i = 0; i < currentData.length; i++){
      var note = currentNote[i];
      toPlay[i] = majorScale[note];
      document.write(toPlay[i] + " ");
      document.write(currentData[i]);
      document.write("<br></br>");
    }

    pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
    }, toPlay);

    pattern.start(0);
    Tone.Transport.bpm.value = 100;
    Tone.Transport.start();
}

function stopNotes(){

  pattern.stop(0);
  Tone.Transport.stop();

}

