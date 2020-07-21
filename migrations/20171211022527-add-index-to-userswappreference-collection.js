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

var indexName = 'igdbType_igdbId_';

exports.up = function(db) {
return db.addIndex('userswappreference', indexName, ['igdbType', 'igdbId'], true);
};

exports.down = function(db) {
  return db.removeIndex('userswappreference', indexName);
};

exports._meta = {
  "version": 1
};
