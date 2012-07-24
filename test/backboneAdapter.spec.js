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
if(typeof exports != "undefined") { // run on node.js
    var expect = require("chai").expect
    $ = jQuery = require("jquery")
    Backbone = require("backbone")
    window = exports
    var Seed = require("../src/seed.js")
    var backboneAdapter = require("../src/backboneAdapter.js")

} else {
    var expect = chai.expect;
}

describe('SeedJs ', function() {
    beforeEach(function() {
        this.Model = window.SeedModel.extend()
        this.Starship = this.Model.extend({'weight':2000,
            'weapons': {
                'laser': {
                    'loaded':true
                }

            },
            'load': function() {
                this.weapons.laser.loaded = true;
            },
            'fire': function() {
                this.weapons.laser.loaded = false;
            }
        })
    })

    afterEach(function() {
        delete this.Model
        delete this.Starship
    })

    it('should be able to create a backbone model class derived from Seed', function() {

        expect(this.Model).exist
        // expect(this.Model.parent).to.equal(null)
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

    it('should be able')


});
