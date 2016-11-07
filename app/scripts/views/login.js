import Backbone from 'backbone';
import $ from 'jquery';

const Login = Backbone.View.extend({
    tagName: 'form',
    className: 'login',
    template() {
        return `
        <h2>Welcome to QuikNote!</h2>
        <div>Please log in below</div>
        <input type="email" id="email" placeholder="Email">
        <div><input type="password" id="password" placeholder="Password"></div>
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
