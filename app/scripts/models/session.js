import Backbone from 'backbone';
import $ from 'jquery';
import secret from '../config';
import router from '../router';

export default Backbone.Model.extend({
    initialize() {
        if (window.localStorage.getItem('user-token')) {
            this.set('user-token', window.localStorage.getItem('user-token'));
            this.set('email', window.localStorage.getItem('email'));
        }
    },
    idAttribute: 'objectId',
    defaults: {
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
            url: 'https://api.backendless.com/v1/users/register',
            success: (response) => {
                this.login(email, password);
                router.navigate('notes', {
                    trigger: true
                });
            }
        });
    },
login(email, password) {
  this.save({login: email, password},
    {
      url: 'http://api.backendless.com/v1/users/login',
      success: (model, response) => {
        // this.set(response);
        console.log(response);
        console.log(response['user-token']);
        window.localStorage.setItem('user-token', response['user-token']);
        window.localStorage.setItem('email', response.email);
        router.navigate('notes', {trigger: true});
      },
      error: () => {
        console.log('login did not work');
      }
    }
  );
},

logout() {
  $.ajax({
    url: 'https://api.backendless.com/v1/users/logout',
    success: () => {
      this.clear();
      window.localStorage.clear();
      router.navigate('', {trigger: true});
    }
  });
}

});
