import Backbone from 'backbone';
import Nav from './nav';

export default Backbone.View.extend({
    initialize(opts) {
        this.children = opts.children;
    },
    render() {
        var nav = new Nav({
            model: this.model
        });
        nav.render();
        this.$el.append(nav.el);
        this.children.forEach((child, i, arr) => {
            //remember to do one for colleciton and one for model, just in case -- ask for clarification about this from Jess as to why
            if (child.collection) {
                child.collection.on('update', () => {
                    child.render();
                });
            }
            if (child.model) {
                child.model.on('change', () => {
                    child.render();
                });
            }
            child.render();
            this.$el.append(child.el);
        });
    }
});
