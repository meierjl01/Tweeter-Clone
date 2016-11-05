import Backbone from 'backbone';

export default Backbone.View.extend({
  className: 'home',
  template() {
    let home = `
        <h1>Welcome to QuikNotes!</h1>
        <div>
        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
        </div>
    `;
  return home;
},
render() {
  this.$el.append(this.template());
}
});
