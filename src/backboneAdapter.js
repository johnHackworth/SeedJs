/**********************************************************
  BackboneAdapter.js

  Creates a SeedModel and SeedView classes that are direct extensions
  of Backbone.Model and Backbone.View, with all the Seed.js improvements
  added.
  https://github.com/johnHackworth/SeedJs

  Author: Javi Alvarez
  <javieralvarezlop@gmail.com>
  http://twitter.com/johnhackworth

**********************************************************/

(function() {
    var µ;

    if (typeof window != 'undefined') {
        µ = window;
        Seed = window.Seed;
    } else if (typeof exports != 'undefined') {
        µ = exports;
        ImportedSeed = require('./seed.js');
        Seed = ImportedSeed.Seed;
        Backbone = require('backbone');
    } else {
        throw ('SeedJs need to be loaded on a browser or node');
    }
    if (typeof Backbone != 'undefined' && typeof Seed != 'undefined') {
        /**
        * This is a Model class derived from Backbone.Model, flavored with Seed functionality
        *
        * @class SeedModel
        * @constructor
        */
        Seed.assimilate.apply(Backbone.Model);
        µ.SeedModel = function(attributes, options) {
            Backbone.Model.apply(this, attributes, options);
            this.defaults = this.defaults || {};
            this.attributes = $.extend(true, {}, this.defaults, this.attributes, attributes);
        };
        Seed.assimilate.apply(µ.SeedModel);
        µ.SeedModel.prototype = $.extend(true, Seed.extend().prototype, Backbone.Model.prototype);

    //µ.SeedModel = Backbone.Model.marry(Seed).extend(); // Backbone.Model.marry(Seed).extend();
        // var classImplementation = Seed.extend();
        // µ.SeedModel.prototype = $.extend(true, classImplementation.prototype, Seed.prototype);

        /**
        * This is a View class derived from Backbone.View, flavored with Seed functionality
        *
        * @class SeedModel
        * @constructor
        */

        Seed.assimilate.apply(Backbone.View);
        µ.SeedView = Backbone.View.extend();
        var viewImplementation = Seed.extend();
        µ.SeedView.prototype = $.extend(true, viewImplementation.prototype, µ.SeedView.prototype);

    }
}).apply(this);
