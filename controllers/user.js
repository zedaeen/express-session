const { User } = require("../models");
const { compare } = require("../helper/bcrypt");

class Controller {
  static showUsers(req, res) {
    User.findAll()
      .then(users => res.render("user", { users }))
      .catch (err => res.send(err.message));
  }

  static registerForm(req, res) {
    const { error } = req.session
    delete req.session.error
    res.render("register", { error });
  }

  static register(req, res) {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      req.session.error = 'Password Not Match'
      return res.redirect("/users/register")
    }
    const newUser = { username, email, password };
    User.create(newUser)
      .then(result => res.redirect("/users"))
      .catch(err => {
        req.session.error = err.message
        res.redirect("/users/register")
      })
  }

  static loginForm(req, res) {
    const { error } = req.session
    delete req.session.error
    res.render("login", { error })
  }

  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: { email }
    })
      .then(result => {
        if (result) {
          if (compare(password, result.password)) {
            req.session.isLogin = true
            res.redirect("/users")
          } else {
            req.session.error = "wrong email/password"
            res.redirect("/users/login")
          }
        } else {
          req.session.error = "wrong email/password"
          res.redirect("/users/login")
        }
      })
      .catch(err => {
        req.session.error = err.message
        res.redirect("/users/login")
      })
  }

  static logout(req, res) {
    delete req.session.isLogin
    res.redirect("/users/login")
  }
}

module.exports = Controller;