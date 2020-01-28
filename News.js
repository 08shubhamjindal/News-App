var isoCountries  = {
  'india' : 'in',
  'canada' : 'ca',
  'iceland' : 'is'
};
var countries = [
  "india",
  "canada",
  "iceland"
];
function lcs(inputCountry, listCountry, inputCountrySize, listCountrySize) {
  var x = new Array(inputCountrySize + 1);
  for (var i = 0; i < x.length; i++) {
       x[i] = new Array(listCountrySize + 1);
     }
  for (var i = 0; i <= inputCountrySize; i++){
      for (var j = 0; j <= listCountrySize; j++){
      if (i == 0 || j == 0)
          x[i][j] = 0;

      else if (inputCountry[i - 1] == listCountry[j - 1])
          x[i][j] = x[i - 1][j - 1] + 1;

      else
          x[i][j] = Math.max(x[i - 1][j], x[i][j - 1]);
      }
  }
  return x[inputCountrySize][listCountrySize];
}
  window.onload = function() {
    localStorage.setItem("myCountryCode", 'us');
    localStorage.setItem("myCategoryCode", 'general');
    showData('us', 'general');
  }
  function createNode(element) {
      return document.createElement(element);
  }
  function append(parent, el) {
    return parent.appendChild(el);
  }
  function getCountryCode(clicked_id) {
        var countryCode = clicked_id;
        localStorage.setItem("myCountryCode", countryCode);
        var categoryCode = localStorage.getItem("myCategoryCode");
        showData(countryCode, categoryCode);
  }
  function getCategory(clicked_id) {
        var categoryCode = clicked_id;
        localStorage.setItem("myCategoryCode", categoryCode);
        var countryCode = localStorage.getItem("myCountryCode");
        showData(countryCode, categoryCode);
  }
  function getCountryCodeBySearch() {
    var variable = document.getElementById('CountryCodeID_BySearch').value;
    var maxi = 0;
    var finalcountry;
    for (var i = 0; i < countries.length; i++) {
          var yy  = lcs(variable, countries[i], variable.length, countries[i].length);
          if(yy>maxi){
            maxi = yy;
            finalcountry = countries[i];
          }
    }
    console.log(finalcountry);
    console.log(isoCountries[finalcountry]);
    showData(isoCountries[finalcountry], 'general');
  }
  function showData(countryCode, category) {
  const ul = document.getElementById("news");
  ul.innerHTML = '';
  const url = 'https://newsapi.org/v2/top-headlines?country='+countryCode+'&category='+category+'&apiKey=a6d224d1b3044a3daa6d0f70856b41e0';
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    let getarticles = data.articles;
    console.log(data.articles);
    return getarticles.map(function(getarticle) {
      let li = createNode('li'),
          img = createNode('img'),
          span = createNode('span');
      img.src = getarticle.urlToImage;
      span.innerHTML = `<br><br/>${getarticle.author}<br><br/>${getarticle.content}<br><br/>`;
      append(li, img);
      append(li, span);
      append(ul, li);
    })
  })
  .catch(function(error) {
    console.log(error);
  });
}
