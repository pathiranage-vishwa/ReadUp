//import express from 'express';
//import Card from '../models/Cards.js';
//import md5 from 'md5';
const express = require("express");
const Card = require("../models/Cards.js");
const md5 = require("md5");

const cardRouter = express.Router();

cardRouter.route("/add").post((req, res) => {
  const uid = req.body.user_id;
  const cardNumber = md5(`${req.body.cardNumber}`);
  const cardType = req.body.cardType;
  const cardHolderName = req.body.cardHolderName;
  const cardSecurityCode = md5(`${req.body.cardSecurityCode}`);
  const ExDate = req.body.expirationDate;
  const bCardNumber = req.body.cardNumber;
  const lastFourDigits =
    `${bCardNumber.substr(0, 1)}` + `***********` + `${bCardNumber.substr(-4)}`;
  const newCard = new Card({
    uid,
    cardNumber,
    cardType,
    lastFourDigits,
    cardHolderName,
    cardSecurityCode,
    ExDate,
  });

  try {
    newCard.save();
    return res.status(200).json("Card Added");
  } catch (err) {
    return res.status(500).json(err);
  }
});

cardRouter.route("/").get((req, res) => {
  Card.find()
    .then((cards) => {
      res.json(cards);
    })
    .catch((err) => {
      console.log(err);
    });
});

cardRouter.get("/getMyCard/:id", (req, res) => {
  let crdid = req.params.id;
  Card.find({ uid: crdid })
    .then((cards) => {
      res.json(cards);
    })
    .catch((err) => {
      console.log(err);
    });
});

cardRouter.route("/delete/:id").delete(async (req, res) => {
  let cardid = req.params.id;

  await Card.findByIdAndDelete(cardid)
    .then(() => {
      res.status(200).send({ status: "Deleted!" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error delete" });
    });
});

module.exports = cardRouter;
