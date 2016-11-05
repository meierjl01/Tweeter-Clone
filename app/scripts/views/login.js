import Backbone from 'backbone';
import $ from 'jquery';

const Login = Backbone.View.extend({
  tagName: 'form',
  template() {
    return `
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <input id="login" type="submit" value="Log In">
    `;
  },
  render() {
    this.$el.empty();
    this.$el.append(this.template());
  },
  events: {
    'submit': 'login'
  },
  login(e) {
    e.preventDefault();
    const email = this.$('#email').val();
    const password = this.$('#password').val();
    this.model.login(email, password);
  },
});

export default Login;
