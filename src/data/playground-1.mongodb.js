/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("msrInfo");

// Insert a few documents into the sales collection.
db.getCollection("userdata").insertOne({
  45181802000183: {
    acquirers: {
      82413081000116: {
        valorPagar: "674.00",
        valorReceber: "34436705.84",
        valorTotal: "34437379.84",
        ultimoPagamento: "2042-11-22",
      },
      22222222000122: {
        valorPagar: "674.00",
        valorReceber: "34436705.84",
        valorTotal: "34437379.84",
        ultimoPagamento: "2042-11-22",
      },
      33333333000133: {
        valorPagar: "674.00",
        valorReceber: "34436705.84",
        valorTotal: "34437379.84",
        ultimoPagamento: "2042-11-22",
      },
    },
  },
  45181802000122: {
    acquirers: {
      82413081000116: {
        valorPagar: "674.00",
        valorReceber: "34436705.84",
        valorTotal: "34437379.84",
        ultimoPagamento: "2042-11-22",
      },
      22222222000122: {
        valorPagar: "674.00",
        valorReceber: "34436705.84",
        valorTotal: "34437379.84",
        ultimoPagamento: "2042-11-22",
      },
      33333333000133: {
        valorPagar: "674.00",
        valorReceber: "34436705.84",
        valorTotal: "34437379.84",
        ultimoPagamento: "2042-11-22",
      },
    },
  },
  45181802000133: {
    acquirers: {
      82413081000116: {
        valorPagar: "674.00",
        valorReceber: "34436705.84",
        valorTotal: "34437379.84",
        ultimoPagamento: "2042-11-22",
      },
      22222222000122: {
        valorPagar: "674.00",
        valorReceber: "34436705.84",
        valorTotal: "34437379.84",
        ultimoPagamento: "2042-11-22",
      },
      33333333000133: {
        valorPagar: "674.00",
        valorReceber: "34436705.84",
        valorTotal: "34437379.84",
        ultimoPagamento: "2042-11-22",
      },
    },
  },
  agendaFutura: "309930352.56",
  ultimoPagamento: "2042-11-22",
  atual: {
    date: "2023-05-04",
    amount: 0,
  },
  proximo: {
    date: "2023-05-05",
    amount: 0,
  },
});

// Run a find command to view items sold on April 4th, 2014.
const userData = db
  .getCollection("userdata")
  .find()

// Print a message to the output window.
console.log(userData);

