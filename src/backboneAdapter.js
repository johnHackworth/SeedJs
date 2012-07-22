/*****
* BackboneAdapter.js
*
* Creates a SeedModel and SeedView classes that are direct extensions
* of Backbone.Model and Backbone.View, with all the Seed.js improvements
* added.
*/

(function() {
    if (Backbone && Seed) {
        Seed.assimilate.apply(Backbone.Model);
        window.SeedModel = Seed.marry(Backbone.Model).extend();

        // Seed.assimilate.apply(Backbone.View);
        // window.SeedView = Backbone.View.marry(Seed).extend();
    }
}).apply(this);
