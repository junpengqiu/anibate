// to be in <head>
// init main section var

var navbarElements = {};
var coverElements = {};

// Init the Elements method
// navbar method

// cover method
coverElements.drawImageToShow = function(){this.image.src = cover_imageUrlPile[drawIntBelow(cover_imageUrlPile.length)]};

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