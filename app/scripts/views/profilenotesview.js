import Backbone from 'backbone';
import $ from 'jquery';
import Notes from '../collections/notes';
import noteItem from './noteitem';
import Note from '../models/note';


export default Backbone.View.extend({
  tagName: 'ul',
  className: 'profile-notes',
  render(){
    this.$el.empty();
    this.collection.filter((note, i, arr) =>{
      if(note.get('ownerId') === window.localStorage.getItem('ownerId')) {
          let noteitem = new noteItem({model: note});
          noteitem.render();
          this.$el.prepend(noteitem.el);
          // return true;
      }
    });
  }
});
