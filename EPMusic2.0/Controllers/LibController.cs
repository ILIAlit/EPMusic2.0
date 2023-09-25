using EPMusic2._0.Models;
using Microsoft.AspNetCore.Mvc;

namespace EPMusic2._0.Controllers
{
    [ApiController]
    [Route("Lib")]
    public class LibController : Controller
    {
        ApplicationContext db;
        private readonly ILogger<HomeController> _logger;
        public LibController(ApplicationContext context)
        {
            this.db = context;
        }


        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        /*Отправка плей-листов Банд Камп*/
        [HttpGet("GetJsonAlbumsBandCamp")]
        public IActionResult GetJsonAlbumsBandCamp()
        {
            List<AlbumsViewModel> albumUserViewModels = new List<AlbumsViewModel>();
            var albums = db.AlbumsBandCamp.ToList();
            var songs = db.Songs.ToList();
            for (int i = 0; i < albums.Count; i++)
            {
                AlbumsViewModel albumViewModel = new AlbumsViewModel();
                for (int j = 0; j < albums[i].album_songs.Count; j++)
                {
                    SongForAlbumsViewModel songForUserAlbumViewModel = new SongForAlbumsViewModel
                    {
                        Title = albums[i].album_songs[j].Title,
                        Album = albums[i].album_songs[j].Album,
                        Author = albums[i].album_songs[j].Author,
                        Img_link = albums[i].album_songs[j].Img_link,
                        Song = albums[i].album_songs[j].Song_link,
                    };
                    albumViewModel.album_songs.Add(songForUserAlbumViewModel);
                }
                albumViewModel.Title = albums[i].Title;
                albumViewModel.Author = albums[i].Author;
                albumUserViewModels.Add(albumViewModel);
            }
            return new JsonResult(albumUserViewModels);
        }


        /*Отправка пользовательских альбомов*/
        [HttpGet("GetJsonAlbumsUsers")]
        public IActionResult GetJsonAlbumsUsers()
        {
            List<AlbumsViewModel> albumUserViewModels = new List<AlbumsViewModel>();
            var albums = db.AlbumUser.ToList();
            var songs = db.SongForUserAlbums.ToList();
            for (int i = 0; i < albums.Count; i++)
            {
                AlbumsViewModel albumUserViewModel = new AlbumsViewModel();

                byte[] imageBytes = albums[i].Img;
                string base64String_img = Convert.ToBase64String(imageBytes);
                string imgDataURL = string.Format("data:image/jpeg;base64,{0}", base64String_img);

                for (int j = 0; j < albums[i].album_songs.Count; j++)
                {
                    byte[] songBytes = albums[i].album_songs[j].Song;
                    string base64String_song = Convert.ToBase64String(songBytes);
                    string songDataURL = "data:audio/wav;base64," + base64String_song;

                    SongForAlbumsViewModel songForUserAlbumViewModel = new SongForAlbumsViewModel
                    {
                        Title = albums[i].album_songs[j].Title,
                        Song = songDataURL,

                    };
                    albumUserViewModel.album_songs.Add(songForUserAlbumViewModel);
                }

                albumUserViewModel.Img = imgDataURL;
                albumUserViewModel.Title = albums[i].Title;
                albumUserViewModel.Author = albums[i].Author;

                albumUserViewModels.Add(albumUserViewModel);
            }
            return Json(albumUserViewModels);
        }
    }
}
