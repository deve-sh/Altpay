import styled from "@emotion/styled";

const StyledButton = styled.button`
	padding: 1.5rem;
	border-radius: 0.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	cursor: pointer;
	background: ${(props) =>
		props.variant === "primary" ? "var(--primary)" : "var(--white)"};
	color: ${(props) =>
		props.variant === "primary" ? "var(--white)" : "var(--primary)"};
	border: 0.1rem solid var(--primary);
	text-transform: uppercase;
	font-weight: bold;
	letter-spacing: 0.05rem;
	font-size: 1rem;

	&:hover {
		${(props) =>
			props.variant !== "primary"
				? `
            background: var(--primary);
            color: var(--white);
        `
				: ""}
	}
`;

const Button = ({
	children,
	label,
	onClick,
	variant = "primary",
	...props
}) => {
	return (
		<StyledButton onClick={onClick} variant={variant} {...props}>
			{children || label}
		</StyledButton>
	);
};

export default Button;
