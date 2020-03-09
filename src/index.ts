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
    const kospi = Buffer.from(await crawl(urlPath.kospi));

    totalVal.kospi = extract(iconv.decode(kospi, 'EUC-KR').toString());

    const kosdaq = Buffer.from(await crawl(urlPath.kosdaq));
    totalVal.kosdaq = extract(iconv.decode(kosdaq, 'EUC-KR').toString());

    const nasdaq = Buffer.from(await crawl(urlPath.nasdaq));
    totalVal.nasdaq = extract(iconv.decode(nasdaq, 'EUC-KR').toString(), 'nasdaq');

    res.json(totalVal);
});

app.listen(3000, () => {
    console.log('server started');
})