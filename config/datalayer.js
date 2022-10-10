const data = {
  // data source
  dataSource: process.env.DATA_SOURCE,
  sourcePath: process.env.SOURCE_PATH,
  graphqlURL: process.env.GRAPHQL_URL,
  masterNarrative: process.env.MASTER_NARRATIVE,
};

// console.log("================= datalayer.js =================");
// console.log(process.env.DATA_SOURCE + "\n\r");
// console.log(process.env.SOURCE_PATH + "\n\r");
// console.log(process.env.GRAPHQL_URL + "\n\r");
// console.log("================= datalayer.js =================");

module.exports = data;
