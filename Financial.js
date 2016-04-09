$(document).ready(function() {

  var data =
  $.ajax({
      type:"GET",
      url: "https://www.quandl.com/api/v3/datasets/WIKI/AAPL/data.json",
      data:{
        start_date: "2015-05-01",
        end_date: "2015-05-31"
      }
  });

  console.log(data);

});
