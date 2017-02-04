using System;
using System.Web;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WLC.Client.Controllers;
using WLC.Domain.Interface;

namespace WLC.UnitTest_Server
{
    [TestClass]
    public class DefaultControllerTest
    {
        [TestMethod]
        public void ShouldRedirectToLoginView()
        {
            var wlcTanimRepo = new Mock<IWLCTanimRepo>();
            var kullaniciYapilanAp = new Mock<IKullaniciYapilanAp>();
            var controller = new DefaultController(wlcTanimRepo.Object, kullaniciYapilanAp.Object);

            controller.ControllerContext = ControllerMockHelper.FakeControllerContextNullSession();

            var result = controller.Index();
            Assert.IsInstanceOfType(result, typeof(RedirectToRouteResult));
        }

        [TestMethod]
        public void ShouldReturnView()
        {
            var wlcTanimRepo = new Mock<IWLCTanimRepo>();
            var kullaniciYapilanAp = new Mock<IKullaniciYapilanAp>();
            var controller = new DefaultController(wlcTanimRepo.Object, kullaniciYapilanAp.Object);

            controller.ControllerContext = ControllerMockHelper.FakeControllerContext();

            var result = controller.Index();
            Assert.IsInstanceOfType(result, typeof(ActionResult));
        }
    }
}
