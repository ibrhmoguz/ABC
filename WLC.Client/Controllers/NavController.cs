using WLC.Client.Infrastructure.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WLC.Client.Controllers
{
    [SessionExpireFilter]
    public class NavController : Controller
    {
        public PartialViewResult Menu()
        {
            return PartialView();
        }
    }
}