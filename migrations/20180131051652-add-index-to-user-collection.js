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

var collectionName = 'user'
var emailIndexName = 'email_'
var usernameIndexName = 'username_';

exports.up = function(db) {
  db.addIndex(collectionName, emailIndexName, ['email'], true);
  return db.addIndex(collectionName, usernameIndexName, ['username'], true);
};

exports.down = function(db) {
  db.removeIndex(collectionName, emailIndexName);
  return db.removeIndex(collectionName, usernameIndexName);
};

exports._meta = {
  "version": 1
};
