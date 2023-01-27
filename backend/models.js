const { Pool } = require("pg");

const PG_URI =
  "postgres://xanuxzqq:5CeevP_2Oy-rGwCbb-HknGfxEb73BjYC@heffalump.db.elephantsql.com/xanuxzqq";
  
// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
