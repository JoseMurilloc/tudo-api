'use strict'

const User = use('App/Models/User')

class UserController {


  async checkUser ({ auth, response }) {
    try {
      return await auth.getUser();
    } catch (error) {
      response.send('You are not logged in');
    }
  }

  async login({ request, auth }) {
    const { email, password } = request.all();
    console.log(email, password);

    const token = await auth.attempt(email, password);

    return token;
  }


  async register({ request }) {

    const { email, password } = request.all();
    console.log(email, password);

    const user = await User.create({
      email,
      password,
      username: email,
    });

    return this.login(...arguments);
  }
}

module.exports = UserController
