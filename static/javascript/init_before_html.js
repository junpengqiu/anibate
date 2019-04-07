// to be in <head>
// init main section var

var navbarElements = {};
var coverElements = {};
var queryElements = {};
var commentElements = {};

// Init the Elements method
// navbar method
navbarElements.goJapanese = function(){this.title.textContent = 'アニベート'};
navbarElements.goEnglish = function(){this.title.textContent = 'Anibate'};

// cover method
coverElements.drawImageToShow = function(){this.image.src = cover_imageUrlPile[drawIntBelow(cover_imageUrlPile.length)]};
coverElements.goJapanese = function(){this.title.textContent = 'アニベート'};
coverElements.goEnglish = function(){this.title.textContent = 'Anibate'};

// query method
queryElements.search = function(){
  let keywords = this.getParamKeywords();
  if(!keywords){
    window.alert('need keyword(s)!');
    return;
  }
  let typeParam = this.getParamType();
  let genres = this.getParamGenres();
  // console.log(keywords);
  // console.log(typeParam);
  // console.log(genres);
  let urlToReq = `http://104.248.124.26:9000/query?${joinAndIfExisit([keywords,typeParam,genres])}`;
  console.log(`requesting ${urlToReq}`);

  // render what the page is gonna like before results return
  beforeResultsReturn();
  
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      // array of anime jsons
      let resp_animes = JSON.parse(this.responseText);
      // pass the resp_amimes to render what to disp after results return
      whenResultsReturn(resp_animes);
    }
    if (this.readyState == 4)
      goEnglish()
  };
  xhttp.open("GET", urlToReq, true);
  xhttp.send();
};

queryElements.getParamKeywords = function(){
  let val = queryElements.keywords.value.trim();
  val = val.split(' ')
  if (val.length == 0)
    return null;
  return `keywords=${val.join(',')}`;
};

queryElements.getParamType = function(){
  let radios = document.querySelectorAll(`input[name='type']`);
  for(let i = 0; i < radios.length; i++){
    if((radios[i]).checked)
      return `type=${(radios[i]).value}`;
  }
  return null;
};

queryElements.getParamGenres = function(){
  let boxes = document.querySelectorAll(`input[name='genre']`);
  let toRet = [];
  for(let i = 0; i < boxes.length; i++){
    if((boxes[i]).checked)
      toRet.push((boxes[i]).value);
  }
  if(toRet.length == 0)
    return null
  return `genres=${toRet.join(',')}`
};

queryElements.renderResults = function(resp_amimes){
  // embed the result htmls first
  // appendChild is NOT gonna be used, innerhtml acctually changed
  let toIn = resp_amimes.map((js) => this.getResultHtml(js));
  this.results.innerHTML = toIn.join('');
};

queryElements.getResultHtml = function(anime_json){
  return `
    <div class="w3-row-padding">
      <div class="w3-quarter w3-margin-bottom">
        <div class="w3-display-container">
          <img src="${anime_json.img}" alt="House" style="width:100%">
        </div>
      </div>

      <div class="w3-threequarter w3-margin-bottom">
        <p>
          <b>${anime_json.name}</b>
        </p>
        <p>
          episodes: ${anime_json.episodes}
        </p>
        <p>
          type: ${anime_json.type}
        </p>
        <p>
          rating from MyAnimeList: ${anime_json.ratng}
        </p>
      </div>
    </div>
  `;
};

// init miscellaneous
// the cover picture url is randomly picked from one below
const cover_imageUrlPile = [
  "https://hdqwalls.com/download/anime-creature-fighting-4k-1920x1080.jpg",
  "https://hdqwalls.com/download/anime-girl-fantasy-artwork-yc-1920x1080.jpg",
  "https://hdqwalls.com/download/anime-landscape-d5-1920x1080.jpg",
  "https://wallpapercave.com/wp/wp1859954.jpg",
  "http://livewallpaperswide.com/wp-content/uploads/2017/03/1489241372_782_1080p-anime-desktop-wallpapers.jpg",
  "http://livewallpaperswide.com/wp-content/uploads/2017/03/1489241375_274_1080p-anime-desktop-wallpapers.jpg",
  "http://livewallpaperswide.com/wp-content/uploads/2017/03/1489241382_313_1080p-anime-desktop-wallpapers.jpg",
  "http://genchi.info/images/wallpaper-1080p-1.jpg",
  "https://wallpapercave.com/wp/wp1859940.jpg",
  "https://i.imgur.com/rEUbOsw.jpg",
  "http://www.wallpapermaiden.com/image/2017/06/08/the-legend-of-zelda-breath-of-the-wild-link-princess-zelda-anime-style-games-anime-16217.jpg",
  "https://cdn.guidingtech.com/imager/media/assets/215501/best-bleach-anime-wallpaper_935adec67b324b146ff212ec4c69054f.jpg?1549108742"
];

// deleted url:
// "https://i0.hdslb.com/bfs/article/be341580fb50ebae42168163092eeb61abdf75bd.jpg@1320w_742h.webp",
// "https://i0.hdslb.com/bfs/article/6208ff689f3c222e1bd9c2617c7ad6dd53a3b733.jpg@1320w_742h.webp",
// "https://i0.hdslb.com/bfs/article/ddc800c8da2570533c066d253eb085b775b57777.jpg@1320w_742h.webp",