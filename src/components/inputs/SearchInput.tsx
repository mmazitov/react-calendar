import './index.css';

interface SearchInputProps {
	inputPaceholder: string;
	inputButtonValue: React.ReactNode;
	onSearchChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
	inputPaceholder,
	inputButtonValue,
	onSearchChange,
}) => {
	return (
		<div className="relative input-holder">
			<input
				type="text"
				placeholder={inputPaceholder}
				className="input"
				onChange={(e) => onSearchChange(e.target.value)}
			/>
			<button className="top-[50%] right-[5px] absolute bg-transparent border-none hover:border-none translate-y-[-50%] focus:outline-none focus-visible:outline-none">
				{inputButtonValue}
			</button>
		</div>
	);
};

export default SearchInput;
