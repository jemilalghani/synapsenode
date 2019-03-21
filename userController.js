const synapse = require("./clientinit");
const client = synapse.client;

module.exports = {
  createUsers: (req, res) => {
    const payload = {
      logins: [
        {
          email: req.body.email
        }
      ],
      phone_numbers: [req.body.phoneNumbers],
      legal_names: [req.body.name],
      documents: [
        {
          email: "test@test.com",
          phone_number: "901.111.1111",
          ip: "::1",
          name: req.body.name,
          alias: req.body.name,
          entity_type: "M",
          entity_scope: "Arts & Entertainment",
          day: 2,
          month: 5,
          year: 1990,
          address_street: "8302 International Blvd",
          address_city: "Oakland",
          address_subdivision: "CA",
          address_postal_code: "94621",
          address_country_code: "US",
          virtual_docs: [
            {
              document_value: "2222",
              document_type: "SSN"
            },
            {
              document_value: "2222",
              document_type: "OTHER"
            }
          ],
          physical_docs: [
            {
              document_value:
                "data:image/png;base64,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",
              document_type: "GOVT_ID"
            }
          ],
          social_docs: [
            {
              document_value: "2222",
              document_type: "OTHER"
            }
          ]
        }
      ],
      extra: {
        supp_id: "122eddfgbeafrfvbbb",
        cip_tag: 1,
        is_business: false
      }
    };
    client
      .createUser(payload)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        console.log("Create User Error: ", err);
      });
  },
  getUser: (req, res) => {
    const userID = req.body.userId;
    const fullDehydrate = true;

    client
      .getUser(userID, fullDehydrate)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        console.err("Get User Error: ", err);
      });
  },
  getAllUser: (req, res) => {
    client
      .getAllUsers(req.query)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.log("Get All User Error: ", err);
      });
  }
};
