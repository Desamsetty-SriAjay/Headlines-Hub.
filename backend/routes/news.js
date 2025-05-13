import express from 'express'
import Parser from 'rss-parser'

const router=express.Router()

const parser =new Parser();

const feeds = {
  bbc: 'http://feeds.bbci.co.uk/news/world/rss.xml',
  ndtv: 'https://feeds.feedburner.com/ndtvnews-top-stories',
  ie: 'https://indianexpress.com/section/india/feed/',
  hindu: 'https://www.thehindu.com/news/national/feeder/default.rss',
};

router.get('/:source', async (req, res) => {
  const source = req.params.source;
  if (!feeds[source]) {
  return res.status(400).json({ error: 'Invalid source' });
}

  try {
    const feed = await parser.parseURL(feeds[source]);
    const items = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
    }));
    res.json(items);
  } catch (err) {
    res.status(500).send('Failed to fetch news');
  }
});

export default router;