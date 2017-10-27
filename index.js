'use strict';
var Alexa = require('alexa-sdk');
var VoiceLabs = require("voicelabs")('680ac000-2910-11a7-01a9-0eb19d13e26e');

var APP_ID = 'amzn1.ask.skill.6ed1346d-c3b2-43c0-b823-62ac0bb23587';
var SKILL_NAME = 'Wedding Fact';

// Pastorelle <phoneme alphabet="ipa" ph="pæstoreli">Pastorelle</phoneme>
// Banerelle <phoneme alphabet="ipa" ph="beɪnɚeli">Banerelle</phoneme>

/**
 * Array containing wedding facts.
 */
var FACTS = [
    "Shayna and Ryan are getting married Saturday, July 15th 2017.",
    'The <phoneme alphabet="ipa" ph="beɪnɚelis">Banerelles</phoneme> will have an outdoor wedding ceremony.',
    'The <phoneme alphabet="ipa" ph="beɪnɚeli">Banerelle</phoneme> wedding is at White Birch Barn in Medina, Ohio.',
    'The <phoneme alphabet="ipa" ph="beɪnɚeli">Banerelle</phoneme> wedding ceremony starts at 4:30 in the afternoon.',
    'The official wedding website is: <phoneme alphabet="ipa" ph="beɪnɚeli">Banerelle</phoneme>.com; <say-as interpret-as="spell-out">banerelle</say-as>.com.',
    "You can RSVP on the wedding website by June 10th at <say-as interpret-as='spell-out'>banerelle</say-as>.com.",
    'The <phoneme alphabet="ipa" ph="beɪnɚeli">Banerelle</phoneme> wedding has 3 groomsmen, 2 bridesmaids, and 1 bridesman.',
    "Ryan asked Shayna to marry him on September 27th, 2015.",
    "Shayna and Ryan met each other at the Patio in Lakewood, Ohio.",
    "Shayna and Ryan met in the year 2011.",
    "Shayna and Ryan are registered at Crate and Barrel, and, Amazon.com.",
    "Ryan and Shayna have traveled to Puerto Rico; the Dominican Republic; Cancún, Mexico; San Francisco; Los Angeles; Austin, Texas; Aspen, Colorado; Milwaukee; Columbus; Pittsburgh; the Outer Banks; Washington DC; and West Virginia.",
    'You can sign Shayna and Ryan\'s guestbook on <phoneme alphabet="ipa" ph="beɪnɚeli">Banerelle</phoneme>.com.',
    'Hotel accommodations are listed on <phoneme alphabet="ipa" ph="beɪnɚeli">Banerelle</phoneme>.com.'
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

        VoiceLabs.track(this.event.session, 'GetNewFactIntent', null, speechOutput, (error, response) => {
            this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact);
        });
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a wedding fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        VoiceLabs.track(this.event.session, 'HelpIntent', null, speechOutput, (error, response) => {
            this.emit(':ask', speechOutput, reprompt);
        });
    },
    'AMAZON.CancelIntent': function () {
        VoiceLabs.track(this.event.session, "SessionEnd", null, null, (error, response) => {
            this.emit(':tell', 'Goodbye!');
        });
    },
    'AMAZON.StopIntent': function () {
        VoiceLabs.track(this.event.session, "SessionEnd", null, null, (error, response) => {
            this.emit(':tell', 'Goodbye!');
        });
    }
};
