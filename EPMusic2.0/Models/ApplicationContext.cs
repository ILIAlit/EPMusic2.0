using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace EPMusic2._0.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<AlbumsBandCamp> AlbumsBandCamp { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<AlbumUser> AlbumUser { get; set; }
        public DbSet<SongForUserAlbum> SongForUserAlbums { get; set; }

        /*public ApplicationContext()
        {
            
        }*/
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
        
    }
}
