const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const id = [req.params.id];
  const queryText = `
        SELECT 
        show_reports.show_date,
        show_reports.door_time,
        band_info.name as band_name,
        venue_info.name as venue_name
        FROM
        show_reports
        JOIN band_info
        ON show_reports.band_id = band_info.id
        JOIN venue_info
        ON show_reports.venue_id = venue_info.id
        WHERE show_reports.venue_id = $1;
      `;
  pool
    .query(queryText, id)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.error("Error GET show reports route", err);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  const { band_id, venue_id, show_date, door_time, age_restrictions } =
    req.body;
  const queryText = `
  INSERT INTO show_reports (band_id, venue_id, show_date, door_time, age_restrictions)
  VALUES ($1, $2, $3, $4, $5);
  `;
  const paramArray = [
    band_id,
    venue_id,
    show_date,
    door_time,
    age_restrictions,
  ];

  pool
    .query(queryText, paramArray)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error("Error in POST show route", err);
    });
});

module.exports = router;
