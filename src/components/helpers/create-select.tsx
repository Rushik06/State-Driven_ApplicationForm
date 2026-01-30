import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface SelectFieldProps<T extends string> {
  label: string;
  options: readonly T[];
  value: T | '';
  onChange: (value: T | null) => void;
}

export function SelectField<T extends string>({
  label,
  options,
  value,
  onChange
}: SelectFieldProps<T>) {

  function handleChange(e: SelectChangeEvent<string>) {
    const v = e.target.value;
    onChange(v ? (v as T) : null);
  }

  return (
    <FormControl
      fullWidth
      size="small"
      margin="normal"
      variant="outlined"
    >
      {/* 🔑 IMPORTANT: labelId */}
      <InputLabel id={`${label}-label`}>
        {label}
      </InputLabel>

      <Select
        labelId={`${label}-label`}
        value={value}
        label={label}     
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>-- Select --</em>
        </MenuItem>

        {options.map(o => (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}