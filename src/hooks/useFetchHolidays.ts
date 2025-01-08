import axios from 'axios';
import { useEffect, useState } from 'react';

interface Holiday {
	date: string;
	localName: string;
}

const useFetchHolidays = (currentYear: number) => {
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const country = 'US';
	useEffect(() => {
		axios
			.get(
				`https://date.nager.at/api/v3/publicholidays/${currentYear}/${country}`,
			)
			.then((response) => {
				setHolidays(response.data);
			})
			.catch((error) => {
				if (axios.isAxiosError(error)) {
					console.error(
						'Ошибка загрузки праздников:',
						error.response?.status,
						error.response?.data,
					);
				} else {
					console.error('Неизвестная ошибка:', error);
				}
			});
	}, [currentYear, country]);

	return { holidays, setHolidays };
};

export default useFetchHolidays;
