interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <span className="error-message">
      {message}
    </span>
  );
}

/*import { Typography } from '@mui/material';

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <Typography
      variant="caption"
      color="error"
      sx={{ mt: 0.5, display: 'block' }}
    >
      {message}
    </Typography>
  );
}*/