const express = require('express');
const { resolve } = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3001;
let db;

(async () => {
  try {
    db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database,
    });
    console.log('Connected to the SQLite database.');
  } catch (err) {
    console.error('Error opening the database:', err);
  }
})();
app.use(express.static('static'));

app.get('/restaurants', async (req, res) => {
  try {
    const query = 'SELECT * from restaurants';
    const response = await db.all(query, []);
    if (response.length > 0) {
      res.status(200).json({ restaurants: response });
    } else {
      res.status(400).json('no data found');
    }
  } catch (err) {
    res.status(500).json({ err: err });
    console.log(err);
  }
});
app.get('/restaurants/details/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * from restaurants WHERE id = ? ';
    const response = await db.all(query, [id]);
    if (response.length > 0) {
      res.status(200).json({ restaurants: response });
    } else {
      res.status(400).json('no data found');
    }
  } catch (err) {
    res.status(500).json({ err: err });
    console.log(err);
  }
});
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    const id = req.params.cuisine;
    const query = 'SELECT * from restaurants WHERE cuisine = ? ';
    const response = await db.all(query, [id]);
    if (response.length > 0) {
      res.status(200).json({ restaurants: response });
    } else {
      res.status(400).json('no data found');
    }
  } catch (err) {
    res.status(500).json({ err: err });
    console.log(err);
  }
});
app.get('/restaurants/filter', async (req, res) => {
  try {
    const id = req.query.isVeg;
    const hasSeating = req.query.hasOutdoorSeating;
    const isLuxury = req.query.isLuxury;

    const query =
      'SELECT * from restaurants WHERE isVeg = ?  AND hasOutdoorSeating = ? AND isLuxury = ?';
    const response = await db.all(query, [id, hasSeating, isLuxury]);
    if (response.length > 0) {
      res.status(200).json({ restaurants: response });
    } else {
      res.status(400).json('no data found');
    }
  } catch (err) {
    res.status(500).json({ err: err });
    console.log(err);
  }
});
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    const query = 'SELECT * from restaurants ORDER BY rating DESc';
    const response = await db.all(query, []);
    if (response.length > 0) {
      res.status(200).json({ restaurants: response });
    } else {
      res.status(400).json('no data found');
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
app.get('/dishes', async (req, res) => {
  try {
    const query = 'SELECT * from dishes';
    const response = await db.all(query, []);
    if (response.length > 0) {
      res.status(200).json({ dishes: response });
    } else {
      res.status(400).json('no data found');
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
app.get('/dishes/details/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * from dishes WHERE id = ?';
    const response = await db.all(query, [id]);
    if (response.length > 0) {
      res.status(200).json({ dish: response });
    } else {
      res.status(400).json('no data found');
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
app.get('/dishes/filter', async (req, res) => {
  try {
    const isVeg = req.query.isVeg;
    const query = 'SELECT * from dishes WHERE isVeg = ?';
    const response = await db.all(query, [isVeg]);
    if (response.length > 0) {
      res.status(200).json({ dish: response });
    } else {
      res.status(400).json('no data found');
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    const query = 'SELECT * from dishes ORDER BY price';
    const response = await db.all(query, []);
    if (response.length > 0) {
      res.status(200).json({ dish: response });
    } else {
      res.status(400).json('no data found');
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
