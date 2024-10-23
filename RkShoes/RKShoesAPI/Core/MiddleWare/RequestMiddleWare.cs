using RKShoesAPI.Core.Net;
using RKShoesAPI.Models.Entities;

namespace RkShoesAPI.Core.Middleware
{
    /// <summary>
    /// RequestMiddleWare 
    /// </summary>
    public class RequestMiddleWare
    {
        #region Private

        private readonly RequestDelegate _next;
        private readonly IHttpContextAccessor _httpAccessor;
        private readonly IHostEnvironment _environment;
        private readonly IConfiguration _configuration;

        #endregion Private

        #region Contructor
        public RequestMiddleWare(RequestDelegate next, IHttpContextAccessor httpAccessor, IHostEnvironment environment, IConfiguration configuration)
        {
            _next = next;
            _httpAccessor = httpAccessor;
            _environment = environment;
            _configuration = configuration;
        }

        #endregion Contructor

        #region public method
        public async Task Invoke(HttpContext context)
        {
            if (AppHttpContext.Current != null && AppHttpContext.Current.Items != null)
            {
                IDictionary<object, object?>? items = AppHttpContext.Current.Items;

                if (!items.ContainsKey(AppDbContext.HTTP_CONTEXT_KEY))
                {
                    // DB Context
                    items.Add(AppDbContext.HTTP_CONTEXT_KEY, new AppDbContext(Environment.GetEnvironmentVariable(AppDbContext.ENVIROMENT_KEY)!));
                }
            }

            await _next(context);
            // DBContext Dispose
            if (AppHttpContext.Current != null && AppHttpContext.Current.Items != null)
            {
                IDictionary<object, object?>? items = AppHttpContext.Current.Items;

                if (items.ContainsKey(AppDbContext.HTTP_CONTEXT_KEY))
                {
                    // DB Context
                    AppDbContext dbContext = (AppDbContext)items[AppDbContext.HTTP_CONTEXT_KEY]!;
                    dbContext?.Dispose();
                    items.Remove(AppDbContext.HTTP_CONTEXT_KEY);
                }
            }
        }

        #endregion public method
    }

    /// <summary>
    /// Requestミドルウェア拡張
    /// </summary>
    public static class RequestMiddleWareExtensions
    {
        #region public method

        /// <summary>
        /// ミドルウェア構成用
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseRequestMiddleWare(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestMiddleWare>();
        }

        #endregion public method
    }
}