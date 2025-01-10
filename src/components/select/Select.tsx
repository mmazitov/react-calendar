'use client';

// Import necessary types and styles
import { Option } from '../../types/types';
import './index.css';

interface SelectProps {
	options: Option[]; // Array of options to display in the select dropdown
	value: string | number; // The current selected value
	onChange: (value: string | number) => void; // Function to call when the value changes
	placeholder?: string; // Placeholder text to display when no option is selected
	className?: string; // Additional CSS class for custom styling
	disabled?: boolean; // Flag to disable the select element
	required?: boolean; // Flag to make the select element required
}

const Select: React.FC<SelectProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Select an option',
	className = '',
	disabled = false,
	required = false,
}) => {
	// Handles the change event when a new option is selected
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	return (
		// The wrapper div for custom styling and adding extra classNames
		<div className={`relative select-holder ${className}`}>
			{/* Select dropdown */}
			<select
				value={value}
				onChange={handleChange}
				disabled={disabled}
				className="select"
				required={required}
			>
				{/* Placeholder option, shown when no value is selected */}
				<option value="" disabled hidden>
					{placeholder}
				</option>
				{/* Map over the options array and render an option for each item */}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
