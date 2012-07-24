/*****
* BackboneAdapter.js
*
* Creates a SeedModel and SeedView classes that are direct extensions
* of Backbone.Model and Backbone.View, with all the Seed.js improvements
* added.
*/

(function() {
    var µ;

    if(typeof window != "undefined") {
        µ = window;
    } else if (typeof exports != "undefined") {
        µ = exports;
    } else {
        throw ('SeedJs need to be loaded on a browser or node');
    }

    if (Backbone && µ.Seed) {
        µ.Seed.assimilate.apply(Backbone.Model);
        µ.SeedModel = µ.Seed.marry(Backbone.Model).extend();

        // Seed.assimilate.apply(Backbone.View);
        // window.SeedView = Backbone.View.marry(Seed).extend();
    }
}).apply(this);
