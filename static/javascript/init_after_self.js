// use zingchart to generate word cloud
var generateWC = function(words){
    var myConfig = {
        type: 'wordcloud',
        options: {
            words: words,
            minLength: 4
        }
    };
       
    zingchart.render({ 
        id: 'myChart', 
        data: myConfig, 
        height: 400, 
        width: '100%' 
    });

};

// generateWC([{text:"ai", count:"111"}]);

var queryLoveAndMakeWC = function(){
    let urlToReq = `http://104.248.124.26:9000/query/love?user_id=${bator.uid}`;
    console.log(urlToReq);
    let xhttp = new XMLHttpRequest();
    doLoading();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            // array of anime jsons
            let resp_animes = JSON.parse(this.responseText);
            // console.log(resp_animes);
            console.log(jsToWords(resp_animes));
            generateWC(jsToWords(resp_animes));
        }
        if (this.readyState == 4)
            doLoaded();
    };
    xhttp.open("GET", urlToReq, true);
    xhttp.send();
};

var jsToWords = function(js){
    let toRet = [];
    for(let idx = 0; idx < js.length; idx++){
        let curJ = js[idx];
        toRet.push({
            text: curJ.genre,
            count: `${Math.floor(curJ.mag * curJ.freq)}`
        });
    }
    return toRet;
};

var promtUpdateLove = function(ratio){
    let genre = prompt("Type in the genre name");
    if(genre === null) return;

    // easter egg
    if(genre === "Romance" && ratio < 1)
        document.getElementById("eastermp3").play();

    let urlToReq = `http://104.248.124.26:9000/update/love?user_id=${bator.uid}&genre=${genre}&ratio=${ratio}`;
    console.log(urlToReq);
    
    let xhttp = new XMLHttpRequest();
    doLoading();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            queryLoveAndMakeWC();
        }
    };
    xhttp.open("GET", urlToReq, true);
    xhttp.send();

};

var changeLock = function(){

    let urlToReq = `http://104.248.124.26:9000/update/lock?user_id=${bator.uid}`;
    console.log(urlToReq);
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let resp_json = JSON.parse(this.responseText);
            if(resp_json[0].lock_rec == 0){
                window.alert("your tastes have been unlocked");
            }else{
                window.alert("your tastes have been locked");
            }
        }
    };
    xhttp.open("GET", urlToReq, true);
    xhttp.send();

};

queryLoveAndMakeWC();