'use client';
import './index.css';

interface ButtonProps {
	value: React.ReactNode;
	onClick?: () => void;
	className?: string;
	variant?: 'primary' | 'secondary' | 'danger';
	type: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
	value,
	onClick,
	className,
	variant = 'primary',
	type = 'button',
}) => {
	const baseClasses = `button`;

	const variantClasses = {
		primary: `primary`,
		secondary: `secondary`,
		danger: `danger`,
	};

	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]} ${className}`}
			onClick={onClick}
			type={type}
		>
			{value}
		</button>
	);
};

export default Button;
