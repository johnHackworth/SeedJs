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
        Seed = window.Seed;
    } else if (typeof exports != "undefined") {
        µ = exports;
        ImportedSeed = require('./seed.js');
        Seed = ImportedSeed.Seed;
        Backbone = require('backbone');
    } else {
        throw ('SeedJs need to be loaded on a browser or node');
    }
    if (Backbone && Seed) {
        Seed.assimilate.apply(Backbone.Model);
        µ.SeedModel = Backbone.Model.extend();
        var classImplementation = Seed.extend();
        µ.SeedModel.prototype = $.extend(true, classImplementation.prototype, µ.SeedModel.prototype);


        Seed.assimilate.apply(Backbone.View);
        µ.SeedView = Backbone.View.extend();
        var viewImplementation = Seed.extend();
        µ.SeedView.prototype = $.extend(true, viewImplementation.prototype, µ.SeedView.prototype);

    }
}).apply(this);
