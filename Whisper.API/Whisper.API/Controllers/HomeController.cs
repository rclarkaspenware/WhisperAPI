﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.IO;
using System.Text;
using System.Web.Script.Serialization;
using Whisper.API.Utilities;

namespace Whisper.API.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your quintessential app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your quintessential contact page.";

            return View();
        }
        public ActionResult Test()
        {
            ViewBag.Message = "Api test page.";

            return View();
        }

        public ActionResult OAuthTest()
        {
            const string username = "jhNXTprof";
            const string password = "jhNXTprof";

            var accessToken = PearsonApiUtilities.GetOauthAccessToken(username, password);

            ViewBag.OAuthResult = accessToken;
            ViewBag.MeCoursesResult = PearsonApiUtilities.XAuthApiCall(accessToken, "http://m-api.ecollege.com/me/courses");
            ViewBag.CourseDetails = PearsonApiUtilities.XAuthApiCall(accessToken, "https://m-api.ecollege.com/courses/3312999");

            return View();
        }



    }
}
