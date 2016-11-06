import Backbone from 'backbone';
import $ from 'jquery';
import secret from './config';
import Notes from './collections/notes';
import Note from './models/note';
import Session from './models/session';
import Login from './views/login';
import NoteItem from './views/noteitem';
import renderRegister from './views/register';
import NewNote from './views/newnote';
import Nav from './views/nav';
import NavContainer from './views/navview';
import NotesList from './views/allnotes';
import Home from './views/home';
import ProfileInfoView from './views/profileview';
import ProfileNotesView from './views/profilenotesview';
// import CreateProfile from '.views/createprofile';

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
            // console.log(session);
            notesPage.render();
            container.append(notesPage.el);
        }
    },
    profile() {
        if (this.protectedRoute()) {
            container.empty();
            notes.fetch();
        }
    //need session for profile information -- how long they've been a user and their email
        let profileInfo = new ProfileInfoView({
            model: session,
        });

    //need session and notes for the user's notes to show up
        let noteitem = new NoteItem ({
            collection: notes,
            model: session,
            router: this
        });

    //combine both and also add nav
        let userProfile = new NavContainer({
          model: session,
          children: [profileInfo, noteitem, new ProfileNotesView({collection: notes})]
        });
        userProfile.render();
        container.append(userProfile.el);
    }
});

const router = new Router();
export default router;
