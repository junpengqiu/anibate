// to be in <head>
// utility functions

// Draw an int (equal or greater than 0) below certain number as input
var drawIntBelow = n => Math.floor(Math.random() * n);

var joinAndIfExisit = function(condArr){
    // console.log(condArr);
    let toRet = '';
    let firstIns = true;
    for (cond in condArr){
        // console.log(condArr[cond]);
        cond = condArr[cond];
        if(!cond)
            continue;
        if (firstIns){
            toRet += cond;
            firstIns = false;
        }else{
            toRet += `&${cond}`;
        }
    }
    return toRet;
}

var goJapanese = function(){
    navbarElements.goJapanese();
    coverElements.goJapanese();
};

var goEnglish = function(){
    navbarElements.goEnglish();
    coverElements.goEnglish();
};

var beforeResultsReturn = function(){
    // loading status
    doLoading();

    // draw Image to show
    coverElements.drawImageToShow();

    // hide the results
    queryElements.results.hidden = true;

    // hide the results stat
    queryElements.stat_root.hidden = true;

    // hide the comments
    commentElements.root.hidden = true;
};

var whenResultsReturn = function(resp_animes){
    console.log(resp_animes);
    queryElements.renderResults(resp_animes);

    // hide the results instruction
    queryElements.instruct.hidden = true;

    // unhide the results
    queryElements.results.hidden = false;

    // loaded status
    doLoaded();
};

var doLoading = function(){
    goJapanese();
    navbarElements.loading.hidden = false;
};

var doLoaded = function(){
    goEnglish();
    navbarElements.loading.hidden = true;
};

// I admit below should go to bator methods
var signUp = function(){
    let fieldValid = false;
    let userName = '';
    let password = '';
    while(!fieldValid){
        userName = prompt('enter your user name:');
        if(userName == null) return // cancel button pressed
        password = prompt('enter your password:');
        if(password == null) return // cancel button pressed
        fieldValid = userName && password;
    }
    console.log(userName);
    console.log(password);

    userName = `username=${userName}`;
    password = `password=${password}`;

    let urlToReq = `http://104.248.124.26:9000/signup?${joinAndIfExisit([userName,password])}`;
    console.log(urlToReq);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let retJs = JSON.parse(this.responseText);
            if(!retJs.err){
                window.alert('Sign up success! Log in with the entered username and password');
            }else{
                window.alert(retJs.err.sqlMessage);
            }
          }
          if (this.readyState == 4)
            doLoaded();
    }
    xhttp.open("GET", urlToReq, true);
    xhttp.send();
};

var logIn = function(){
    
    let fieldValid = false;
    let userName = '';
    let password = '';
    while(!fieldValid){
        userName = prompt('enter your user name:');
        if(userName == null) return // cancel button pressed
        password = prompt('enter your password:');
        if(password == null) return // cancel button pressed
        fieldValid = userName && password;
    }
    console.log(userName);
    console.log(password);

    userName = `username=${userName}`;
    password = `password=${password}`;

    let urlToReq = `http://104.248.124.26:9000/login?${joinAndIfExisit([userName,password])}`;
    console.log(urlToReq);
    bator.checking = true;
    doLoading();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let retJs = JSON.parse(this.responseText);
            if(!retJs.err){
                localStorage.setItem('uid',retJs.id);
            }else{
                if(retJs.err.sqlMessage){
                    window.alert(retJs.err.sqlMessage);
                }else{
                    window.alert(retJs.err);
                }
            }
          }
          if (this.readyState == 4){
            bator.checkId()
          }
    }
    xhttp.open("GET", urlToReq, true);
    xhttp.send();
};

var logOut = function(){
    localStorage.removeItem('uid');
    bator.checkId();
    bator.uid = null;
    // refresh page
};

var canIntAnime = function(){
    // can interact with anime
    if(!bator.uid || !bator.selectedAnimeId){
        window.alert('no anime selected or user not signed in');
        return false;
    }
    return true;
};

// below methods need bator logging, and selectedAnimeId set
// Side on Anime
var insertSideAnime = function(side){
    // if success, call querySideAnime to display
    if(!canIntAnime()) return;
    
    let url = `http://104.248.124.26:9000/insert/side?anime_id=${bator.selectedAnimeId}&user_id=${bator.uid}&side=${side}`;
    console.log(url);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let retJs = JSON.parse(this.responseText);
            if(retJs.err){
                window.alert(retJs.err.sqlMessage);
                return;
            }else{
                querySideAnime();
            }
        }
        if (this.readyState == 4)
            doLoaded();
    };
    doLoading();
    xhttp.open("GET", url, true);
    xhttp.send();
};

