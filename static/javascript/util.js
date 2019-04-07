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
}

var doLoaded = function(){
    goEnglish();
    navbarElements.loading.hidden = true;
}