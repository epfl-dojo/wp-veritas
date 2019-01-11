import { Mongo } from 'meteor/mongo';

export const Sites = new Mongo.Collection('sites');

Meteor.startup(async function() {
  let sites = await Sites.find({}).fetch();
  if (process.env.NODE_ENV != "production" &&
    ! (sites && sites.length)) {
    console.log("Insertion de données bidon...");
    return Sites.insert(
      {"url":"http://toto.epfl.ch","tagline":"aaa","title":"titre","openshift_env":"www","type":"private","theme":"2018","faculty":"CDH","language":"en","unit_id":"123","snow_number":"123"}
    );
  }
})
