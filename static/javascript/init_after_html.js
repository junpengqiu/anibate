// to be the end of <body>

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
queryElements.stat_root = document.getElementById('query_stat_root');
queryElements.stat_holder = document.getElementById('query_stat_holder');
queryElements.stat_loading = document.getElementById('query_stat_loading');

// commentElements completion
commentElements.root = document.getElementById('comment_root');
commentElements.disp = document.getElementById('comment_disp');
commentElements.input = document.getElementById('comment_input');
commentElements.side = document.getElementById('comment_side');
commentElements.sideinfo = document.getElementById('comment_sideinfo');
commentElements.for = document.getElementById('comment_for');
commentElements.against = document.getElementById('comment_against');
commentElements.betray = document.getElementById('comment_betray');

// init current user data
// check who is signed in if any
bator.checkId();

// Init the Elements attr based on current data and etc.
// navbarElements init

// coverElements init
coverElements.drawImageToShow();

