var i =0;
var albumNum = 0;
var songNum =0;




let plaing_status = false;
var audio = new Audio();

const listenNext = JSON.parse(localStorage.getItem('listenNext'));
const allAlbums = [];
console.log(listenNext);
console.log(allAlbums);

// ---------------------------------------------------------------------------------------------

async function getJsonAlbums() {
    response_albumsjson_bandCamp = await fetch('https://localhost:7258/Lib/GetJsonAlbumsBandCamp');
    response_albumsjson_bandCamp = await response_albumsjson_bandCamp.json();

    response_albumsjson_user_albums = await fetch('https://localhost:7258/Lib/GetJsonAlbumsUsers')
    response_albumsjson_user_albums = await response_albumsjson_user_albums.json();


    
    for(var s of response_albumsjson_bandCamp){
        allAlbums.push(s);
    }
    for(var s of response_albumsjson_user_albums){
        allAlbums.push(s);
    }

    getAlbums_cover();
    getInfo_forAlbum();
}

// ---------------------------------------------------------------------------------------------

function getInfo_forAlbum() {
    let author = document.querySelector('.main__autor')
    author.innerHTML =""
    author.innerHTML += `${allAlbums[listenNext[albumNum]].author}`

    document.getElementById("main__imglink").src = allAlbums[listenNext[albumNum]].img;

    let album_title = document.querySelector('.main__albumtitle')
    album_title.innerHTML =""
    album_title.innerHTML = `${allAlbums[listenNext[albumNum]].title}`

    let songContentNum = 1;
    document.querySelector('.main__song-content-scrol').innerHTML = "";
    for(let s of allAlbums[listenNext[albumNum]].album_songs){
        var blok = '<div class="main__song-content-scrol-item"><div class="main__song-content-scrol-item-main"><div class="main__song-content-scrol-item-num-title"><div class="main__song-content-scrol-item-num">'+ songContentNum +'.</div><div class="main__song-content-scrol-item-title main__title">'+ s.title +'</div></div><div class="main__song-content-scrol-item-time">2.46</div></div><div class="line"></div></div>';
        document.querySelector('.main__song-content-scrol').insertAdjacentHTML('beforeend', blok);            
        songContentNum++;
        console.log(s);
    }
    

    // let title = document.querySelector('.main__title')
    // title.innerHTML =""
    // title.innerHTML += `${allAlbums[i].title}`
}

// ---------------------------------------------------------------------------------------------

function getAlbums_cover() {
    albId = 0
    for (let item of listenNext) {
        var album = allAlbums[item];
        if(album.img == null){
            album.img = "./IMG/BandCamp_cover.png";
        }
        var cover = '<div id = "'+ albId +'" class="main__songs-scrol-item"><div class="main__songs-scrol-cover"><img src="' + album.img + '"></div><div class="main__songs-scrol-info">New Text</div></div>';
        document.querySelector('.main__songs-scrol').insertAdjacentHTML('beforeend', cover);
        $(document).on('click', '.main__songs-scrol-cover', function() {
            let parent = $(this).parent();
            let parentId = parent.attr('id');
            albumNum = parentId;
            console.log(albumNum)
            getInfo_forAlbum();
            play_song();
          });
        albId++; 
    }
       
    
}

// ---------------------------------------------------------------------------------------------

function next_btn() {
    if (songNum < allAlbums[listenNext[albumNum]].album_songs.length-1) {
        songNum++;
        play_song();
        console.log(albumNum);
        console.log(songNum);
    }
    else {
        songNum = 0;
        getInfo_forAlbum();
        if(document.getElementById("btn_play").style.display == "none"){
            play_song();
        }
        console.log(albumNum);
        console.log(songNum);
    }
    
}

// ---------------------------------------------------------------------------------------------

function last_btn() {
    document.querySelector('.controllers__progress-active').style.width = `0%`;
    if (i > 0) {
        i = i - 1
        getInfo_forSong();
        console.log(i);
        if(document.getElementById("btn_play").style.display == "none"){
            play_song();
        }
    }
    else {
        i = response_albumsjson_bandCamp.length - 1;
        getInfo_forSong();
        if(document.getElementById("btn_play").style.display == "none"){
            play_song();
        }
    }   
}

// ---------------------------------------------------------------------------------------------

function play_song() {
    let btn_play = document.getElementById("btn_play");
    let btn_stop = document.getElementById("btn_stop");
    btn_play.style.display = "none";
    btn_stop.style.display = "flex";
    plaing_status = true
    let link = allAlbums[listenNext[albumNum]].album_songs[songNum].song;
    audio.preload = 'auto';
    audio.src = link;
    //audio.fastSeek("1:00")
    audio.play();
}

// ---------------------------------------------------------------------------------------------

function stop_song() {
    let btn_play = document.getElementById("btn_play")
    btn_play.style.display = "flex"
    btn_stop.style.display = "none"
    audio.pause()
}

// ---------------------------------------------------------------------------------------------

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/ duration) * 100;
    document.querySelector('.controllers__progress-active').style.width = `${progressPercent}%`;
    
}

// ---------------------------------------------------------------------------------------------

function setProgress(e){
    const width = this.clientWidth;
    const  clickX  = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX/width) * duration;

}

// ---------------------------------------------------------------------------------------------



// ---------------------------------------------------------------------------------------------

addEventListener("load", async () => {
    await getJsonAlbums();

});

audio.addEventListener('timeupdate',updateProgress);

document.querySelector('.controllers__progress').addEventListener('click',setProgress);

document.getElementById("btn_next").addEventListener("click", next_btn);

document.getElementById("btn_last").addEventListener("click", function(){
    last_btn();
});

if (plaing_status == false) {
    document.getElementById("btn_play").addEventListener("click", play_song);
};

document.getElementById("btn_stop").addEventListener("click", stop_song);


audio.addEventListener('ended',next_btn);

$(document).ready(function () {
    $('.header_add-btn').click(function (event) {
        $(this).children(".forms").slideToggle();
        event.stopPropagation();
    });
});


// ---------------------------------------------------------------------------------------------















