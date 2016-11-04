import Backbone from 'backbone';
import Note from '../models/note';


export default Backbone.Collection.extend({
  model: Note,
  url: 'https://api.backendless.come/v1/data/notes',
  parse(data){
    // console.log(data);
    return data.data;
  }
});
