using Microsoft.EntityFrameworkCore;
using RKShoesAPI.Core.Net;

namespace RKShoesAPI.Models.Entities
{
    public class AppDbContext : DbContext
    {

        public const string ENVIROMENT_KEY = "DBConnectString";
        public const string HTTP_CONTEXT_KEY = "DBContext.Instance";

        public AppDbContext(string connectionString) : base(new DbContextOptionsBuilder().UseSqlServer(connectionString).Options)
        {
        }
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public AppDbContext():base(new DbContextOptionsBuilder().UseSqlServer(Environment.GetEnvironmentVariable(ENVIROMENT_KEY)).Options)
        {

        }

        public static AppDbContext Instance
        {
            get
            {
                if (AppHttpContext.Current == null || AppHttpContext.Current.Items == null)
                {
                    return new AppDbContext();
                }

                IDictionary<object, object?>? items = AppHttpContext.Current.Items;
                if (!items.ContainsKey(HTTP_CONTEXT_KEY))
                {
                    items[HTTP_CONTEXT_KEY] = new AppDbContext();
                }
                if (items[HTTP_CONTEXT_KEY] is AppDbContext context)
                {
                    return context;
                }
                else
                {
                    items[HTTP_CONTEXT_KEY] = new AppDbContext();
                    return (AppDbContext)items[HTTP_CONTEXT_KEY]!;
                }
            }
        }
        #region properties
        public DbSet<Customer> UserAccounts => Set<Customer>();
        public DbSet<Product> Product { get;set; }
        public DbSet<Category> Category { get;set; }
        public DbSet<Brand> Brand { get;set; }
        public DbSet<ProductImage> ProductImage { get;set; }
        public DbSet<ProductSize> ProductSize { get;set; }
        public DbSet<Review> Reviews { get;set; }
        public DbSet<Favorite> Favorite { get;set; }
        public DbSet<Order> Orders { get;set; }
        public DbSet<OrderDetail> OrderDetail { get;set; }
        public DbSet<DeliveryAddress> DeliveryAddress { get; set; }
        public DbSet<Cart> Carts { get;set; }

        #endregion properties
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>()
                .HasKey(b => new {b.UserName });

            modelBuilder.Entity<Manager>()
                .HasKey(b => new { b.ManagerId });

            modelBuilder.Entity<Product>()
                .HasKey(b => new { b.ProId });

            modelBuilder.Entity<Brand>()
                .HasKey(b => new { b.BrandId });

            modelBuilder.Entity<Category>()
                .HasKey(b => new { b.CateId });

            modelBuilder.Entity<Cart>()
                .HasKey(b => new {b.CartId});

            modelBuilder.Entity<DeliveryAddress>()
                .HasKey(b => new { b.Id });

            modelBuilder.Entity<Favorite>()
                .HasKey(b => new { b.Id });

            modelBuilder.Entity<ImportProduct>()
                .HasKey(b => new { b.RecieptId });

            modelBuilder.Entity<Order>()
                .HasKey(b => new { b.OrderId });

            modelBuilder.Entity<OrderDetail>()
                .HasKey(b => new { b.Id });

            modelBuilder.Entity<ProductImage>()
                .HasKey(b => new { b.Id });

            modelBuilder.Entity<ProductSize>()
                .HasKey(b => new { b.Id });

            modelBuilder.Entity<ReceiptProduct>()
                .HasKey(b => new { b.Id });

            modelBuilder.Entity<Review>()
                .HasKey(b => new { b.ReviewId });

        }
    }
}
