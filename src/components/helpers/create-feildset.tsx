import type { ReactNode } from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{ mb: 2, fontWeight: 600 }}
      >
        {title}
      </Typography>

      <Box>
        {children}
      </Box>
    </Paper>
  );
}