var querySideAnime = function(){
    // and them show the side info with asscoiated buttons on web page
    if(!canIntAnime()) return;

    let url = `http://104.248.124.26:9000/query/side?anime_id=${bator.selectedAnimeId}&user_id=${bator.uid}`;
    console.log(url);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let retJs = JSON.parse(this.responseText);
            if(retJs.err){
                window.alert(retJs.err.sqlMessage);
                return;
            }

            if(retJs.length == 0){
                bator.setAnimeSide(-1);
            }else{
                bator.setAnimeSide(retJs[0].side);
            }
            commentElements.showSide();
        }
        if (this.readyState == 4)
            doLoaded();
    };
    doLoading();
    xhttp.open("GET", url, true);
    xhttp.send();
};

var changeSideAnime = function(){
    // if success, call querySideAnime to display
    if(!canIntAnime()) return;
    
    let url = `http://104.248.124.26:9000/update/side?anime_id=${bator.selectedAnimeId}&user_id=${bator.uid}`;
    console.log(url);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let retJs = JSON.parse(this.responseText);
            if(retJs.err){
                window.alert(retJs.err.sqlMessage);
                return;
            }else{
                querySideAnime();
            }
        }
        if (this.readyState == 4)
            doLoaded();
    };
    doLoading();
    xhttp.open("GET", url, true);
    xhttp.send();
};

// comment on Anime
var insertCommentAnime = function(){
    // if success, call querySideAnime to display
    if(!canIntAnime()) return;

    // must side !
    if (bator.selectedAnimeSide == undefined || bator.selectedAnimeSide == -1){
        window.alert('Must be sided before commenting on anime!');
        return;
    }
    
    // get and judge comment
    let com = commentElements.getCommentInput();
    if(!com){
        window.alert('comment cannot be empty!');
        return;
    }

    com = encodeURIComponent(com); // url ready
    console.log(com);
    let url = `http://104.248.124.26:9000/insert/comment?anime_id=${bator.selectedAnimeId}&user_id=${bator.uid}&content=${com}`;
    console.log(url);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let retJs = JSON.parse(this.responseText);
            if(retJs.err){
                window.alert(retJs.err.sqlMessage);
                return;
            }else{
                queryCommentAnime();
            }
        }
        if (this.readyState == 4)
            doLoaded();
    };
    doLoading();
    xhttp.open("GET", url, true);
    xhttp.send();
};

var queryCommentAnime = function(){
    // and then render
    if(!canIntAnime()) return;

    let url = `http://104.248.124.26:9000/query/comment?anime_id=${bator.selectedAnimeId}`;
    console.log(url);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let retJs = JSON.parse(this.responseText);
            if(retJs.err){
                window.alert(retJs.err.sqlMessage);
                return;
            }

            commentElements.showComment(retJs);
            commentElements.root.hidden = false;
        }
        if (this.readyState == 4)
            doLoaded();
    };
    doLoading();
    xhttp.open("GET", url, true);
    xhttp.send();
};

var changeCommentAnime = function(timestamp){
    if(!canIntAnime()) return;
    
    // get and judge comment
    let com = prompt('change the comment to?');
    if(com == null)
        //cancel
        return

    if(com === ''){
        window.alert('comment cannot be empty!');
        return;
    }

    com = encodeURIComponent(com); // url ready
    console.log(com);

    let url = `http://104.248.124.26:9000/update/comment?anime_id=${bator.selectedAnimeId}&user_id=${bator.uid}&timestamp=${timestamp}&content=${com}`;
    console.log(url);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let retJs = JSON.parse(this.responseText);
            if(retJs.err){
                window.alert(retJs.err.sqlMessage);
                return;
            }else{
                queryCommentAnime();
            }
        }
        if (this.readyState == 4)
            doLoaded();
    };
    doLoading();
    xhttp.open("GET", url, true);
    xhttp.send();

};

var deleteCommentAnime = function(timestamp){
    if(!canIntAnime()) return;

    let url = `http://104.248.124.26:9000/delete/comment?anime_id=${bator.selectedAnimeId}&user_id=${bator.uid}&timestamp=${timestamp}`;
    console.log(url);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let retJs = JSON.parse(this.responseText);
            if(retJs.err){
                window.alert(retJs.err.sqlMessage);
                return;
            }else{
                queryCommentAnime();
            }
        }
        if (this.readyState == 4)
            doLoaded();
    };
    doLoading();
    xhttp.open("GET", url, true);
    xhttp.send();
}