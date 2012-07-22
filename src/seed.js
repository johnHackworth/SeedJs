/**********************************************************
  SeedJs is a library that gives you the superpower of using
  classical inheritance in javascript. It gives you simulated
  classes, inheritance and parent-children relation between
  classes.
  Also, SeedJs is able to play nice with Backbone (at the very
  beggining, it was only a extension of the backbone inheritance
  system to change a little how it works), and its able to insert
  itself as an ancestor of backbone base classes, transforming
  the way you use backbone and its inheritance system in something
  more usable.

  https://github.com/johnHackworth/SeedJs

  Author: Javi Alvarez
  <javieralvarezlop@gmail.com>
  http://twitter.com/johnhackworth
***********************************************************/

(function() {

    this._parent = null;
    var cloner = null;

    // SeedJs has as a hard dependence on either pi.js
    // (Delivered with SeedJs) or jQuery
    // Right now, I'm going to let jQuery as default,
    // since, until we improve PiJs, it's more efficient.
    // _getCloner detects if jQuery or Pi are loaded and
    // assign the extend/clone functions
    var _getCloner = function() {
        var _cloner = null;
        if (window.jQuery) {
            _cloner = {
                extend: function(destinationObject, originObject) {
                    return jQuery.extend(true, destinationObject, originObject);
                },
                clone: function(clonable) {
                    return jQuery.extend(true, {}, clonable);
                }
            };
        } else if (window.pi) {
            _cloner = window.pi;
        } else {
            throw ('SeedJs needs either PiJs or jQuery');
        }
        return _cloner;
    }
    cloner = _getCloner();

    /**
    * This is the declaration of the global object containing
    * the base Seed class, which is parent of any other you
    * want to define
    *
    * @class Seed
    * @constructor
    */
    var Seed = window.Seed = function(attributes, options) {
        var defaults;
        if (options) {
            this.options = cloner.clone(options);
        }
        for (prop in this) {
            if (typeof this[prop] == 'object') {
                this[prop] = cloner.clone(this[prop]);
            }
        }

        this.initialize.apply(this, arguments);
    }

    /**
    * Constructor of the newly defined class.
    *
    * @method initialize
    * @param {Object} params Data of the new class
    */
    Seed.prototype.initialize = function(params) {
        this.options = cloner.clone(params);
    };

    /**
    * Changes the context of this and, if exits in the parent of
    * the current objects, calls the method
    *
    * @method parentMethod
    * @param {String} method Name of the method to be called
    * @param {Object} options Parameters of the called methos
    */
    Seed.prototype.parentMethod = function(method, options) {
        var result = null;
        options = options || {};

        if (this._parent != null) {
            var currentParent = this._parent;
            // we need to chante the parent of "this", because
            // since we are going to call the super method
            // in the context of "this", if the super method has
            // another call to super, we need to provide a way of
            // redirecting to the grandparent
            this._parent = currentParent._parent;

            // if this is the first iteration of the parentMethod recursion
            // it only has to call the method if the original call is part of the
            // own original object. If not, that first call has been already executed
            // at this point (because the prototype tree has resolved this first call as
            // member of the original object and now when we go up the tree we find
            // the same method again).
            // example:
            // X = Seed.extend({"say": function(){console.log('a')}})
            // Y = a.extend("say": function(){console.log('b');this.super('say');})
            // Z = b.extend()
            // if we create a instance of Z and call .say(), it will be resolved to the
            // .say method of X, but it will be called inside Z context. So the first time
            // .super is invoqued, 'this' will point to the instance of Z and ._parent would be
            // the same B. So in this kind of case, if we directly do ._parent.say(), we would
            // execute the same method we just have execute again. We need to skip it and let
            // the bubbling follow to X.say()
            if (!options.executeNextCall && this.isOwnProperty(method)) {
                options.executeNextCall = true;
            }

            // if the currently evaluated prototype owns this method and the executeNextCall
            // has been marked, we run the method of this prototype
            if (currentParent.isOwnProperty(method) && options.executeNextCall) {
                result = currentParent[method].call(this, options);
            }
            // if not, we evaluate the parent of the currently evaluated prototype
            else {

                // for all the next recursive calls, executeNextCall will always
                // be true, because they are not the first call.
                options.executeNextCall = true;
                result = currentParent.parent.call(this, method, options);
            }
            this._parent = currentParent;
        }
        return result;
    }


    /**
    * Check if a property is declared in the proto of this element
    *
    * @method isOwnProperty
    * @param {string} property
    * @return {boolean}
    */
    Seed.prototype.isOwnProperty = function(property) {
        if (this.__class__) {
            return this.__class__.hasOwnProperty(property)
        } else {
            return this.hasOwnProperty(property)
        }
    }

    /**
    * Copy the prototype and properties of the parent class
    * to a new class element element
    *
    * @method extend
    * @param {object} protoProperties
    * @param {object} classProps
    * @return {function} new class
    */
    var extend = function(protoProperties, classProps) {
        var child = inherits(this, protoProperties, classProps);
        child.extend = this.extend;
        child.prototype._parent = this.prototype;
        return child;
    };
    Seed.extend = extend;

    /**
    * Gives you a way to call the methods of the parent class
    *
    * @method parant
    * @method {string} method to be called, if falsy, the
    *   method returns a reference to parent prototype
    * @options {object} arguments passed to the called method
    */
    Seed.prototype.parent = function(method, options) {
        if (method) {
            return this.parentMethod(method, options);
        } else {
            return child.prototype._parent;
        }
    }
    /**
    * Empty constructor function to aid in prototype-chain creation.
    *
    * @function baseConstructor
    */
    var baseConstructor = function() {this.seedJs = true};

    /**
    * Create a new class object and copy the parent methods and
    * and attributes to it.
    *
    * @method inherits
    * @param {object} parent Seed we are extending
    * @param {object} protoProperties Attributes we are setting on the new class
    * @param {object} staticProperties
    */
    var inherits = function(parent, protoProperties, staticProperties) {
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProperties && protoProperties.hasOwnProperty('constructor')) {
            child = protoProperties.constructor;
        } else {
            child = function() {
                parent.call(this,
                    cloner.clone(protoProperties),
                    cloner.clone(staticProperties)
                );
            };
        }
        // Inherit class (static) properties from parent.
        child = cloner.extend(child, parent);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        baseConstructor.prototype = cloner.clone(parent.prototype);
        child.prototype = new baseConstructor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProperties) {
            child.prototype = cloner.extend(child.prototype, protoProperties);
        }

        // Add static properties to the constructor function, if supplied.
        if (staticProperties) {
            child = cloner.extend(child, staticProperties);
        }
        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // shortcut to element "class"
        child.prototype.__class__ = child.prototype

        // shortcut to parent prototype
        child.__super__ = parent.prototype;

        return child;
    };
    Seed.inherits = inherits

    /**
    * Allows a Seed to get the behaviour of another one,
    * mixing the two into a new one.
    *
    * @method marry
    * @param {Seed} partner The class we are going to mix with the current one
    * @return {Seed}
    */
    var marry = function(partner) {
        var thisExtendable = this.extend();
        var thisPrototype = cloner.clone(thisExtendable.prototype);
        var partnerPrototype = cloner.clone(partner.prototype);
        thisExtendable.prototype = cloner.extend(partnerPrototype, thisPrototype);
        return thisExtendable;
    }
    Seed.marry = marry;


    /***
    * This is intended to transform other classes-like objects in descendants of
    * this class. It's intended to be called this .apply(), it needs to be in the
    * context of the destination object
    * Example: Seed.assimilate.apply(Backbone.Model);
    *
    * @method assimilate
    * @param {Seed} parent
    */
    var assimilate = function(parent) {
        this.inherits = Seed.inherits;
        this.extend = Seed.extend;
        this._parent = _parent ? _parent : null;
        this.parent = parent ? parent : null;
        this.marry = Seed.marry;
    }
    Seed.assimilate = assimilate;

}).call(this);
