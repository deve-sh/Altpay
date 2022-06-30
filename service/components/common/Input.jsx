import { TextField } from "@mui/material";

const Input = ({
	onChange,
	variant = "outlined",
	value,
	error = false,
	label,
	multiple = false,
	defaultValue,
	name,
	placeholder,
	type = "text",
	helperText,
}) => (
	<TextField
		onChange={onChange}
		value={value}
		error={error}
		helperText={helperText}
		defaultValue={defaultValue}
		placeholder={placeholder}
		variant={variant}
		type={type}
		name={name}
		label={label}
		multiple={multiple}
	/>
);

export default Input;
