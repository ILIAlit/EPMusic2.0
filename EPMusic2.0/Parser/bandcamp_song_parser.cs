using EPMusic2._0.Models;
using System.Net;
using System.Text.RegularExpressions;
using HtmlAgilityPack;

namespace EPMusic2._0.Parser
{
    public class bandcamp_song_parser
    {
        public List<Song> Songs = new List<Song>();

        public string GetSongLink(string song_url)
        {
            string html = string.Empty;
            using (WebClient client = new WebClient())
            {
                html = client.DownloadString(song_url);

                Regex regex = new Regex(@"https:\/\/t4\.bcbits\.com\/stream\/\w+\/mp3-\d+\/\d+\?p=\d+&amp;ts=\d+&amp;t=\w+&amp;token=\d+_\w+");
                MatchCollection matches = regex.Matches(html);
                int i = 0;
                if (matches.Count > 0)
                {
                    return matches[0].Value;
                }
                else
                {
                    return null;
                }
            }

        }



        public string GetTitle(string song_url)
        {
            string html = string.Empty;
            using (WebClient client = new WebClient())
            {
                html = client.DownloadString(song_url);
            }
            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(html);

            HtmlNode tag_title = doc.DocumentNode.SelectSingleNode("//h2[@class='trackTitle']");

            string title = null;
            if (tag_title != null)
            {
                title = tag_title.InnerText;
            }
            else
            {
                return "Без названия";
            }
            return title;
        }



        public string GetAutor(string song_url)
        {
            string html = string.Empty;
            using (WebClient client = new WebClient())
            {
                html = client.DownloadString(song_url);
            }

            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(html);

            HtmlNode tag_title = doc.DocumentNode.SelectSingleNode("//span[@class='title']");

            string author = null;
            if (tag_title != null)
            {
                author = tag_title.InnerText;
            }
            else
            {
                return "Неизвестный исполнитель";
            }
            return author;
        }


        public string GetAlbum_title(string song_url)
        {
            string html = string.Empty;
            using (WebClient client = new WebClient())
            {
                html = client.DownloadString(song_url);
            }

            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(html);

            HtmlNode tag_title = doc.DocumentNode.SelectSingleNode("//span[@class='fromAlbum']");

            string title = null;
            if (tag_title != null)
            {
                title = tag_title.InnerText;
            }
            else
            {
                return "Без названия";
            }
            return title;
        }


        public string GetImg_link(string song_url)
        {
            string html = string.Empty;
            using (WebClient client = new WebClient())
            {
                html = client.DownloadString(song_url);
            }

            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(html);

            HtmlNode link = doc.DocumentNode.SelectSingleNode("//a[@class='popupImage']");

            string href = null;
            if (link != null)
            {
                href = link.GetAttributeValue("href", "");
            }
            else
            {
                return null;
            }
            return href;
        }





//"https://rookietown.bandcamp.com/track/sink"




    }
}
