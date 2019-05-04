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
navbarElements.doBatorSigned = function(){
  this.logout.hidden = false;
  this.login.hidden = true;
  this.signup.hidden = true;
};
navbarElements.doBatorNotSigned = function(){
  this.logout.hidden = true;
  this.login.hidden = false;
  this.signup.hidden = false;
};

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
  let urlToReq = `http://104.248.124.26:9000/query/anime?${joinAndIfExisit([keywords,typeParam,genres])}&jsonly=1`;
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
      // do another xml request for img url
      queryElements.getImgAfterJson(`http://104.248.124.26:9000/query/anime?${joinAndIfExisit([keywords,typeParam,genres])}`);
    }
    if (this.readyState == 4)
      doLoaded();
  };
  xhttp.open("GET", urlToReq, true);
  xhttp.send();
};

queryElements.getImgAfterJson = function(url){
  // passing url with jsonly not set will have img attr in returned json
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      // array of anime jsons
      let resp_animes = JSON.parse(this.responseText);
      // pass img url to corresponding img tags
      queryElements.updateImgTag(resp_animes);
    }
  };

  xhttp.open("GET", url, true);
  xhttp.send();
};

queryElements.updateImgTag = function(resp_json){
  resp_json.map(js=>{
    let imgTag = document.getElementById(`anime-img-${js.id}`);
    if(!imgTag) return;
    imgTag.src = js.img;
  });
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
    <div data-aid="${anime_json.id}" class="w3-row-padding">
      <div class="w3-quarter w3-margin-bottom">
        <div class="w3-display-container">
          <img id="anime-img-${anime_json.id}" src="${anime_json.img ? anime_json.img : 'img/loading.jpg'}" alt="AnimePic" style="width:100%">
        </div>
      </div>

      <div class="w3-threequarter w3-margin-bottom">
        <p>
          <a data-aid="${anime_json.id}" onclick="bator.setAnimeId(this.dataset.aid); queryElements.focusOnSelectedAid()">
            <b>${anime_json.name}</b>
          </a>
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

queryElements.focusOnSelectedAid = function(){
  if(!bator.selectedAnimeId){
    console.log('no animes selected :(')
    return;
  }

  // hide non focus result items
  let allQueryItems = document.querySelectorAll('div[data-aid]');
  allQueryItems.forEach((ele,eleIdx,nodeListCaller) => {
    if(ele.dataset.aid !== bator.selectedAnimeId)
      ele.hidden = true;
  });


  // doloading

  // unhide stat section (hide the true contents first)
  // this.stat_holder.hidden = true;
  // this.stat_loading.hidden = false;
  // this.stat_root.hidden = false;
  
  // reach the server for stat

  // reach teh server for side
  querySideAnime();

  // reach the server for comment (doloaded here)
  queryCommentAnime();

};

queryElements.getRecommend = function(){
  console.log('hey');
  let urlToReq = `http://104.248.124.26:9000/calc/recommend?user_id=${bator.uid}`;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      // array of anime jsons
      let resp_animes = JSON.parse(this.responseText);
      // pass the resp_amimes to render what to disp after results return
      whenResultsReturn(resp_animes);
      // focus on the rec anime
      bator.setAnimeId(`${resp_animes[0].id}`);
      queryElements.focusOnSelectedAid();
      // hide image
      document.getElementById(`anime-img-${resp_animes[0].id}`).hidden = true;
      // do another xml request for img url
      // queryElements.getImgAfterJson(`http://104.248.124.26:9000/query/anime?${joinAndIfExisit([keywords,typeParam,genres])}`);
    }
    if (this.readyState == 4)
      doLoaded();
  };
  xhttp.open("GET", urlToReq, true);
  xhttp.send();
};

// commentElements method
commentElements.getCommentInput = function(){
  return commentElements.input.value;
}

commentElements.showSide = function(){
  if(bator.selectedAnimeSide == -1){
    this.sideinfo.textContent = 'You must side before comment:';
  }else if(bator.selectedAnimeSide == 0){
    this.sideinfo.textContent = 'You chose to stand AGAINST this anime!';
  }else{
    this.sideinfo.textContent = 'You chose to stand FOR this anime!';
  }

  this.for.hidden = bator.selectedAnimeSide != -1;
  this.against.hidden = bator.selectedAnimeSide != -1;
  this.betray.hidden = bator.selectedAnimeSide == -1;
  this.side.hidden = false;
};

commentElements.showComment = function(coms){
  
  // sort by timestamp
  coms.sort((x,y)=>y.timestamp - x.timestamp);

  let toIn = coms.map(com => 
    com.user_id == Number.parseInt(bator.uid) ?
    `<div class="w3-row-padding">
      <div class="w3-quarter">
        <p><b>${com.name}</b></p>
      </div>
      <div class="w3-half">
        <p>${decodeURIComponent(com.content)}</p>
      </div>
      <div class="w3-quarter">
        <div class="w3-half">
          <p style="text-align:center" onclick="changeCommentAnime(${com.timestamp})"><i>alter</i></p>
        </div>
        <div class="w3-half">
          <p style="text-align:center" onclick="deleteCommentAnime(${com.timestamp})"><i>remove</i></p>
        </div>
      </div>
    </div>`
    :
    `<div class="w3-row-padding">
      <div class="w3-quarter">
        <p>${com.name}</p>
      </div>
      <div class="w3-threequarter">
        <p>${decodeURIComponent(com.content)}</p>
      </div>
    </div>`
  );

  this.disp.innerHTML = toIn.join('');
};

// init user
var bator = {};

// user method
bator.checkId = function(){
  // set checking to prevent posting comments during checking
  bator.checking = true;

  // grab user id from localStorage
  grabbedUid = localStorage.getItem('uid');
  
  // 3 cases possible
  // grabbedUid null
  if(!grabbedUid){
    doLoaded();
    bator.checking = false;
    navbarElements.doBatorNotSigned();
    return;
  }

  // uid not valid after checking with server (temporarily not implemented, I assume user not so bad to set uid oneself)
  // uid valid after checking with server
  this.uid = grabbedUid;
  doLoaded();
  bator.checking = false;
  navbarElements.doBatorSigned();
}

bator.setAnimeId = function(aid){
  this.selectedAnimeId = aid;
}

bator.setAnimeSide = function(side){
  this.selectedAnimeSide = side;
}

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