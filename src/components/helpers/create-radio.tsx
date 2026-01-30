import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

interface RadioFieldProps<T extends string> {
  label: string;
  name: string;        
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
}

export function RadioField<T extends string>({
  label,
  name,
  options,
  value,
  onChange
}: RadioFieldProps<T>) {
  return (
    <FormControl margin="normal">
      <FormLabel>{label}</FormLabel>

      <RadioGroup
        row
        name={name}               
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map(opt => (
          <FormControlLabel
            key={opt}
            value={opt}
            control={<Radio />}
            label={opt}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}