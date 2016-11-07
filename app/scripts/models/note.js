import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: 'objectId',
    defaults: {
      email: '',
      body: '',
      created: '',
    },
    delete() {
      this.destroy();
    }
});
