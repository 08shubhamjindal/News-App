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
  function showData(countryCode, category) {
  console.log(countryCode);
  console.log(category);
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
      span.innerHTML = `<br><br/>${getarticle.author}<br><br/>${getarticle.description}<br><br/>`;
      append(li, img);
      append(li, span);
      append(ul, li);
    })
  })
  .catch(function(error) {
    console.log(error);
  });
}
