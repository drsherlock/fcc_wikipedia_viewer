$(document).ready(function() {

  $('#search').on("click", function() {
    $('#results').empty();
    getData();
  });
});

function getData() {

  var topic = $('#topic').val();
  if (topic === "") {
    $('#results').append('<h3 id="empty">No Search Term Given</h3><hr>');
  } else {

    var link = "https://en.wikipedia.org/w/api.php?action=opensearch&redirects=resolve&search=" + topic + "&format=json&callback=wikiCallbackFunction";

    $.ajax({
      url: link,
      dataType: 'jsonp',
      success: function(data) {
        if (data[1].length > 0) {
          for (var i = 0; i < data[1].length; i++) {
            $('#results').append('<a href=' + data[3][i] + ' target="_blank"><h4 class="list">' + data[1][i] + '</h4></a><p class="desc">' + data[2][i] + '</p><hr>');
          }

        } else {

          $('#results').append('<h3 id="wrong">Try Another Term</h3><hr>');
        }
      }
    });
  }
}

$("#topic").autocomplete({
  source: function(request, response) {
    $.ajax({
      url: "http://en.wikipedia.org/w/api.php",
      dataType: "jsonp",
      data: {
        'action': "opensearch",
        'format': "json",
        'search': request.term
      },
      success: function(data) {
        response(data[1]);
      }
    });
  }
});
