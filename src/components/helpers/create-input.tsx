import { TextField } from '@mui/material';

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
}

export function InputField({
  type = 'text',
  value,
  onChange,
  label,
  placeholder,
  readOnly = false
}: InputFieldProps) {
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={
        onChange
          ? (e) => onChange(e.target.value)
          : undefined
      }
      InputProps={{
        readOnly
      }}
      variant="outlined"
    />
  );
}