$(document).ready(function () {   //doc ready start
 
// Refs

var searchButton = $("#find");

var filmInput = $(".input_area");

var movieList = $(".all_movies");

var moviesAPI= 'https://api.themoviedb.org/3/search/movie';

// Init Handlebars



searchButton.click(function(){

  var newSearch = filmInput.val().toLowerCase().trim();

  $.ajax({
    url: moviesAPI,
    method: 'GET',
    data: {
      api_key: '1f3d48fd77ae33cf6c8dd2073f19c800',
      query: newSearch
    },
    success: function(res) {
      var films = res.results;
      var source = $('#film-template').html();
      var template = Handlebars.compile(source);

      for(var i = 0; i < films.length; i++){
        
        var context = {
					originalTitle: films[i].original_title,
					title: films[i].title,
					lang: films[i].original_language,
					average: films[i].vote_average
        }
        console.log(template)
        var html = template(context);
        movieList.append(html);
      }

    },
    error: function() {
      console.log('Errore nella ricerca');
    }
  });





})



























});    // doc ready end