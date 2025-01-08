import './index.css';

interface SearchInputProps {
	inputPaceholder: string;
	inputButtonValue: React.ReactNode;
}
const SearchInput: React.FC<SearchInputProps> = ({
	inputPaceholder,
	inputButtonValue,
}) => {
	return (
		<div className="relative input-holder">
			<input type="text" placeholder={inputPaceholder} className="input" />
			<button className="top-[50%] right-[5px] absolute bg-transparent border-none hover:border-none translate-y-[-50%] focus:outline-none focus-visible:outline-none">
				{inputButtonValue}
			</button>
		</div>
	);
};

export default SearchInput;
