import { load } from 'cheerio'

export const extract = (html: string, type?: string) => {
	if (html === '') return [];
	const $ = load(html);
	let val, rate, data = { val: '', rate: '' };

	if (type && type === 'nasdaq') {
		val = $('#dayTable > .tb_td2:first-child');
		console.log(val.text());
	}

	val = $('#now_value'), rate = $('#change_value_and_rate');
	data.val = val.text();
	data.rate = rate.text().split('%')[0];

	return data;

}