import { Mongo } from 'meteor/mongo';

export const Sites = new Mongo.Collection('sites');

Meteor.startup(() => {
})
