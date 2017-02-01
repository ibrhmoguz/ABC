﻿using System;
using System.Web;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using WLC.Admin.Controllers;
using WLC.Domain.Interface;

namespace WLC.UnitTest
{
    [TestClass]
    public class DefaultControllerTest
    {
        [TestMethod]
        public void ShouldLoginView()
        {
            var wlcTanimRepo = new Mock<IWLCTanimRepo>();
            var kullaniciYapilanAp = new Mock<IKullaniciYapilanAp>();
            var controller = new DefaultController(wlcTanimRepo.Object, kullaniciYapilanAp.Object);

            controller.ControllerContext = ControllerMockHelper.FakeControllerNullContext();

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
