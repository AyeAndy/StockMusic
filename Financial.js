//options for graph
var graphOptions = {
  showTooltips: false,
  pointDot : false,
  datasetFill : false,
};

var MONTHS = ["JAN", "FEB", "MAR", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEPT","OCT", "NOV", "DEC"]

$(document).ready(function() {

  $('#infoModal').modal("show");

  $('#getdata-btn').click(function() {

    var symbol = $('#symbol').val();
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();

    if(symbol == '' || startDate == '' || endDate == ''){
        symbol = "AAPL";
        startDate = "2015-01-01";
        endDate = "2016-01-03";
    }

      var url_string = "https://www.quandl.com/api/v3/datasets/WIKI/" + symbol + "/data.json";

      $.ajax({
          type:"GET",
          dataType: "json",
          url: url_string,
          data:{
            api_key: "zzDUgBZpN8za7SvaPCTv",
            order: "asc",
            start_date: startDate,
            end_date: endDate,
            exclude_column_names: true,
            column_index: 4
          },
          success: function(resultData){
            // var toString = JSON.stringify(resultData);
            var data = resultData.dataset_data.data;
            var chartData = {
              labels: [],
              datasets:[
                  {
                    // strokeColor: "rgba(49, 225, 90, 2)",
                    strokeColor: "rgba(65, 105, 225, 1)",
                    label: symbol,
                    data: []
                  }
              ]
            }
            console.log(chartData);

            var time1 = 0;
            var time2 = data.length/4;
            var time3 = data.length/2;
            var time4 = data.length*3/4;
            var time5 = data.length-1;

            for (var i = 0; i < data.length; i++){

                if(i == time1 || i == time2 || i == time3 || i == time4 || i == time5){
                  var month = Number(data[i][0].split("-")[1]) - 1;
                  chartData.labels.push(MONTHS[month]);
                }
                else{
                  chartData.labels.push("");
                }

                chartData.datasets[0].data.push(data[i][1]);
            }

            var context = $("#chart").get(0).getContext("2d");
            var myNewChart = new Chart(context).Line(chartData, graphOptions);
          },
          failure: function(err){
            console.log(err);
          }
      });

  $('#infoModal').modal("hide");

  // animate the ticker
  // myMove();
  });
});

function myMove() {
    var chart = document.getElementById("chart"); 
    var context = chart.getContext("2d");
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++; 
        }
    }
}
