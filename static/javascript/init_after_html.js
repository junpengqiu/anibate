// to be the end of <body>

// check who is signed in if any
bator.checkId();

// fill in main section variables with elements
// navbarElements completion
navbarElements.root = document.getElementById('navbar_root');
navbarElements.title = document.getElementById('navbar_title');
navbarElements.loading = document.getElementById('navbar_loading');
navbarElements.signup = document.getElementById('navbar_signup');
navbarElements.login = document.getElementById('navbar_login');
navbarElements.logout = document.getElementById('navbar_logout');

// coverElements completion
coverElements.root = document.getElementById('cover_root');
coverElements.image = document.getElementById('cover_image');
coverElements.title = document.getElementById('cover_title');

// queryElements completion
queryElements.root = document.getElementById('query_root');
queryElements.keywords = document.getElementById('query_keywords');
queryElements.results = document.getElementById('query_results');
queryElements.instruct = document.getElementById('query_instruct');

// commentElements completion
commentElements.root = document.getElementById('comment_root');

// Init the Elements attr based on current data and etc.
// navbarElements init

// coverElements init
coverElements.drawImageToShow();

