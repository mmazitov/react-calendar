'use client';
import './index.css'; // Importing CSS file for styling

interface SearchInputProps {
	inputPaceholder: string; // Placeholder text for the input field
	inputButtonValue: React.ReactNode; // The content to display inside the button (e.g., icon or text)
	onSearchChange: (value: string) => void; // Function to handle changes in the input field
}

const SearchInput: React.FC<SearchInputProps> = ({
	inputPaceholder,
	inputButtonValue,
	onSearchChange,
}) => {
	return (
		<div className="relative input-holder">
			{/* Search input field */}
			<input
				type="text" // The type of input field is text
				placeholder={inputPaceholder} // Setting placeholder text for the input
				className="input" // Applying input styling from the CSS
				onChange={(e) => onSearchChange(e.target.value)} // Calling onSearchChange function whenever the input value changes
			/>
			{/* Button next to the input field */}
			<button className="top-[50%] right-[5px] absolute bg-transparent border-none hover:border-none translate-y-[-50%] focus:outline-none focus-visible:outline-none">
				{/* The button content is dynamic and passed as the inputButtonValue prop */}
				{inputButtonValue}
			</button>
		</div>
	);
};

export default SearchInput;
