var i = 0
const listenNext = [];


async function getJsonAlbums() {
    response_albumsjson_bandCamp = await fetch('https://localhost:7258/Lib/GetJsonAlbumsBandCamp');
    response_albumsjson_bandCamp = await response_albumsjson_bandCamp.json();

    response_albumsjson_user_albums = await fetch('https://localhost:7258/Lib/GetJsonAlbumsUsers')
    response_albumsjson_user_albums = await response_albumsjson_user_albums.json()
    console.log(response_albumsjson_user_albums)
    console.log(response_albumsjson_bandCamp)


    getAlbumsBandCamp();
    getAlbumsUsers();
}



function getAlbumsBandCamp() {
    for (let item of response_albumsjson_bandCamp) {
        item.img = "./IMG/BandCamp_cover.png";
        var blok = '<div id="'+ i +'" class="main__content-item"><span id="btn-add"><img class="btn-add" src="./IMG/plus.png"></span><div class="main__content-item-cover"><img src="'+ item.img +'"></div><div class="main__content-item-info"><div class="main__content-item-title">'+ item.title +'</div><div class="main__content-item-author">'+ item.author +'</div></div></div>';
        document.querySelector('.main__container').insertAdjacentHTML('afterbegin', blok);
        i++
    } 
}
function getAlbumsUsers() {
    for (let item of response_albumsjson_user_albums) {
        var blok = '<div id="'+ i +'" class="main__content-item"><span id="btn-add"><img class="btn-add" src="./IMG/plus.png"></span><div class="main__content-item-cover"><img src="'+ item.img +'"></div><div class="main__content-item-info"><div class="main__content-item-title">'+ item.title +'</div><div class="main__content-item-author">'+ item.author +'</div></div></div>';
        document.querySelector('.main__container').insertAdjacentHTML('afterbegin', blok);
        i++
    } 
}



$(document).ready(function(){
    $('.main__container').on('click','#btn-add',function(e){
        e.preventDefault();
        let $parent = $(this).parent();
        let Id = $parent.attr("id");
        if(listenNext.includes(Id) == false){
            listenNext.push(Id);
        }
        localStorage.setItem('listenNext', JSON.stringify(listenNext));
        alert("Альбом добавлен в очередь")
    });
});





addEventListener("load", async () => {
    await getJsonAlbums()

});