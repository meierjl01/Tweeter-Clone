import $ from 'jquery';
import Backbone from 'backbone';
import noteItem from './noteitem';
import Notes from '../collections/notes';

export default Backbone.View.extend({
  tagName: 'ul',
  className: 'note-list',
  render(){
    this.$el.empty();
    this.collection.forEach((note, i, arr) => {
      let listItem = new noteItem({model: note});
      listItem.render();
      this.$el.prepend(listItem.el);
    });
  }
});
