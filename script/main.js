$(document).ready(function () {   //doc ready start
 
// Refs

var moviesAPI = 'https://api.themoviedb.org/3/search/movie';

var seriesAPI = 'https://api.themoviedb.org/3/search/tv';

var searchButton = $("#find");

var filmInput = $(".input_area");

var movieList = $(".movies");

var newSearch = filmInput.val().toLowerCase().trim();

// Init Handlebars
var source = $('#film-template').html();
var template = Handlebars.compile(source);


searchButton.click(function(){
  newSearch = filmInput.val().toLowerCase().trim();
  callAPI(newSearch,template,filmInput,moviesAPI);
  callAPI(newSearch,template,filmInput,seriesAPI);
  
 
})

filmInput.keyup(function(event){
  newSearch = filmInput.val().toLowerCase().trim();
  if(event.which === 13){
    callAPI(newSearch,template,filmInput,moviesAPI);
    callAPI(newSearch,template,filmInput,seriesAPI);

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

function callAPI(newSearch,template,filmInput,url,){

  console.log(newSearch)
  
  var movieList = $(".movies");
  clean(movieList);

  if(newSearch !==''){
    $.ajax({
      url: url,
      method: 'GET',
      data: {
        api_key: '1f3d48fd77ae33cf6c8dd2073f19c800',
        query: newSearch,
        language: 'it-IT'
      },
      
      success: function(res) {
        
        var films = res.results;
        if(url == 'https://api.themoviedb.org/3/search/movie'){
          if(films.length > 0) {
            print(template, films, movieList, 'Film')
  
  
          }else {
            
            filmInput.select();
          }
        }else if (url == 'https://api.themoviedb.org/3/search/tv' ){
          if(films.length > 0) {
            print(template, films, movieList, 'Serie Tv')
          }else {
          filmInput.select();
          
          }
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



function print(template, films, movieList, type){
  for(var i = 0; i < films.length; i++){
    var img = 'https://image.tmdb.org/t/p/w342';
    var noImg = 'img/no-poster.png';
    var title, originalTitle;
    var poster = films[i].poster_path;

    if(type == 'Serie Tv') {
      title = films[i].name;
      originalTitle = films[i].original_name 
    }else if (type == 'Film'){
      title = films[i].title;
      originalTitle= films[i].original_title;
    }
    if(poster == null){
      poster = noImg;

    }else {
      poster= img + poster;
    } 
    var context = {
      originalTitle: originalTitle,
      title: title,
      lang: flag(films[i].original_language),
      average: stars(films[i].vote_average),
      type: type,
      poster: poster,
      description: films[i].overview.substring(1, 500)
      }
    
     
    var html = template(context);
    movieList.append(html);
    }
}