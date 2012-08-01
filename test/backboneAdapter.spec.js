/***************
  Tests for seedJs backboneAdapter.js file.

  To run they require to have installed the following npm packets:

  npm install mocha
  npm install chai
  npm install jquery
  npm install backbone
  Author: Javi Alvarez
  <javieralvarezlop@gmail.com>
  http://twitter.com/johnhackworth

****************/
var root = (typeof exports != 'undefined' ? exports : window);
// var browser = null;
if(typeof exports != "undefined") { // run on node.js
    var expect = require("chai").expect
    root.$ = $ = jQuery = require("jquery")
    Backbone = require("backbone")
    var Seed = require("../src/seed.js")
    var backboneAdapter = require("../src/backboneAdapter.js")
    root.SeedModel = backboneAdapter.SeedModel;
    root.SeedView = backboneAdapter.SeedView;
    // var jsdom = require("jsdom");
    // jsdom.env('<div class="tests">aaa</div>',
    //     ['http://code.jquery.com/jquery-1.7.min.js'],
    //     function(errors, window) {
    //         browser = window;
    //     }
    // );

} else {
    var expect = chai.expect;
    // browser = window;
    // browser.innerHTML += '<div class="tests"></div>';
}

describe('The backbone adapter of Seed ', function() {
    beforeEach(function() {
        this.Model = root.SeedModel.extend()
        this.Starship = this.Model.extend({'weight':2000,
            'weapons': {
                'laser': {
                    'loaded': true
                }

            },
            'load': function() {
                this.weapons.laser.loaded = true;
            },
            'fire': function() {
                this.weapons.laser.loaded = false;
            }
        });
        this.StarshipView = root.SeedView.extend({
            render: function() {
                this.trigger('render');
            }
        });

        this.ColonyShip = this.Starship.extend({
            defaults: {
                'population': 500000,
                'destination': {
                    'star': 'Betelgeuse'
                },
                'pilot': {
                    'name': 'autopilot'
                }
            }
        });
    })

    afterEach(function() {
        delete this.Model
        delete this.Starship
    })

    it('should be able to create a backbone model class derived from Seed', function() {

        expect(this.Model).exist
        expect(this.Model._parent).to.not.be.ok
    })

    it('should be able to instantiate a backbone model object', function() {

        var m = new this.Model({"prop":1});

        expect(m).exist
        expect(m.get('prop')).to.equal(1)
        expect(typeof m.parent).to.equal('function')
    })

    it('should be able to create a extended class derived from seed', function() {
        expect(this.Starship).exist
    })

    it('should be able to create not linked object from the same derived class', function() {
        var nostromo = new this.Starship({name:"nostromo"})
        var millenium = new this.Starship({name:"millenium falcon"})

        expect(nostromo).exist
        expect(millenium).exist

        nostromo.fire()

        expect(nostromo.weapons.laser.loaded).to.beFalsy
        expect(millenium.weapons.laser.loaded).to.beTruthy

        var enterprise = new this.Starship({name:"USS enterprise"})
        expect(millenium.weapons.laser.loaded).to.beTruthy
        expect(enterprise.get('name')).to.equal('USS enterprise');
    })

    it('should accept objects as parameters and not duplicate them', function() {
        var xwing = new this.Starship({"pilot":{"name":"Luke"}});
        var tiewing = new this.Starship({"pilot":{"name":"Anakin"}});

        expect(xwing.get('pilot').name).to.equal("Luke");

        xwing.get('pilot').name = 'Wesley';

        expect(xwing.get('pilot').name).to.equal("Wesley");
        expect(tiewing.get('pilot').name).to.equal("Anakin");
    })

    it('should fire the backbone events when changed', function() {
        var xwing = new this.Starship({"pilot":{"name":"Luke"}});
        var isLukePilot = true;
        xwing.bind('change', function() {
            isLukePilot = false;
        });

        xwing.set({"pilot": {"name": "Han"}});

        expect(isLukePilot).to.be.not.ok
        expect(xwing.get('pilot').name).to.equal("Han");
    });

    it('should be able to instantiate not linked complex default values ', function() {
        var generationShip = new this.ColonyShip({"pilot":{"name":"I-pilot"}})
        var podShip = new this.ColonyShip()

        podShip.get('destination').star = 'Alpha-centaury';

        expect(podShip.get('destination').star).to.equal('Alpha-centaury');
        expect(generationShip.get('destination').star).to.equal('Betelgeuse');

        expect(generationShip.get('pilot').name).to.equal("I-pilot");
        expect(podShip.get('pilot').name).to.equal("autopilot");
    })



});
