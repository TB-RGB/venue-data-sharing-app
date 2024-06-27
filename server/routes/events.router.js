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
    .catch((error) => {
      console.error("Error fetching show reports:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
