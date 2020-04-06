import { load } from 'cheerio'

export const extract = (html: string, type?: string) => {
	if (html === '') return [];
	const $ = load(html);
	let data = { val: '', rate: '' };

	if (type && type === 'nasdaq') {
		data.val = $('#dayTable > tbody .tb_td2').first().text();
		let rateVal = $('#dayTable > tbody .tb_td3').first().text();
		let className = $('#dayTable > tbody > tr').first();

		// ClassName으로 up인지 down인지 판별
		let upDown = className.attr('class')?.replace(/(\s*)/g, "") === 'point_up' ? '+' : '-';
		// nasdaq은 등락비율 제공을 안해줘서 별도로 등락비율 계산
		data.rate = `${rateVal} ${upDown}${calcRate(data.val, rateVal, upDown).toFixed(2)}`;

	}

	if (type && type === 'exchange') {
		data.val = $('#exchangeList .value').first().text();
		let upDown = $('#exchangeList .head_info .blind').text();
		data.rate = `${upDown.substring(1, 3) === '상승' ? '+' : '-'}${$('#exchangeList .change').first().text()}`;

	}

	if (!type) {
		data.val = $('#now_value').text();
		data.rate = $('#change_value_and_rate').text().split('%')[0];
	}

	return data;

}

const calcRate = (todayIndex: string, differenceVal: string, updown: string) => {
	todayIndex = todayIndex.replace(",", ""), differenceVal = differenceVal.replace(",", "");
	let yesterdayIndex = updown === 'up' ? (Number(todayIndex) - Number(differenceVal)) : (Number(todayIndex) + Number(differenceVal));
	return (Number(differenceVal) / yesterdayIndex) * 100;
}