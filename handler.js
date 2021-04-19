"use strict";
const fetch = require("node-fetch")
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.test = async () => {
  const gremlin = require("gremlin");
  const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
  const Graph = gremlin.structure.Graph;

  let dc = new DriverRemoteConnection(
    "wss://endpoint.com:8182/gremlin",
    {}
  );

  const graph = new Graph();
  const g = graph.traversal().withRemote(dc);

  let result = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  let data = await result.json();

  console.log("data",data)
  
  let q1 = await g.addV('aijaz').property('id', Math.random()*1111).property('name', 'test').valueMap(true).next();

  console.log("q1",q1)


  console.log("************************** GETTING VERTIX ****************************")

  let q2 = await g.E("aijaz").valueMap(true).next();

  console.log("q2",q2);

  let q3 = await g.V().toList();

  console.log("q3",q3)


  let q4 = await g.V().hasLabel('aijaz').valueMap(true).next();

  console.log("q4",q4.value)

 

  await g
    .V()
    .limit(1)
    .count()
    .next()
    .then((data1) => {
      console.log(data1);
      dc.close();
      return {
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
        statusCode: 200,
      };
    })
    .catch((error) => {
      console.log("ERROR", error);
      dc.close();
    });
};
