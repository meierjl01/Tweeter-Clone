import $ from 'jquery';
import Backbone from 'backbone';

//initialize opts to define session

const renderRegister = Backbone.View.extend({
    tagName: 'form',
    className: 'register',
    template() {
        return `
        <h2>Welcome to QuikNote!</h2>
        <div>Please register below</div>
        <input id="email" type="email" placeholder="Your Email">
        <div><input id="password" type="password" placeholder="Your Password"></div>
        <div><input id="confirmPassword" type="password" placeholder="Confirm Password"></div>
        <input id="register" type="submit" value="Register Now">
    `;
    },
    render() {
        this.$el.empty();
        this.$el.append(this.template());
    },
    events: {
        'submit': 'register'
    },

//ask Jess about event handler here (if statement)
//where to put function in that will verify password


    register(e) {
        e.preventDefault();
        const email = this.$('#email').val();
        const password = this.$('#password').val();
        const confirmPassword = this.$('#confirmPassword').val();
        console.log('test');
        if (session.validatePassword(password, confirmPassword)) {
            session.register(email, password);
        } else {
            alert('Your passwords do not match');
        }
        this.model.register(email, password);
    }
});

export default renderRegister;
