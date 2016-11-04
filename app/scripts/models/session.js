import Backbone from 'backbone';
import $ from 'jquery';
import secret from '../config';
import router from '../router';

export default Backbone.Model.extend({
    initialize() {
        if (window.localStorage.getItem('user-token')) {
            this.set('user-token', window.localStorage.getItem('user-token'));
        }
    },
    idAttribute: 'objectId',
    defaults: {
        username: '',
        email: '',
        'user-token': ''
    },
    validatePassword(password, confirmPassword) {
        if (password.trim() && pw === confirmPassword) return true;
        return false;
    },
    register(email, password) {
        this.save({
            email,
            password
        }, {
            url: 'https://api.backendless.com/v1/user/register',
            success: () => {
                this.login(email, password);
                router.navigate('notes', {
                    trigger: true
                });
            }
        });
    },
login(email, password) {
  this.save({login: email,password},
    {
      url: 'http://api.backendless.com/v1/user/login',
      success: (response) => {
        this.set(response);
        router.navigate('notes', {trigger: true});
      },
      error: () => {
        console.log('login did not work');
      }
    }
  );
}

});
