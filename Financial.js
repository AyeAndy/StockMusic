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

      var data =
      $.ajax({
          type:"GET",
          dataType: "json",
          url: url_string,
          data:{
            start_date: startDate,
            end_date: endDate,
            api_key: "zzDUgBZpN8za7SvaPCTv",
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
                        label: symbol,
                        data: []
                    }
                ]
            }
            console.log(chartData);
            for (var i = 0; i < data.length; i++){
                chartData.labels.push("");
                chartData.datasets[0].data.push(data[i][1]);
            }   
            var context = $("#chart").get(0).getContext("2d");
            var myNewChart = new Chart(context).Line(chartData, null);
          },
          failure: function(err){
            console.log(err);
          }
      });

      $('#infoModal').modal("hide");
  
  });
});
