import $ from 'jquery';
import Backbone from 'backbone';
import moment from 'moment';

export default Backbone.View.extend({
    tagName: 'li',

    template() {
        return `
      <img class="profile-pic" src="../../assets/images/pic.jpg">
      <div class="timestamp">On ${moment(this.model.get('timestamp')).format('MMMM Do YYYY')}, <span>${this.model.get('email')}</span> said:</div>
      <p class="body">${this.model.get('body')}</p>
    `;
    },
    render() {
        this.$el.append(this.template());
        if (this.model.get('ownerId') === window.localStorage.ownerId) {
            this.$el.append(`<button id="delete">Delete</button`);
            this.$el.append(`<button id="edit">Edit</button>`);
            this.$el.append(`<button id="save">Save</button>`);
        }
    },
    events: {
        'click #delete': 'delete',
        'click #edit': 'edit',
        'click #save' : 'save'
    },
    delete() {
        this.model.delete();
    },
    edit(e) {
        e.preventDefault();
        $('.body').attr('contenteditable', 'true');
        $('#save').show();
    },
    save(e) {
      e.preventDefault();
      const timestamp = new Date();
      const body = this.$('#body').val();
      const email = this.model.get('email');
      this.model.set({timestamp, body, email});
      $('.body').removeAttr('contenteditable');
    }
});
