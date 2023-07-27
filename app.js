const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

const TIME_URL = 'https://time.com';

app.get('/getTimeStories', (req, res) => {
  request(TIME_URL, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const stories = [];

      $('.swipe-h').each((index, element) => {
        if (index < 6) {
          const title = $(element).find('.headline').text().trim();
          const link = $(element).find('a').attr('href');
          stories.push({ title, link });
        }
      });

      res.json(stories);
    } else {
      res.status(500).json({ error: 'Failed to fetch data from Time.com' });
    }
  });
});

const PORT = 3000; // You can use any port number you prefer
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});