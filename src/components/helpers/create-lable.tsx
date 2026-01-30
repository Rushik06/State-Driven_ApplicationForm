import { FormLabel } from '@mui/material';

interface LabelProps {
  text: string;
  htmlFor?: string;
  required?: boolean;
}

export function Label({ text, htmlFor, required }: LabelProps) {
  return (
    <FormLabel
      htmlFor={htmlFor}
      required={required}
      sx={{
        mb: 0.5,
        fontWeight: 500
      }}
    >
      {text}
    </FormLabel>
  );
}