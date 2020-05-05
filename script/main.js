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
  seriesCallAPI(newSearch,template,filmInput);
  
 
})

filmInput.keyup(function(event){
  newSearch = filmInput.val().toLowerCase().trim();
  if(event.which === 13){
    callAPI(newSearch,template,filmInput);
    seriesCallAPI(newSearch,template,filmInput);

  }
})
filmInput.val('');
});    // doc ready end

// Functions


function flag(lang){
  var italy = "<img src='img/it.svg' alt='flagIt'>";
  var english = "<img src='img/en.svg' alt='flagIt'>";

  if(lang === 'en'){
    return english;
  }else if(lang === 'it'){
    return italy;
  }else {
    return lang;
  }
}

function stars(vote){
  var emptyStar = '<i class="far fa-star"></i>';
  var fullStar = '<i class="fas fa-star"></i>';
  var result = '';
  var fixedValue = Math.floor(vote*0.5);
  for (var i = 0; i < 5; i++) {
    if(fixedValue < i){
      result += emptyStar;
    }else{
      result += fullStar;
    }
  }
  return result;
}

function clean(element){
  element.html('');
}

function callAPI(newSearch,template,filmInput){

  console.log(newSearch)
  var moviesAPI = 'https://api.themoviedb.org/3/search/movie';
  var movieList = $(".movies");

  if(newSearch !==''){
    $.ajax({
      url: moviesAPI,
      method: 'GET',
      data: {
        api_key: '1f3d48fd77ae33cf6c8dd2073f19c800',
        query: newSearch,
        language: 'it-IT'
      },
      success: function(res) {
        var films = res.results;
        clean(movieList);
        if(films.length > 0) {
          for(var i = 0; i < films.length; i++){
            
          
            var context = {
              originalTitle: films[i].original_title,
              title: films[i].title,
              lang: flag(films[i].original_language),
              average: stars(films[i].vote_average),
              type: 'Film'
              }
            
          var html = template(context);
            movieList.append(html);
            }
    
        }else {
          
          filmInput.select();
        }
                        
  
       
      },
      error: function() {
        console.log('Errore nella ricerca');
      }
    });

  }else {
    alert('Prego, inserire un valore nella ricerca');
    filmInput.focus();
  }
  
}

function seriesCallAPI(newSearch,template,filmInput){

  console.log(newSearch)
  var seriesAPI = 'https://api.themoviedb.org/3/search/tv';
  var movieList = $(".movies");

  if(newSearch !==''){
    $.ajax({
      url: seriesAPI,
      method: 'GET',
      data: {
        api_key: '1f3d48fd77ae33cf6c8dd2073f19c800',
        query: newSearch,
        language: 'it-IT'
      },
      success: function(res) {
        var films = res.results;
        clean(movieList);
        if(films.length > 0) {
          for(var i = 0; i < films.length; i++){
            
          
            var context = {
              originalTitle: films[i].original_name,
              title: films[i].name,
              lang: flag(films[i].original_language),
              average: stars(films[i].vote_average),
              type: 'Tv'
              }
            
          var html = template(context);
            movieList.append(html);
            }
    
        }else {
          
          filmInput.select();
        }
                        
  
       
      },
      error: function() {
        console.log('Errore nella ricerca');
      }
    });

  }else {
    alert('Prego, inserire un valore nella ricerca');
    filmInput.focus();
  }
  
}