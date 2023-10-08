import { Box, Divider, Typography } from "@mui/material";

const Section = ({
  title,
  titleVariant = "h4",
  spacing = 6,
  subtitle,
  withoutDivider,
  children,
}) => {
  return (
    <Box sx={{ mb: withoutDivider ? spacing : 2 }} className="print-section">
      <Box sx={{ mb: spacing }}>
        <Typography variant={titleVariant}>{title}</Typography>
        {subtitle && <Typography variant="body2">{subtitle}</Typography>}
      </Box>

      {children}

      {!withoutDivider && <Divider sx={{ mt: spacing }} />}
    </Box>
  );
};

export default Section;
