import axios from 'axios';
import { useEffect, useState } from 'react';
import { Holiday } from '../types/types';

// Custom hook to fetch the list of holidays based on the current year
const useFetchHolidays = (currentYear: number) => {
	// State to store the list of holidays
	const [holidays, setHolidays] = useState<Holiday[]>([]);

	// Country code (US - United States), can be changed if working with other countries
	const country = 'US';

	useEffect(() => {
		// Perform HTTP request to fetch holiday data
		axios
			.get(
				`https://date.nager.at/api/v3/publicholidays/${currentYear}/${country}`,
			)
			.then((response) => {
				// If the request is successful, store the data in the holidays state
				setHolidays(response.data);
			})
			.catch((error) => {
				// Handle errors: if the error is from axios, log the error status and response data
				if (axios.isAxiosError(error)) {
					console.error(
						'Error to load holidays', // Error message
						error.response?.status, // Error status
						error.response?.data, // Error details
					);
				} else {
					console.error('Error:', error); // Handle other errors
				}
			});
	}, [currentYear, country]); // Dependencies: the hook will rerun when the year or country changes

	// Return the holidays list and setHolidays function to be used in components
	return { holidays, setHolidays };
};

export default useFetchHolidays;
