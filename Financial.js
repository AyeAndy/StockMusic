$(document).ready(function() {

  $('#infoModal').modal("show");

  $('#getdata-btn').click(function() {

    var symbol = $('#symbol').val();
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();

    if(symbol == '' || startDate == '' || endDate == ''){
      $('#data-input-error').text("Please fill in the fields appropriately.");
      $('#data-input-error').css("visibility","visible");
    }
    else{

      var url_string = "https://www.quandl.com/api/v3/datasets/WIKI/" + symbol + "/data.json";

      var data =
      $.ajax({
          type:"GET",
          dataType: "json",
          url: url_string,
          data:{
            start_date: startDate,
            end_date: endDate
          },
          success: function(resultData){
            var toString = JSON.stringify(resultData);
            $('#data').text(toString);
            console.log(resultData);
          },
          failure: function(err){
            console.log(err);
          }
      });


      $('#infoModal').modal("hide");
  }
  });
});
