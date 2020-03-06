import request from 'request';

export const crawl = (url: string) => {
	return new Promise<string>((resolve, reject) => {
		request.get(url, (err, res) => {
			if (err) reject(err);
			resolve(res.body);
		})
	})
}