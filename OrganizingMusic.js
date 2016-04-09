var currentIndex = 0;
var synth = new Tone.SimpleSynth().toMaster();
var pattern = new Tone.Pattern(function(time, note){
      synth.triggerAttackRelease(note, 0.25);
    }, ["C4", "E4", "G4", "A4"]);

/* Takes in an int representing data, and play the note depending on the data */
function playNotes(){

    pattern.start(0);
    Tone.Transport.start();

    return;
}

function stopNotes(){

  pattern.stop(0);
  Tone.Transport.stop();

}

function myfunction() {

  var nums = document.getElementById("data").innerHTML;
      //    document.write(nums);
        //  console.log(nums);
    var obj = JSON.parse(nums);

    var myData = (obj.dataset_data).data
          
          //var objData = document.getElementById("hi").innerHTML;
    for (var i = 0; i < myData.length; i++){
            
      document.write("High: " + myData[i][2] + " ");
      document.write("Low: " + myData[i][3]);
      document.write("<br></br>");
    }
}

