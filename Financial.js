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
            var toString = JSON.stringify(resultData);

            console.log(resultData);
          },
          failure: function(err){
            console.log(err);
          }
      });

  

  $('#infoModal').modal("hide");


  });
});
