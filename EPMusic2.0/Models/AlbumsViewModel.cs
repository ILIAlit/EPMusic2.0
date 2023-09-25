namespace EPMusic2._0.Models
{
    public class AlbumsViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Img { get; set; }
        public string Author { get; set; }
        public List<SongForAlbumsViewModel> album_songs { get; set; } = new List<SongForAlbumsViewModel>();
    }
}
