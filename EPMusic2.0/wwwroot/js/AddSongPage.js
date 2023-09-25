
// document.querySelector(".form-get-bandcamp-song").addEventListener("submit", async e => {
//     e.preventDefault()

//     let url = {
//         'url': document.querySelector("#url").value
//     }
//     await fetch("addsong", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(url),
//     }).then(response => {
//         if (response.ok === true) {
//             alert(response)
//             window.location.href = '/home'
//         }
//     })
// });
var i = 0;

document.querySelector(".form-get-bandcamp-song").addEventListener("submit", async e => {
    e.preventDefault();
    $('input[name="url"]').each(function(index) {
        $(this).attr('name', 'url' + index);
      });
    var form = document.getElementById("form");
    var formData = new FormData(form);

    $.ajax({
        url: "/Home/AddSong",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            alert(result);
        }
    });
});
$(document).ready(function(){
    $('.song').on('click','#remove-song',function(e){
        e.preventDefault();
        let $parent = $(this).parent();
        $parent.remove();
        console.log(this.parentNode);
    });
});
function addSong() {
    var song = '<div><label>Введите url песни с сайта bandcamp:</label><input id="url" type="text" name="url" /><a id="remove-song">Удалить</a></div></div>';
    document.querySelector('.song').insertAdjacentHTML('afterbegin', song);
    i++;
}


document.getElementById("add-song").addEventListener("click", addSong);




