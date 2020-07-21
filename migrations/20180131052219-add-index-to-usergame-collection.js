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

var collectionName = 'usergame'
var indexName = 'owner_'

exports.up = function(db) {
  return db.addIndex(collectionName, indexName, ['owner'], false);
};

exports.down = function(db) {
  return db.removeIndex(collectionName, indexName);
};

exports._meta = {
  "version": 1
};
