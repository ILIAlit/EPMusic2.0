namespace EPMusic2._0.Models
{
    public class AlbumUser
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public byte[] Img { get; set; }
        public string Author { get; set; }
        public List<SongForUserAlbum> album_songs { get; set; } = new List<SongForUserAlbum>();
    }
}
