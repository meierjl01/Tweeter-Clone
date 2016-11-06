import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.View.extend({
    tagName: 'form',
    className: 'profile',
    template() {
        return `
    <h2>My Profile</h2>
    <input type="text" id ="name" name="name" value="Name">
    <textarea id="about" name="about" rows="20" cols="10">About Me</textarea>
    <input type="submit" name="name" value="Publish">
    `;
    },
    render() {
        this.$el.append(this.template());
    },
    events: {
        'submit': 'publish'
    },
    publish(e) {
        e.preventDefault();
        const name = this.$('#name').val();
        const about = this.$('#about').val();

    }
});
