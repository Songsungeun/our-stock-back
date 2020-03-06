import express from 'express';
import { crawl } from './crawl';
import { extract } from './extract';
import { urlPath } from './constant/urlPath';


const app = express();
const cors = require('cors');
const iconv = require('iconv-lite');

app.use(cors())
app.get('/getTotalIndex', async (req, res) => {
    // let url: string = req.params.url;
    const totalVal = { kospi: {}, kosdaq: {}, nasdaq: {} }
    const kospi = await crawl(urlPath.kospi);
    totalVal.kospi = extract(kospi);
    const kosdaq = await crawl(urlPath.kosdaq);
    totalVal.kosdaq = extract(kosdaq);
    const nasdaq = await crawl(urlPath.nasdaq);
    totalVal.nasdaq = extract(nasdaq, 'nasdaq');

    res.json(totalVal);
});

app.listen(3000, () => {
    console.log('server started');
})