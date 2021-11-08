const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const corsHandler = cors({origin: true});

app.use(cors({origin: true}));

app.post("/payment/payumoney", function(req, res) {
  const pd = req.body.body;
  const key = "HCKzWSvU";
  const salt = "DR9JkRpA95";
  const hashString = key + "|" + pd.txnid + "|" + pd.amount +
		"|" + pd.productinfo + "|" + pd.firstname + "|" + pd.email +
		"|" + "||||||||||" + salt;
  const cryp = crypto.createHash("sha512");
  cryp.update(hashString);
  const hash = cryp.digest("hex");
  res.send({hash: hash, key: key});
});

app.post("/payment/payumoney/response", function(req, res) {
  const key = req.body.body.key;
  const salt = "DR9JkRpA95";
  const txnid = req.body.body.txnid;
  const amount = req.body.body.amount;
  const productinfo = req.body.body.productinfo;
  const firstname = req.body.body.firstname;
  const email = req.body.body.email;
  const mihpayid = req.body.body.mihpayid;
  const status = req.body.body.status;
  const resphash = req.body.body.hash;
  const mode = req.body.body.mode;
  const keyString = key + "|" + txnid + "|" + amount +
		"|" + productinfo + "|" + firstname + "|" + email +
		"||||||||||";
  const keyArray = keyString.split("|");
  const reverseKeyArray = keyArray.reverse();
  const reverseKeyString = salt + "|" + status + "|" +
		reverseKeyArray.join("|");
  const cryp = crypto.createHash("sha512");
  cryp.update(reverseKeyString);
  const calchash = cryp.digest("hex");
  if (calchash == resphash) {
    const msg = "Transaction Successful";
    res.send(
        {
          msg: msg,
          txnid: txnid,
          amount: amount,
          firstname: firstname,
          mihpayid: mihpayid,
          status: status,
          mode: mode,
          productinfo: productinfo,
          email: email,
        });
  } else {
    res.send("err");
  }
});
exports.app = functions.region("asia-south1").https.onRequest(app);
exports.sendMail = functions.region("asia-south1").
    https.onRequest((req, res) => {
      corsHandler(req, res, () => {
        const det = req.body;
        const email = det.toMail;
        const message = det.message;
        const html = det.html;
        const subject = det.subject;
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "redfashion.in@gmail.com",
            pass: "RedCompany.in",
          },
        });
        transporter.sendMail({
          from: "'Rediva' <redfashion.in@gmail.com>",
          to: email,
          subject: subject,
          text: message,
          html: html,
        }, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            res.status(200).send({
              message: info,
            });
          }
        });
      });
    });


