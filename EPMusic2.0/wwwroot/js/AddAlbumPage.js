var i = 0;
var Album = new Object();
var Song = new Object();









  document.querySelector("form").addEventListener("submit", async e => {
    e.preventDefault()
    $('input[name="audio_title"]').each(function(index) {
        $(this).attr('name', 'audio_title' + index);
      });
    var form = document.getElementById("form");
    var formData = new FormData(form);

    $.ajax({
        url: "/Home/AddAlbum",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            alert(result);
        }
    });




    // var formData = new FormData(form);
    
    // console.log(formData)
    // fetch('addalbum', {
    //     method: 'POST',
    //     body: formData
    // })
});





// document.querySelector(".form-get-album").addEventListener("submit", async e => {
//     e.preventDefault()
    
//     // Album.album_cover = document.querySelector(".album_cover").value;
//     Album.Title = document.querySelector(".album_title").value;
//     Album.Author = document.querySelector(".album_author").value;
//     const input = document.querySelector('input[type="file"]');
//     alert(input.value)
    

    
//     alert(JSON.stringify(Album))
//     await fetch("addalbum", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(Album)
//     }).then(response => {
//         if (response.ok === true) {
//             window.location.href = '/home'
//         }
//     })
// });


$(document).ready(function(){
    $('.song').on('click','#remove-song',function(e){
        e.preventDefault();
        let $parent = $(this).parent();
        $parent.remove();
        console.log(this.parentNode);
    });



    var parent = $('.infinity');
    var max = parent[0].scrollHeight - parent[0].offsetHeight - 20;
    parent.on('scroll', function(event) {
    var s = $(this).scrollTop(),
        f = $('>:first', parent),l = $('>:last', parent);
    if(s > max) {f.appendTo(parent); parent.scrollTop(s - f.height())}
    if(s < 5) {l.prependTo(parent);parent.scrollTop(s + l.height()) }
}).scrollTop(5); 



});



function addSong() {
    var song = '<div class="song__item"><p><label>Название песни:</label><input name="audio_title" type="text"></p><p><input type="file" name="audio" accept="audio/*"></p><a id="remove-song">Удалить</a></div>';
    document.querySelector('.song').insertAdjacentHTML('afterbegin', song);
}


document.getElementById("add-song").addEventListener("click", addSong);
// document.getElementById("remove-song").onclick = function () {
//     this.remove();
//     console.log(this.className);
// }









// var data;

// const obj = {};

// forEach(el => obj[el.name] = el.value);
// console.log(JSON.stringify(obj))





// function getJSONimg(){
//     const img = document.querySelector("img");

// const canvas = document.createElement("canvas");
// canvas.width = img.width;
// canvas.height = img.height;

// const ctx = canvas.getContext("2d");
// ctx.drawImage(img, 0, 0);

// canvas.toBlob(function(blob) {
//     blob.arrayBuffer()
//     .then((buf) => {
//     var newArray = Array.from(new Uint8Array(buf));
    
//     var data = {file: newArray,name: "my file"}
//     var string = JSON.stringify(data)
//     // console.log(string);
//     data = buf
    
//     // console.log(JSON.stringify(Array.from(new Uint8Array(buf))))
//     // console.log((JSON.parse(buf)).buffer)

//   })
//   .catch(console.error);

    
        
    
  
    
//   }, 'image/png');
// // canvas.toBlob((blob) => {
// //   blob.arrayBuffer()
// //   .then((buf) => {
// //     var newArray = Array.from(new Uint8Array(buf));
    
// //     var data = {file: newArray,name: "my file"}
// //     var string = JSON.stringify(data)
// //     console.log(data);
// //     data = buf
    
// //     // console.log(JSON.stringify(Array.from(new Uint8Array(buf))))
// //     // console.log((JSON.parse(buf)).buffer)

// //   })
// //   .catch(console.error);

// // }, "image/png");


// }

// // getJSONimg();

// // const imageUrl = urlCreator.createObjectURL(data);
// // const img = document.createElement('img');
// // img.src = imageUrl;


// const input = document.querySelector('input[type="file"]');
// const reader = new FileReader();
// reader.onload = function(event) {
//   const json = JSON.parse(reader.result);
//   console.log(json);
// };
// // reader.readAsText(input.files[0]);
