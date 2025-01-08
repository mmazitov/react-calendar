import './index.css';

interface InputProps {
	inputPlaceholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	type?: string;
	required?: boolean;
}

const Input: React.FC<InputProps> = ({
	inputPlaceholder,
	value,
	onChange,
	type = 'text',
	required,
}) => {
	return (
		<div className="relative input-holder">
			<input
				type={type}
				placeholder={inputPlaceholder}
				value={value}
				onChange={onChange}
				className={`input`}
				required={required}
			/>
		</div>
	);
};

export default Input;
