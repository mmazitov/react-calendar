'use client';
import './index.css';

// ButtonProps interface defines the structure for the Button component's props
interface ButtonProps {
	value: React.ReactNode; // The content or label of the button (e.g., text or JSX elements)
	onClick?: () => void; // Optional click handler for the button
	className?: string; // Optional custom CSS class for additional styling
	variant?: 'primary' | 'secondary' | 'danger'; // Defines the button style variant (primary, secondary, or danger)
	type: 'button' | 'submit' | 'reset'; // Specifies the button type (default: 'button')
}

// Button component for rendering a customizable button
const Button: React.FC<ButtonProps> = ({
	value, // The content of the button (text or elements like icons)
	onClick, // Click handler function (if provided)
	className, // Additional custom CSS classes
	variant = 'primary', // Default variant is 'primary'
	type = 'button', // Default type is 'button'
}) => {
	// Base class for the button, applies general styling
	const baseClasses = `button`;

	// Object mapping the variant to its corresponding CSS class
	const variantClasses = {
		primary: `primary`, // 'primary' class for main action buttons
		secondary: `secondary`, // 'secondary' class for less prominent buttons
		danger: `danger`, // 'danger' class for warning or destructive actions
	};

	return (
		// The button element with dynamic classes based on the provided props
		<button
			className={`${baseClasses} ${variantClasses[variant]} ${className}`} // Combines base, variant, and custom classes
			onClick={onClick} // Executes the click handler if provided
			type={type} // Specifies the button type (e.g., 'submit')
		>
			{value} {/*The content of the button, such as text or JSX elements*/}
		</button>
	);
};

export default Button;
