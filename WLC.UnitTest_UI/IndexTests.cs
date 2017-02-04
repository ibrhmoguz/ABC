using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using OpenQA.Selenium;
using Protractor;

namespace WLC.UnitTest_UI
{
    public class IndexTests
    {
        private IWebDriver driver;

        [SetUp]
        public void SetUp()
        {
            driver = new OpenQA.Selenium.Chrome.ChromeDriver();
            driver.Manage().Timeouts().SetScriptTimeout(TimeSpan.FromSeconds(30));
        }

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
        }

        [Test]
        public void RedirectedLoginPage()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:5485/");

            // Assert navigation items
            Assert.IsTrue(ngDriver.Url.EndsWith(""));
        }

        [Test]
        public void IndexPage()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:5485/");

            // Assert navigation items
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("Sorgulama")).Displayed);
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("Rapor")).Displayed);
        }

        [Test]
        public void SorgulamaMenuItem()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:5485/Account/Login?ReturnUrl=_Default/Liste");
            // Assert navigation items
            Assert.AreEqual("Okul Listesi", ngDriver.FindElement(By.Id("masterTitle")).Text);
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("Rapor")).Displayed);
        }

        [Test]
        public void RaporlamaMenuItem()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:5485/Account/Login?ReturnUrl=_Default/Rapor");

            // Assert navigation items
            Assert.AreEqual("Raporlar", ngDriver.FindElement(By.Id("masterTitle")).Text);
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("Rapor")).Displayed);
        }

    }
}
