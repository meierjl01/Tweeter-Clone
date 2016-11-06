import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.View.extend({
  template() {
    return `
      <img id="pic" src="../../assets/images/pic.jpg">
      <h3 id="email">${this.model.get('email')}</h3>
      <h4 id="member-since">Member since: ${this.model.get('created')}</h4>
    `;
  },
  className: 'profile-info',
  render(){
    console.log(this.model);
    this.$el.append(this.template());
  }
});
