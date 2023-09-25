using Microsoft.AspNetCore.Mvc;

namespace EPMusic2._0.Controllers
{
    public class RadioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
