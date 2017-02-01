using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WLC.Client.Infrastructure.Abstract;
using WLC.Domain.Interface;
using WLC.Client.Models;
using WLC.Domain.Entities;
using Newtonsoft.Json;

namespace WLC.Client.Controllers
{
    public class AccountController : Controller
    {
        IAuthProvider authProvider;
        IKullaniciRepo kullaniciRepo;
        public AccountController(IAuthProvider auth, IKullaniciRepo kr)
        {
            this.authProvider = auth;
            this.kullaniciRepo = kr;
        }

        [HttpGet]
        [AllowAnonymous]
        public ViewResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var kullanici = kullaniciRepo.Kullanicilar.FirstOrDefault(x => x.KullaniciAdi.Equals(model.KullaniciAdi) && x.Sifre.Equals(model.Sifre));
                if (kullanici != null)
                {
                    authProvider.Authenticate(model.KullaniciAdi, model.Sifre);
                    Session["CurrentUserName"] = kullanici.KullaniciAdi;
                    Session["CurrentUserName_SurName"] = kullanici.Adi + " " + kullanici.Soyadi;
                    Session["CurrentUserId"] = kullanici.KullaniciId;
                    return Redirect(returnUrl ?? Url.Action("Index", "Default"));
                }
                else
                {
                    ModelState.AddModelError("", "Kullanıcı adı veya parola hatalı!");
                    return View();
                }
            }
            else
            {
                return View();
            }
        }

        [AllowAnonymous]
        public ActionResult LogOut()
        {
            Session.Clear();
            authProvider.SignOut();
            return RedirectToAction("Login", "Account", null);
        }

        [AllowAnonymous]
        public string IsAuthenticated()
        {
            if (Request.IsAuthenticated)
            {
                return JsonConvert.SerializeObject("Success");
            }
            else
            {
                return JsonConvert.SerializeObject("Fail");
            }
        }
    }
}
