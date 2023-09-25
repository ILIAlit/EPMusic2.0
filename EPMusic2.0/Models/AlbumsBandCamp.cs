namespace EPMusic2._0.Models
{
    public class AlbumsBandCamp
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Img { get; set; }
        public string Author { get; set; }
        public List<Song> album_songs { get; set; } = new List<Song>();
    }
}
