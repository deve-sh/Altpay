import { TextField } from "@mui/material";

const Input = ({
	onChange,
	variant = "outlined",
	value,
	error = false,
	multiple = false,
	defaultValue,
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
		multiple={multiple}
	/>
);

export default Input;
