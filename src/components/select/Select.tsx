'use client';

import { Option } from '../../types/types';
import './index.css';

interface SelectProps {
	options: Option[];
	value: string | number;
	onChange: (value: string | number) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	required?: boolean;
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
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className={`relative select-holder ${className}`}>
			<select
				value={value}
				onChange={handleChange}
				disabled={disabled}
				className="select"
				required={required}
			>
				<option value="" disabled hidden>
					{placeholder}
				</option>
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
