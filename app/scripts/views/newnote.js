import Backbone from 'backbone';

//how to add person's username to their notes?

export default Backbone.View.extend({
    tagName: 'form',
    template() {
        return `
      <textarea id="body" placeholder="Write Your Note Here..."></textarea>
      <input type="submit" value="Publish">
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
      const body = this.$('#body').val();
      const email = this.model.get('email');
      this.collection.create({body, email});
    }
});
