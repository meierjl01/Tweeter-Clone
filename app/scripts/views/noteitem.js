import $ from 'jquery';
import Backbone from 'backbone';

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
  }
});
