var pos = 0;
var chart;
var length;
var MONTHS = ["JAN", "FEB", "MAR", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEPT","OCT", "NOV", "DEC"]
$(document).ready(function() {

  $('#infoModal').modal("show");

  $('#triggerModal').click(function(){
    $('#infoModal').modal("show");
  });

  $('#genre').click(function(){
    $('#genreModal').modal("show");
  });

  $('#MajorButton').click(function() {
    currentScale = majorScale;
  });

  $('#MinorButton').click(function() {
    currentScale = minorScale;
  });

  $('#WesternButton').click(function() {
    currentScale = westernScale;
  });

  $('#BluesButton').click(function() {
    currentScale = blueScale;
  });

  $('#getdata-btn').click(function() {

    var symbol = $('#symbol').val();
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();

    if(symbol == "")
        symbol = "AAPL";
    if(startDate == "")
        startDate = "2015-01-01";
    if(endDate == "")
        endDate = "2016-01-01";
    var url_string = "https://www.quandl.com/api/v3/datasets/WIKI/" + symbol + "/data.json";

    $.ajax({
        type:"GET",
        dataType: "json",
        url: url_string,
        data:{
          api_key: "zzDUgBZpN8za7SvaPCTv",
          order: "asc",
          start_date: startDate,
          end_date: endDate
        },
        success: function(resultData){
          $('#header-symbol').text(symbol);
          $('#header-date-range').text("(" + startDate + " to " + endDate + ")");
          var data = resultData.dataset_data.data;
          length = data.length;
          localStorage.setItem('JSONdata', JSON.stringify(resultData));
          var chartData = {
            labels: [],
            datasets:[
                {
                  strokeColor: "rgba(65, 105, 225, 1)",
                  label: symbol,
                  data: []
                },
                {
                  strokeColor: "rgba(216, 12, 60, 1)",
                  label: symbol,
                  data: []
                }
            ]
          }

          var time1 = 0;
          var time2 = Math.floor(data.length/4);
          var time3 = Math.floor(data.length/2);
          var time4 = Math.floor(data.length*3/4);
          var time5 = Math.floor(data.length-1);

          for (var i = 0; i < data.length; i++){

              if(i == time1 || i == time2 || i == time3 || i == time4 || i == time5){
                var month = Number(data[i][0].split("-")[1]) - 1;
                chartData.labels.push(MONTHS[month]);
              }
              else{
                chartData.labels.push("");
              }

              chartData.datasets[0].data.push(data[i][2]);
              chartData.datasets[1].data.push(data[i][3]);
          }

          var context = $("#chart").get(0).getContext("2d");
          chart = new Chart(context).TickerLine(chartData, null);

          $('#infoModal').modal("hide");
        },
        failure: function(err){
            console.log('jack');
            $('data-input-error').text(err);
            $('data-input-error').css("visibility", "visible");
        }
    });
  });
});

Chart.types.Line.extend({
    name: "TickerLine",
    defaults: {
        showTooltips: false,
        pointDot : false,
        datasetFill : false,
        animation: false,
    },
    draw: function () {
        Chart.types.Line.prototype.draw.apply(this, arguments);

        var one = this.datasets[0].points[Math.floor(pos)]; 
        var two = this.datasets[0].points[Math.ceil(pos)];
        var x = (one.x + two.x) / 2;

        // draw line
        this.chart.ctx.beginPath();
        this.chart.ctx.moveTo(x, this.scale.startPoint);
        this.chart.ctx.strokeStyle = "#000";
        this.chart.ctx.lineTo(x, this.scale.endPoint);
        this.chart.ctx.stroke();
    }
});
