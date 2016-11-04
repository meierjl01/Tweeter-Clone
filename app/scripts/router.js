import Backbone from 'backbone';
import $ from 'jquery';
import secret from './config';
import Notes from './collections/notes';
import Note from './models/note';
import Session from './models/session';
import Login from './views/login';
import renderRegister from './views/register';
import NewNote from '/.views/newnote';
import Nav from './views/nav';
import NavContainer from './views/navview';

let session = new Session();
let note = new Note();
let container = $('.container');

$(document).ajaxSend((evt, xhr, opts) => {
    console.log('ajaxSend', opts);
    xhr.setRequestHeader('application-id', config.appId);
    xhr.setRequestHeader('secret-key', config.secret);
    xhr.setRequestHeader('application-type', 'REST');
    xhr.setRequestHeader('user-token', session.get('user-token'));
});

const Router = Backbone.Router.extend({
    routes: {
        '': 'login',
        'register': 'register',
        'notes': 'notes',
        'notes/create': 'createNote'
    },
    protectedRoute() {
        if (session.get('user-token')) {
            return true;
        } else {
            this.navigate('login', {
                trigger: true
            });
            return false;
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
            container.append(renderRegister(session));
        }
    },
    notes() {
        if (this.protectedRoute()) {
            posts.fetch();
            container.empty();
            var notesList = new NotesList({
                collection: notes
            });
            var notesPage = new NavContainer({
                model: session,
                children: [notesList]
            });
            notesPage.render();
            container.append(notesPage.el);
        }
    },
    createNote() {
        if (this.protectedRoute()) {
            container.empty();
            var noteForm = new NoteForm({
                collection: notes
            });
            var newNotePage = new NavContainer({
                model: session,
                children: [noteForm]
            });
            newNotePage.render();
            container.append(newNotePage.el);
        }
    }
});

const router = new Router();
export default router;
