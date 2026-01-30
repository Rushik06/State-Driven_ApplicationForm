import {
  FormControlLabel,
  Checkbox
} from '@mui/material';

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxField({
  label,
  checked,
  onChange
}: CheckboxFieldProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          typeof='checkbox'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={label}
    />
  );
}