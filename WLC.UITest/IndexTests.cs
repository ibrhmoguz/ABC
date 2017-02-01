﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using OpenQA.Selenium;
using Protractor;

namespace WLC.UITest
{
    public class IndexTests
    {
        private IWebDriver driver;

        [SetUp]
        public void SetUp()
        {
            // Using NuGet Package 'PhantomJS' (Headless browser testing for build servers)
            //driver = new OpenQA.Selenium.PhantomJS.PhantomJSDriver();

            // Using NuGet Package 'WebDriver.ChromeDriver.win32'
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
            ngDriver.Navigate().GoToUrl("http://localhost:5485/#/Default/Liste");
            // Assert navigation items
            Assert.AreEqual("<i class=\"fa fa - search\"></i> Okul Listesi", ngDriver.FindElement(By.Id("masterTitle")).Text);
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("Rapor")).Displayed);
        }

        [Test]
        public void RaporlamaMenuItem()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:5485/#/Rapor");

            // Assert navigation items
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("Sorgulama")).Displayed);
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("Rapor")).Displayed);
        }

    }
}
