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

        var SeedModel = Backbone.Model.extend();
        var SeedExtended = Seed.extend();
        SeedModel.prototype = $.extend(SeedExtended.prototype, SeedModel.prototype);

        Seed.assimilate.apply(Backbone.View);
        var SeedView = Backbone.View.extend();
        var SeedExtended = Seed.extend();
        SeedView.prototype = $.extend(SeedExtended.prototype, SeedView.prototype);
    }
}).apply(this);
