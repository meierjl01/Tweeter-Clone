import $ from 'jquery';
import Backbone from 'backbone';
import moment from 'moment';

export default Backbone.View.extend({
  tagName: 'li',

  template(){
    return `
      <div>${this.model.get('email')} said:</div>
      <p>${this.model.get('body')}</p>
    `;
  },
  render(){
    this.$el.append(this.template());
    if (this.model.get('ownerId') === window.localStorage.ownerId) {
      this.$el.append(`<button id="delete">Delete</button`);
    }
  },
  events: {
    'click #delete' : 'delete'
  },
  delete() {
    this.model.distroy();
  }
});
