using EPMusic2._0.Models;
using EPMusic2._0.Parser;
using Microsoft.AspNetCore.Mvc;
using ImageMagick;


namespace EPMusic2._0.Controllers
{
    [ApiController]
    [Route("Home")]
    public class HomeController : Controller
    {
        ApplicationContext db;
        private readonly ILogger<HomeController> _logger;
        public HomeController(ApplicationContext context, ILogger<HomeController> logger)
        {
            this.db = context;
            _logger = logger;
        }


        [HttpGet]
        public IActionResult Index()
        { 
            return View();
        }


        [HttpGet("addsong")]
        public IActionResult AddSong()
        {
            return View();
        }


        [HttpGet("addalbum")]
        public IActionResult AddAlbum()
        {
            return View();
        }


        /*Добавление плейлиста БэндКамп в БД*/
        [HttpPost("addsong")]
        public IActionResult AddSong(IFormCollection form)
        {
            AlbumsBandCamp albumsBandCamp = new AlbumsBandCamp();
            Song song = new Song();
            /*добавить инпуты и сохранить значения*/
            albumsBandCamp.Title = "";
            albumsBandCamp.Author = "";
            albumsBandCamp.Img = "";


            for (int i = 0; i < form.Count; i++)
            {
                Url url = new Url();
                url.url = form[$"url{i}"];

                if(url.url != "") 
                {
                    bandcamp_song_parser parser = new bandcamp_song_parser();
                    
                   
                    song.Title = parser.GetTitle(url.url);
                    song.Album = parser.GetAlbum_title(url.url);
                    song.Author = parser.GetAutor(url.url);
                    song.Song_link = parser.GetSongLink(url.url);
                    song.Img_link = parser.GetImg_link(url.url);
                    

                    albumsBandCamp.album_songs.Add(song);
                    db.Songs.Add(song);
                    // сохраняем в бд все изменения
                    db.SaveChanges();
                };
            }


            db.AlbumsBandCamp.Add(albumsBandCamp);
            db.SaveChanges();
            return Ok("Альбом добавлен");
        }


        /*Добавление пользовательского альбома в БД*/
        [HttpPost("addalbum")]
        public IActionResult AddAlbum(IFormCollection form)
        {
            /*Созддание альбомааа*/
            AlbumUser album = new AlbumUser();
            /*Получение обложки*/
            var file_img = form.Files[0];
            if (file_img == null || file_img.Length == 0)
            {
                return Content("ошибка!");
            }
            byte[] data_img;
            using(var br = new BinaryReader(file_img.OpenReadStream()))
                data_img = br.ReadBytes((int)file_img.OpenReadStream().Length);
            /*Запись песен*/
            for(int i = 1; i <= (form.Files.Count)-1; i++)
            {
                var file_song = form.Files[i];
                if (file_song == null || file_song.Length == 0)
                {
                    return Content("ошибка!");
                }
                byte[] data_song;
                using (var br = new BinaryReader(file_song.OpenReadStream()))
                    data_song = br.ReadBytes((int)file_song.OpenReadStream().Length);
                int title_num = i - 1;
                SongForUserAlbum SongForUserAlbum = new SongForUserAlbum
                {
                    Title = form[$"audio_title{title_num}"],
                    Song = data_song,
                };
                album.album_songs.Add(SongForUserAlbum);
                db.SongForUserAlbums.Add(SongForUserAlbum);
                db.SaveChanges();
            }
            /*Заполнение альбомааа инф*/
            album.Title = form["Title"];
            album.Author = form["Author"];
            album.Img = data_img;
            /*Сэйв в БД*/
            var album_status = false;

            foreach (var s in db.AlbumUser)
            {
                if (s.Title == album.Title && s.Author == album.Author)
                {
                    album_status = true;
                }
            }
            if (album_status == false)
            {
                db.AlbumUser.Add(album);
                db.SaveChanges();
                return Ok("Альбом сохранён");
            }
            return Ok("Альбом существует");
        }
    }
}






    
    
