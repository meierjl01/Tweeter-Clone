import Backbone from 'backbone';

//have what all people can see in the nav
//if logged in, can see some options (notes, write new note)
//if not logged in, can't see those options, can see others (log in, register)

export default Backbone.View.extend({
    tagName: 'nav',
    template() {
        let data = ``;
        if (this.model.get('user-token')) {
            data += `
          <a href="#myprofile">My Profile</a>
          <a href="#notes">All QuikNotes</a>
          <input type="button" id="logout" value="Log Out">
      `;
        } else {
            data += `
          <a href="#login">Log In</a>
          <a href="#register">Register Now</a>
      `;
        }
        return data;
    },
    render() {
        this.$el.append(this.template());
    },
    events: {
        'click #logout': 'logOut'
    },
    logOut(e) {
        this.model.logout();
    }
});
