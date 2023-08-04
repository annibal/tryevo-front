import { Box, Divider, Typography } from "@mui/material";

const Section = ({ title, withoutDivider, children }) => {
  return (
    <Box sx={{ mb: withoutDivider ? 6 : 2 }}>
      <Typography variant="h4" sx={{ mb: 6 }}>
        {title}
      </Typography>

      {children}

      {!withoutDivider && <Divider sx={{ mt: 6 }} />}
    </Box>
  );
};

export default Section;
