const crypto = require('crypto')
const fs = require("fs")
const path = require('path')
const pdf = require("pdf-creator-node")

// Install pdf-creator-node package
// Also, make sure that the file structre remians the same or update the path in generatePdf file if any changes has been made.

// This function will return the file name of the pdf which is being stored inside public/receipts
function generatePdf(data) {

    // Read HTML Template
    var html = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
    let users = []
    users.push(data)

    var options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      header: {
          height: "45mm",
          contents: '<div style="text-align: center;">Presidency College</div>'
      },
      footer: {
          height: "28mm",
          contents: {
              first: 'Cover page',
              2: 'Second page', // Any page number is working. 1-based index
              default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
              last: 'Last Page'
          }
      }
    };

    const fileName = crypto.randomUUID()

    var document = {
      html: html,
      data: {
        users: users,
      },
      // path: `./public/receipts/receipt_${users[0].paymentId}.pdf`,
      path: `${path.join(__dirname, `/public/receipts/receipt_${fileName}.pdf`)}`,
      type: "",
    };

    pdf
    .create(document, options)
    .then((res) => {
      // success
      // return document.path.replace('./public', '')
      return `receipt_${fileName}.pdf`
    })
    .catch((error) => {
      console.error(error);
    });

    return `receipt_${fileName}.pdf`
}

module.exports = generatePdf