import $ from 'jquery';

const renderRegister = Backbone.View.extend({
    tagname: 'form',
    template() {
        return `
        <input id="email" type="email" placeholder="Your Email">
        <input id="password" type="password" placeholder="Your Password">
        <input id="confirmPassword" type="password" placeholder="Confirm Password">
        <input id="register" type="submit" value="Register Now">
    `
    },
    render() {
        this.$el.empty();
        this.$el.append(this.template());
    },
    events: {
        'submit #confirmPassword': 'register'
    },

//ask Jess about event handler here (if statement)
//where to put function in that will verify password


    register(e) {
        e.preventDefault();
        const email = this.$('#email').val();
        const password = this.$('#password').val();
        const confirmPassword = this.$('#confirmPw').val();
        if (session.validatePassword(password, confirmPassword)) {
            session.register(email, password);
        } else {
            alert('Your passwords do not match');
        }
        this.model.login(email, password);
    },
});

export default renderRegister;
