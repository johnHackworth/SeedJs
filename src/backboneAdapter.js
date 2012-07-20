/*****
* BackboneAdapter.js
*
*
*/
(function() {
    UzClass.assimilate.apply(Backbone.Model);
}


var UzClassModel = Backbone.Model.extend();
var UzClassImp = UzClass.extend();
UzClassModel.prototype = $.extend(UzClassImp.prototype, UzClassModel.prototype);

UzClass.assimilate.apply(Backbone.View);
var UzClassView = Backbone.View.extend();
var UzClassImp = UzClass.extend();
UzClassView.prototype = $.extend(UzClassImp.prototype, UzClassView.prototype);
