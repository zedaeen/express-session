const router = require("express").Router();
const controller = require("../controllers/user");

router.get("/",
  (req, res, next) => {
  if (req.session.isLogin) {
    next()
  } else {
    req.session.error = 'Not Authenticated'
    res.redirect("/users/login")
  }
},
  controller.showUsers);
router.get("/register", controller.registerForm);
router.post("/register", controller.register);
router.get("/login", controller.loginForm);
router.post("/login", controller.login);
router.get("/logout", controller.logout);

module.exports = router;