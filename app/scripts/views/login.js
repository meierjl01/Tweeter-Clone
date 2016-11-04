import Backbone from 'backbone';
import $ from 'jquery';

const Login = Backbone.View.extend({
  tagName: 'form',
  template() {
    return `
        <input id="email" placeholder="Email">
        <input id="password" placeholder="Password">
        <input id="login" type="submit" value="Log In">
        <div>${this.model.get('errorMessage') || ''}</div>
    `
  },
  render() {
    this.$el.empty();
    this.$el.empty(this.template());
  },
  events: {
    'submit': 'login'
  },
  login(e) {
    e.preventDefault();
    const email = this.$('#email').val();
    const password = this.$('#password').val();
  },
});

export default Login;
