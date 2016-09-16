using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Uniforms.Startup))]
namespace Uniforms
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
