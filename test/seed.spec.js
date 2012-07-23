/***************
  Tests for seed.js main file.

  To run they require to have installed the following npm packets:

  npm install mocha
  npm install chai
  npm install jquery

  Author: Javi Alvarez
  <javieralvarezlop@gmail.com>
  http://twitter.com/johnhackworth

****************/
if(typeof exports != "undefined") { // run on node.js
    var expect = require("chai").expect
    $ = jQuery = require("jquery")
    window = {}
    var Seed = require("../src/seed.js")
} else {
    var expect = chai.expect;
}

describe('SeedJs ', function() {
    beforeEach(function() {
        this.Vehicle = window.Seed.extend({'wheels':0,
            'state': {
                'speed':0,
                'pos': {
                    'x': 0,
                    'y': 0
                }
            }
        }),
        this.Bike = this.Vehicle.extend({'wheels':2,
            accident: function() {this.wheels--},
            speedUp: function() {this.state.speed += 10},
            run: function() {this.state.pos.x += this.state.speed}
        });


    })

    afterEach(function() {
        delete this.Vehicle;
        delete this.Bike;
    })

    it('should be able to create a Seed class', function() {
        var SeedClass = window.Seed.extend({'attr':1})
        expect(SeedClass).exist
    })

    it('should be able to instance a Seed class object', function() {

        var v = new this.Vehicle();
        expect(v).exist
        expect(v.wheels).equal(0)

    })


    it('should be able to instance a extension of the base Seed class without' +
    ' modifiying the base class', function() {
        var CartWheel = this.Vehicle.extend({'wheels':1, 'load':'40l'});
        var cart = new CartWheel();
        var v = new this.Vehicle();
        expect(cart).exist
        expect(cart.wheels).equal(1)
        expect(cart.load).equal('40l')
        expect(v.wheels).equal(0)
        expect(v.load).equal(undefined)
    })

    it('should be able to instance several objects of a class not linked between them', function() {

        var bikeOne = new this.Bike();
        var bikeTwo = new this.Bike();

        bikeOne.speedUp();
        bikeOne.speedUp();
        bikeTwo.speedUp();
        bikeOne.run();
        bikeTwo.run();
        bikeOne.accident();

        expect(bikeOne.state.speed).equal(20)
        expect(bikeTwo.state.speed).equal(10)
        expect(bikeOne.state.pos.x).equal(20)
        expect(bikeTwo.state.pos.x).equal(10)
        expect(bikeOne.wheels).equal(1)
    })

    it('should be able to use "parent" method', function() {
        var SideCar = this.Bike.extend({"wheels": 3,
            run: function() {
                this.parent("run");
                this.state.pos.y += 5;
            }
        })

        var bikeOne = new this.Bike();
        var sidecar = new SideCar();

        bikeOne.speedUp();
        bikeOne.speedUp();
        sidecar.speedUp();
        bikeOne.run();
        sidecar.run();

        expect(bikeOne.state.speed).equal(20)
        expect(sidecar.state.speed).equal(10)
        expect(bikeOne.state.pos.x).equal(20)
        expect(sidecar.state.pos.x).equal(10)
        expect(sidecar.state.pos.y).equal(5)


    })


});
