var i =0;
var songNum =0;




let plaing_status = false;
var audio = new Audio();
const allSongs = [];



async function getJsonAlbums() {
    response_albumsjson_bandCamp = await fetch('https://localhost:7258/Lib/GetJsonAlbumsBandCamp');
    response_albumsjson_bandCamp = await response_albumsjson_bandCamp.json();

    response_albumsjson_user_albums = await fetch('https://localhost:7258/Lib/GetJsonAlbumsUsers')
    response_albumsjson_user_albums = await response_albumsjson_user_albums.json();


    
    for(var a of response_albumsjson_bandCamp){
        for(s of a.album_songs){
            allSongs.push(s);
        }
    }
    for(var a of response_albumsjson_user_albums){
        for(s of a.album_songs){
            allSongs.push(s);
        }
    }
    allSongs.sort(() => Math.random() - 0.5);
    console.log(allSongs)
    getInfo_forSong();
    let songContentNum = 1;
    for(let s of allSongs){
        var blok = '<div class="main__song-content-scrol-item"><div class="main__song-content-scrol-item-main"><div class="main__song-content-scrol-item-num-title"><div class="main__song-content-scrol-item-num">'+ songContentNum +'.</div><div class="main__song-content-scrol-item-title">'+ s.title +'</div></div><div class="main__song-content-scrol-item-time">2.46</div></div><div class="line"></div></div>';
        document.querySelector('.main__song-content-scrol').insertAdjacentHTML('beforeend', blok);            
        songContentNum++;
        console.log(s);
    }
}




function getInfo_forSong() {
    
    if(allSongs[songNum].img_link != null)
    {
        document.querySelector(".main__imglink").src = allSongs[songNum].img_link;
    }
    else{
        document.querySelector(".main__imglink").src = "./IMG/BandCamp_cover.png";
    }
    let title = document.querySelector('.main__title')
    title.innerHTML =""
    title.innerHTML = `${allSongs[songNum].title}`

    
    
    

    // let title = document.querySelector('.main__title')
    // title.innerHTML =""
    // title.innerHTML += `${allAlbums[i].title}`
}




function next_btn() {
    if (songNum < allSongs.length-1) {
        songNum++;
        play_song();
        getInfo_forSong();
        
    }
    else {
        songNum = 0;
        getInfo_forSong();
        if(document.getElementById("btn_play").style.display == "none"){
            play_song();
        }
        
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
    let link = allSongs[songNum].song;
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