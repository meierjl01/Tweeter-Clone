import Backbone from 'backbone';
import $ from 'jquery';
import Notes from '../collections/notes';
import noteItem from './noteitem';
import Note from '../models/note';


export default Backbone.View.extend({
  tagName: 'ul',
  className: 'profile-notes',
  render(){
    this.collection.filter((note, i, arr) =>{
      if(note.get('ownerId') === window.locationStorage.ownerId){
          let noteitem = new noteItem({model: note});
          noteitem.render();
          this.$el.append(noteitem.el);
          return true;
      }
    });
  }
});
