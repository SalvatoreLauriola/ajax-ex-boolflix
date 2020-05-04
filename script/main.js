$(document).ready(function () {   //doc ready start
 
// Refs

var searchButton = $("#find");

var filmInput = $(".input_area");

var movieList = $(".movies");

var newSearch = filmInput.val().toLowerCase().trim();

// Init Handlebars
var source = $('#film-template').html();
var template = Handlebars.compile(source);


searchButton.click(function(){
  newSearch = filmInput.val().toLowerCase().trim();
  callAPI(newSearch,template,filmInput);
 
})

filmInput.keyup(function(event){
  newSearch = filmInput.val().toLowerCase().trim();
  if(event.which === 13){
    callAPI(newSearch,template,filmInput);

  }
})
  filmInput.val('');
});    // doc ready end

// Functions

function callAPI(newSearch,template,filmInput){

  console.log(newSearch)
  var moviesAPI = 'https://api.themoviedb.org/3/search/movie';
  var movieList = $(".movies");
  $.ajax({
    url: moviesAPI,
    method: 'GET',
    data: {
      api_key: '1f3d48fd77ae33cf6c8dd2073f19c800',
      query: newSearch
    },
    success: function(res) {
      var films = res.results;
      movieList.html('');
      

      for(var i = 0; i < films.length; i++){
        
        var context = {
					originalTitle: films[i].original_title,
					title: films[i].title,
					lang: films[i].original_language,
					average: films[i].vote_average
        }
        
      var html = template(context);
        movieList.append(html);
        filmInput.val('');
      }

    },
    error: function() {
      console.log('Errore nella ricerca');
    }
  });
}