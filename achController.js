const synapse = require("./clientinit");
const client = synapse.client;

module.exports = {
  createNode: (req, res) => {
    client
      .getUser(req.params.userId, true)
      .then(response => {
        response
          .createNode({
            type: "SYNAPSE-US",
            info: {
              nickname: req.body.accountName
            }
          })
          .then(({ data }) => {
            res.send(data);
          })
          .catch(err => console.log("here", err));
      })
      .catch(err => {
        console.log("creatnode err", err);
      });
  },
  getAllNodes: (req, res) => {
    client
      .getUser(req.params.userId, true)
      .then(response => {
        response
          .getAllUserNodes()
          .then(({ data }) => {
            res.send(data);
          })
          .catch(err => console.log("here", err));
      })
      .catch(err => {
        console.log("creatnode err", err);
      });
  },
  getUserTransactions: (req, res) => {
    client
      .getUser(req.params.userId, true)
      .then(response => {
        response
          .getUserTransactions()
          .then(({ data }) => {
            res.send(data);
          })
          .catch(err => console.log("here", err));
      })
      .catch(err => {
        console.log("creatnode err", err);
      });
  },
  createTransaction: (req, res) => {
    client
      .getUser(req.params.userId, true)
      .then(response => {
        response
          .createTransaction(req.body.nodeId, {
            to: {
              type: "SYNAPSE-US",
              id: req.body.toNodeId
            },
            amount: {
              amount: req.body.amount,
              currency: "USD"
            },
            extra: {
              ip: "127.0.0.1",
              note: "Test transaction"
            }
          })
          .then(({ data }) => {
            res.send(data);
          })
          .catch(err => console.log("here", err));
      })
      .catch(err => {
        console.log("creatnode err", err);
      });
  }
};
