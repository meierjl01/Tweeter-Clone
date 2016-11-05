import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.View.extend({
  tagName: 'form',
  className: 'profile',
  template() {
    return `
    <h2>My Profile</h2>
    <input type="text" id ="name" name="name" value="Name">
    <input type="text" id="nickname" name="nickname" value="Nickname">
    <input type="text" id="quote" name="quote" value="Favorite Quote">
    <input type="text" id="tvshow" name="show" value="Favorite TV Show">
    <input type="text" id="movie" name="movie" value="Favorite Movie">
    <input type="text" id="food" name="food" value="Favorite Food">
    <input type="text" id="band" name="band" value="Favorite Band">
    <textarea name="about" rows="20" cols="10">About Me</textarea>
    <input type="submit" name="name" value="Publish">
    `;
  },
  render(){
    this.$el.append(this.template());
  },
  events: {
    'submit': 'publish'
  },
  publish(e) {
    e.preventDefault();
    const
  }
});
