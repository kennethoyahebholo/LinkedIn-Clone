const Button = ({ ...buttonProps }) => {
	const { children } = buttonProps;
	return <button {...buttonProps}>{children}</button>;
};

export default Button;
