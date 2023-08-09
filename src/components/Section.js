import { Box, Divider, Typography } from "@mui/material";

const Section = ({ title, subtitle, withoutDivider, children }) => {
  return (
    <Box sx={{ mb: withoutDivider ? 6 : 2 }}>
      <Box  sx={{ mb: 6 }}>
        <Typography variant="h4">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2">
            {subtitle}
          </Typography>
        )}
      </Box>

      {children}

      {!withoutDivider && <Divider sx={{ mt: 6 }} />}
    </Box>
  );
};

export default Section;
