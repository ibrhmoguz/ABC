using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using Moq;

namespace WLC.UnitTest
{
    public class ControllerMockHelper
    {
        public static ControllerContext FakeControllerContext()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            mockControllerContext.SetupGet(x => x.HttpContext.Session["CurrentUserId"]).Returns("ibrahimoguz");
            return mockControllerContext.Object;
        }

        public static ControllerContext FakeControllerContextNullSession()
        {
            var mockControllerContext = new Mock<ControllerContext>();
            mockControllerContext.SetupGet(x => x.HttpContext.Session["CurrentUserId"]).Returns(null);
            return mockControllerContext.Object;
        }
    }
}
