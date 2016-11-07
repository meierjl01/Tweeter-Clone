import Backbone from 'backbone';

//how to add person's username to their notes?

export default Backbone.View.extend({
    tagName: 'form',
    template() {
        return `
      <h1>QuikNotes <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
</h1>
      <h3>Add a new QuikNote:</h3>
      <textarea id="body" placeholder="Write Your Note Here..."></textarea>
      <input id="publish" type="submit" value="Publish">
    `;
  },
    render() {
      this.$el.append(this.template());
    },
    events: {
      'submit' : 'publish'
    },
    publish(e) {
      e.preventDefault();
      const timestamp = new Date();
      const body = this.$('#body').val();
      const email = this.model.get('email');
      this.collection.create({timestamp, body, email});
    }
});
