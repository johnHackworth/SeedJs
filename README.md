SeedJs
======
Version 0.10

SeedJs is a standalone library that provides you the minimal structure to be able to implement classes in your javascript project. At the same time, it's also a backbone.js extender/fixer. Right now, it deals with backbone inheritance "problems" and fixes them, helping you to be able to have a more "classical" approach to your application architecture.

SeedJs provides you with a more robust inheritance system. You can populate your classes with nested objects without sharing them, you can call to parent methods without the ugly parentName.prototype.method.call way and you can think more about your classes and less about how to implement them, in general.

Right now, SeedJs requires jQuery. We are working on a small library that substitutes the clone/extend features of jQuery, to make it available to non-jQuery projects, but it's still in the oven.

Quick Intro
===========

a) Standalone:

All you need is to include seed.js or seed.min.js in your project, and you are done. You can now declare classes just extending from the base class "Seed".

An quick example:

> var Droid = Seed.extend({
>     'owner': null,
>     'type': null
> })

You just have defined your first Seed Class!! from now on, you can define descendant classes or just instance some objects.

> var ProtocolDroid = Droid.extend({
>   'type': 'protocol',
>    'languages':['common', 'Ssi-ruuk']
>    'state': {
>        'servos': 'ok'
>    },
>    translate: function(language, content) {
>       return "i'm a javascript droid, so i'm too dumb to translate this";
>    }
> })
>
> var C3PO = new ProtocolDroid();

And also, of course, you can use the parent methods with the usual javascript ugly prototype syntax

> var ImperialProtocolDroid = ProtocolDroid.extend({
>    translate: function(language, content) {
>        if(language === 'common') {
>            return content;
>        } else {
>            return this.parent('translate', language, content);
>        }
>    }
> })

And that's it! enjoy your classes!!


b) Integrated with BackboneJs

Just include seed.js or seed.min.js just after your backbone requires... SeedJs will bind itself to Backbone models and (partially*) to backbone views.

After that, you only have to make your backbone models descend from SeedModel instead from Backbone.Model, and you'll have all the power from Seed on your backbone code.

* Right now, in the current state of development, Backbone views are more problematic. Since when you clone a view object you are also cloning the DOM element that hangs from it, the pointers needed to update the ui are lost. We are working on it and it'll be fixed in the next version!



c) Development

If you want to install the test enviroment, make sure you have nodejs installed in your machine and just run 'make install' in SeedJs home directory.

After that, you can run the test running 'make mocha' in your terminal.

If you don't have node.js or just don't want to install it, I have included an html runner for the tests. Just make some changes, open tests.html in a browser and see if something went wrong!




So ok, what is all this about?
==============================

1. Why do you need to fix Backbone?
-----------------------------------

Don't get me wrong... Backbone has represented a HUGE step forward for the web application development. Its approach and simplicity makes it just run circles around all the older javascript frameworks. They simply can't compete.

2. But! aren't you saying Backbone is broken?
-----------------------------------

No, no, no. Backbone is not broken. Backbone is the work and the vision of Mr. Ashkenas, and sometimes I don't share that same vision related to certain points. But it's perfectly fine, as long as you understand how it works and you are confortable with it!

3. But then, what happens with Backbone's inheritance? Isn't SeedJs intended to fix it?
-----------------------------------

Backbone inheritance system has no problem, it's just the common javascript prototype chaining inheritance. You can read about it in nearly every javascript medium-high level book published. And it's great, works great and it's a great and sane way of approaching to the inheritance problem.
But... prototypical inheritance differs quite a lot from 'classical' inheritance. When you deal with prototypes, everything, everything, is an object. Backbone classes are objects. With their own properties and their own entity. And that makes a huge difference with the 'classes' of the classical inheritance-based languages.

4. Classes are classes aren't they? You can extend them, make instances of them, etc...
-----------------------------------

Let's see an example of what I'm saying. Let's define a backbone model:

var Bicycle = Backbone.Model.extend({
    defaults: {
        rider: null,
        team: null
    },
    body: {
        'material': 'steel',
        'weight': 3
    },
    wheels: 2,
    name: 'Bike that goes fast'
})

ok, we have created the prototype of a bicycle object, we have defined a couple of defaults attributes (the ones we want to be sent to our REST layer), and a couple of properties we need to do the proccessing but not to be persisted. Nothing bad, isn't it?

ok, let's instance a couple of bikes...

var timeTrial = new Bicycle();
var mountain = new Bicycle();

But wait... our time trial bike is much lighter than the mountain one, so let's chage it's weight:

timeTrial.body.weight = 1

nice! let's see how much our bikes now weight!

console.log(timeTrial.body.weight)
~ 1
console.log(mountain.body.weight)
~ 1

Say what??? now our mountain bike weights also 1!!!! Ok, you, level 25 javascripter with a +25 sword made of pure Crockfordite, already know what just happened. Very likely you've seen the failure from the very beginning and for sure you know how to avoid it. But for people who are just approaching or have a basic javascript formation, this is brain-crushing. What? What has just happened??

Ok, what just happened is "everything is an object" and "everything is copied by reference". So when you have this 'body' attribute in the class, you have an object and a reference to it. And when you make a instance of this class, every instance is initalized with a pointer to the same object that the original class is pointing to. So, when you modify the value of one of the members of this object, you are modifiying the value of that data in not only in your current object, but also in the prototype and in ALL the instances of this class.

If you speak fluent python or javascript, you will say "of course! that attribute is a prototype attribute, the instances aren't redefining it, are using the copy from its parent". But well, if you don't, if you come to Javascriptland from PHP county, Java empire or C isle, you are probably saying "WHAT IS THIS SHIT" right now.

5. What SeedJs gives you, then?
-----------------------------------

Well, SeedJs transforms all this in a more classical way of inherit. It makes sure that a instance doesn't share variables with its siblings or parent. It lets you define attributes in the class, so the instances of this class have a copy of this attributes, not a pointer to the same one.

6. Why to use it? Can't you just be careful?
-----------------------------------

Of course! you don't have to use it! You just need to understand how this works and you'll be fine! But when you're programming on several languages at once, it's easy to forgot the peculiarities of any single one of them. And it's easy to forgot about it and just declare a shared pointer. And then, welcome to the hell of strange failings and hard to find bugs!

7. Wait, I've seen the documentation and... Have you added multiple inheritance to backbone? Isn't multiple inheritance evil? Are you mad??
-----------------------------------

MUOHOHOHOHOOHO. You have just discovered my evil plan. Fill the world with multiple inheritance!!!!
For real, we all know that giving the masses multiple inheritance is like give industrial grade miniaturized lasers to a bunch of monkeys. But hey, industrial grade miniaturized lasers are quite a tool in the correct monkey hands!
You don't have to use it. In fact, I'll beg you: Don't use it. You won't probably ever need it. As a good friend of mine says, if you have a whale class and a clock class, and you need a whale who knows what time is it, would you end with a whaleclock class? No, of course!! Please, make yourself a favor and use composition and live a sane life...
But maybe sometime, someday... in a dark monday afternoon, you'll find yourself with a bird class and a reptile class... and someone will ask you for a pterodactyle class... and...


