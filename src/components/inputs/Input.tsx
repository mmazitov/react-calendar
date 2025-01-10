'use client';
import './index.css'; // Importing the CSS file for styling the component

// Defining the props interface for the Input component
interface InputProps {
	inputPlaceholder: string; // The placeholder text for the input field
	value: string; // The current value of the input field
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // The function to handle changes in the input value
	className?: string; // Optional class for additional styling
	type?: string; // Type of input, default is 'text'
	required?: boolean; // Whether the input is required for form submission
}

const Input: React.FC<InputProps> = ({
	inputPlaceholder,
	value,
	onChange,
	type = 'text', // Defaulting the type to 'text'
	required,
}) => {
	return (
		<div className="relative input-holder">
			{' '}
			{/* Wrapper div for the input */}
			{/* Input field */}
			<input
				type={type} // Sets the input type, e.g., 'text', 'email', 'password'
				placeholder={inputPlaceholder} // Placeholder text for the input field
				value={value} // Sets the current value of the input field
				onChange={onChange} // Calls the onChange handler whenever the input value changes
				className={`input`} // Applying the input styling class
				required={required} // Whether the input is required
			/>
		</div>
	);
};

export default Input;
