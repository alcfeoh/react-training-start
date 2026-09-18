import {LicensePlateData} from '../license-plate-data.type';

const BASE_URL = 'http://localhost:8000';

export function getLicensePlates(): Promise<LicensePlateData[]> {
	return fetch(BASE_URL + '/data')
		.then(response => response.json());
}
