'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createCollection('admin').then(
    function() {
      db.addIndex('admin', 'userId_', ['userId'], true);
    },
    function(err) {
      return console.error(err);
    }
  );
};

exports.down = function(db) {
  return db.dropCollection('admin');
};

exports._meta = {
  "version": 1
};
