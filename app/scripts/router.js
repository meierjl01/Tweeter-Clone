import Backbone from 'backbone';
import $ from 'jquery';
import secret from './config';
import Notes from './collections/notes';
import Note from './models/note';
import Session from './models/session';
import Login from './views/login';
import renderRegister from './views/register';
import NewNote from './views/newnote';
import Nav from './views/nav';
import NavContainer from './views/navview';
import NotesList from './views/allnotes';
import Home from './views/home';

let session = new Session();
let note = new Note();
let notes = new Notes();
let container = $('.container');

$(document).ajaxSend((evt, xhr, opts) => {
    // console.log('ajaxSend', opts);
    xhr.setRequestHeader('application-id', secret.appId);
    xhr.setRequestHeader('secret-key', secret.secret);
    xhr.setRequestHeader('application-type', 'REST');
    xhr.setRequestHeader('user-token', session.get('user-token'));
});

const Router = Backbone.Router.extend({
    routes: {
        ''          : 'home',
        'login'     : 'login',
        'register'  : 'register',
        'notes'     : 'notes',
        'myprofile' : 'profile',

    },
    protectedRoute() {
        if (session.get('user-token')) {
            return true;
        } else {
            this.navigate('', {
                trigger: true
            });
            return false;
        }
    },

    home() {
      if (session.get('user-token')) {
        this.navigate('notes', {
          trigger: true
        });
      } else {
        container.empty();
        let homeForm = new Home({
        });
        var homePage = new NavContainer({
          model: session,
          children: [homeForm]
        });
        homePage.render();
        container.append(homePage.el);
      }
    },

    login() {
        if (session.get('user-token')) {
            this.navigate('notes', {
                trigger: true
            });
        } else {
            container.empty();
            let loginForm = new Login({
                session: session,
                router: this,
                model: session
            });
            var loginPage = new NavContainer({
                model: session,
                children: [loginForm]
            });
            loginPage.render();
            container.append(loginPage.el);
        }
    },

    register() {
        if (session.get('user-token')) {
            this.navigate('notes', {
                trigger: true
            });
        } else {
            container.empty();
            let registerForm = new renderRegister({
                session: session,
                router: this,
                model: session
            });
            var registerPage = new NavContainer({
                model: session,
                children: [registerForm]
            });
            registerPage.render();
            container.append(registerPage.el);
        }
    },
    notes() {
        if (this.protectedRoute()) {
            container.empty();
            notes.fetch();
            // this.navigate('notes', {trigger: true});
            var noteForm = new NewNote({
                collection: notes,
                model: session,
                session: session,
                router: this
            });
            var notesPage = new NavContainer({
                model: session,
                children: [noteForm, new NotesList({
                    collection: notes
                })]
            });
            console.log(session);
            notesPage.render();
            container.append(notesPage.el);
        }
    },
    profile() {
        if (this.protectedRoute()) {
            container.empty();

        }
    }
});

const router = new Router();
export default router;
