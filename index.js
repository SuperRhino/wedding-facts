'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.6ed1346d-c3b2-43c0-b823-62ac0bb23587'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Wedding Fact';

// Pastorelle <phoneme alphabet="ipa" ph="pæstoreli">Pastorelle</phoneme>
// Banerelle <phoneme alphabet="ipa" ph="beɪnəˌreli">Banerelle</phoneme>

/**
 * Array containing wedding facts.
 */
var FACTS = [
    "Shayna and Ryan are getting married Saturday, July 15th 2017.",
    "The Bane Arelli wedding is at White Birch Barn in Medina, Ohio.",
    "The Bane Arelli wedding ceremony starts at 4:30 in the afternoon.",
    "You can RSVP on the wedding website by June 15th at <say-as interpret-as='spell-out'>banerelle</say-as>.com.",
    "The Bane Arelli wedding has 3 groomsmen, 2 bridesmaids, and 1 bridesman.",
    "Ryan asked Shayna to marry him on September 27th, 2015.",
    "Shayna and Ryan met each other at the Patio in Lakewood, Ohio.",
    "Shayna and Ryan met in the year 2011.",
    "Ryan and Shayna have traveled to Puerto Rico; the Dominican Republic; Cancún, Mexico; San Francisco; Los Angeles; Austin, Texas; Aspen, Colorado; Milwaukee; Columbus; Pittsburgh; the Outer Banks; Washington DC; and West Virginia.",
    "Hotel accommodations are provided by Fairfield Inn, Medina, Ohio, with group code: PBWS."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random fact from the facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a wedding fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
