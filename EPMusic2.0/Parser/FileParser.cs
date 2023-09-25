using EPMusic2._0.Models;


namespace EPMusic2._0.Parser
{
   /* public class FileParser
    {


        *//*//public List<Album> albums = new List<Album>{};
        public List<Song> allSongs = new List<Song>();


        public void GetAlbums()
        {
            string[] allsong_link = Directory.GetFiles(@"D:\МУЗЫКА\", "*.mp3", SearchOption.AllDirectories);
            for (int i = 0; i < allsong_link.Length; i++)
            {
                var file = TagLib.File.Create(allsong_link[i]);
                var song = new Song()
                {
                    Album = file.Tag.Album,
                    Author = String.Join(",", file.Tag.Performers),
                    Title = file.Tag.Title,
                    Song_link = allsong_link[i],
                    Id = i + 1
                };
                allSongs.Add(song);
            }
            var albums_group = (from song in allSongs group song by song.Album).ToList();
            for (int i = 0; i < albums_group.Count; i++)
            {
                albums.Add(new Album());
                albums[i].Title = albums_group[i].Key;
                for (int j = 0; j < albums_group[i].ToList().Count; j++)
                {
                    albums[i].album_songs.Add(albums_group[i].ToList()[j]);
                }
            }


           *//* foreach (var a in albums_group)
            {
                foreach (var song in a)
                    Console.WriteLine(song.Title);
            }*//*
        }
    }*/
}
