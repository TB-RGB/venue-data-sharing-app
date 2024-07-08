const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get('/', rejectUnauthenticated, (req,res)=>{
    const queryText = `
    SELECT * FROM band_info;
    `;
    pool.query(queryText)
        .then(response=>{
            res.send(response.rows)
        })
        .catch(err=>{
            console.log('Error getting bands route', err)
        })
})

router.post('/', rejectUnauthenticated, (req, res)=>{
    const name = [req.body.name]
    const queryText = `
    INSERT INTO band_info (name)
    VALUES ($1) RETURNING id;
    `
    pool.query(queryText, name)
        .then(response=>{
            res.send(response.rows)
        })
        .catch(err=>{
            console.log('Error in POST band router', err)
        })
})

module.exports = router