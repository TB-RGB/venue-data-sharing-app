const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const id = [req.params.id];
  const queryText = `
    SELECT * FROM "venue_info"
    WHERE "account_id" = $1;
    `;
  pool
    .query(queryText, id)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("Error in GET venue route", err);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  const { name, capacity, website, instagram, id } = req.body;
  let queryText= `
  INSERT INTO venue_info (name, capacity, website, instagram, account_id)
  VALUES ($1, $2, $3, $4, $5);
  `; 
  let postArray= [name, capacity, website, instagram, id];

  pool
    .query(queryText, postArray)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in POST route", err);
    });
});

router.put("/name", rejectUnauthenticated, (req, res) => {
    const { name, id } = req.body
    const queryText = `
    UPDATE venue_info SET name = $1
    WHERE id = $2;
    `

    pool.query(queryText, [name, id])
        .then(response=>{
            res.sendStatus(204)
        })
        .catch(err=>{
            console.log('Error in PUT name route', err)
        })
});

router.put("/capacity", rejectUnauthenticated, (req, res) => {
    const { capacity, id } = req.body
    const queryText = `
    UPDATE venue_info SET capacity = $1
    WHERE id = $2;
    `

    pool.query(queryText, [capacity, id])
        .then(response=>{
            res.sendStatus(204)
        })
        .catch(err=>{
            console.log('Error in PUT name route', err)
        })
    
});

router.put("/website", rejectUnauthenticated, (req, res) => {
    const { website, id } = req.body
    const queryText = `
    UPDATE venue_info SET website = $1
    WHERE id = $2;
    `

    pool.query(queryText, [website, id])
        .then(response=>{
            res.sendStatus(204)
        })
        .catch(err=>{
            console.log('Error in PUT name route', err)
        })
});

router.put("/instagram", rejectUnauthenticated, (req, res) => {
    const { instagram, id } = req.body
    const queryText = `
    UPDATE venue_info SET instagram = $1
    WHERE id = $2;
    `

    pool.query(queryText, [instagram, id])
        .then(response=>{
            res.sendStatus(204)
        })
        .catch(err=>{
            console.log('Error in PUT name route', err)
        })
});

module.exports = router;
