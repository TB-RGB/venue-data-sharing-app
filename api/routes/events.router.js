const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const multer = require("multer");
const csv = require("csvtojson");

// * Multer storage declaration for csvfile
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const id = [req.params.id];
  const queryText = `
        SELECT 
        show_reports.show_date,
        show_reports.door_time,
        show_reports.id,
        band_info.name as band_name,
        venue_info.name as venue_name,
        venue_info.capacity,
        show_reports.total_tickets_sold,
        show_reports.total_presale_sold,
        show_reports.total_beer_sold,
        show_reports.total_liquor_sold,
        show_reports.total_other_sold
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

router.get("/event/:id", rejectUnauthenticated, (req, res) => {
  const id = [req.params.id];
  const queryText = `
  SELECT 
  show_reports.show_date,
  show_reports.door_time,
  show_reports.id,
  band_info.name as band_name,
  show_reports.band_id as band_id,
  venue_info.name as venue_name,
  venue_info.capacity,
  show_reports.total_tickets_sold,
  show_reports.total_presale_sold,
  show_reports.total_beer_sold,
  show_reports.total_liquor_sold,
  show_reports.total_other_sold
  FROM
  show_reports
  JOIN band_info
  ON show_reports.band_id = band_info.id
  JOIN venue_info
  ON show_reports.venue_id = venue_info.id
  WHERE show_reports.id = $1;
`;
  pool
    .query(queryText, id)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.error("Error GET single event route", err);
      res.sendStatus(500);
    });
});

router.get("/band/:id", rejectUnauthenticated, (req, res) => {
  const id = [req.params.id];
  const queryText = `
  SELECT 
  show_reports.show_date,
  show_reports.door_time,
  show_reports.id,
  band_info.name as band_name,
  venue_info.name as venue_name,
  venue_info.capacity,
  show_reports.total_tickets_sold,
  show_reports.total_presale_sold,
  show_reports.total_beer_sold,
  show_reports.total_liquor_sold,
  show_reports.total_other_sold
  FROM
  show_reports
  JOIN band_info
  ON show_reports.band_id = band_info.id
  JOIN venue_info
  ON show_reports.venue_id = venue_info.id
  WHERE show_reports.band_id = $1;
`;
  pool
    .query(queryText, id)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.error("Error GET single event route", err);
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

router.put("/", rejectUnauthenticated, (req, res) => {
  const { tixTotal, presale, beer, liquor, other, id } = req.body;
  const queryText = `
  UPDATE show_reports
  SET total_tickets_sold=$1, total_presale_sold=$2, total_beer_sold=$3, total_liquor_sold=$4, total_other_sold=$5
  WHERE id=$6;
  `;
  const paramArray = [tixTotal, presale, beer, liquor, other, id];

  pool
    .query(queryText, paramArray)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error("Error in PUT show route", err);
    });
});

router.put(
  "/file/:id",
  rejectUnauthenticated,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const showId = req.params.id;

    try {
      const jsonArray = await csv().fromString(req.file.buffer.toString());
      if (jsonArray.length === 0) {
        return res.status(400).send("CSV file is empty or invalid");
      }

      const queryText = `
    UPDATE show_reports SET
    total_tickets_sold=$1, total_presale_sold=$2,
    total_beer_sold=$3, total_liquor_sold=$4, total_other_sold=$5
    WHERE id=$6;
    `;

      await pool.query(queryText, [
        jsonArray[0].total_tickets_sold,
        jsonArray[0].total_presale_sold,
        jsonArray[0].total_beer_sold,
        jsonArray[0].total_liquor_sold,
        jsonArray[0].total_other_sold,
        showId,
      ]);
    } catch (err) {
      console.log("Error in PUT file route", err);
      res.sendStatus(500);
    }
  }
);

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  console.log(id);
  const queryText = `
  DELETE FROM show_reports
  WHERE id = $1;
  `;
  pool
    .query(queryText, [id])
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error("Error in DELETE show route", err);
    });
});

module.exports = router;
