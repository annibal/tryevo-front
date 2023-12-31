import { Box, Grid, Typography } from "@mui/material";

const InlineIconInfo = ({
  Icon,
  title,
  children,
  end = false,
  ...restProps
}) => {
  return end ? (
    <Box {...restProps}>
      <Grid container spacing={2}>
        <Grid item xs sx={{ textAlign: 'right' }}>
          {title && <Typography color="textSecondary">{title}:</Typography>}
          {children}
        </Grid>
        <Grid item>
          <Typography color="textSecondary">
            {Icon && (
              <Icon
                color="inherit"
                fontSize="inherit"
                sx={{ verticalAlign: "-2px", transform: 'scaleX(-1)' }}
              />
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box {...restProps}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography color="textSecondary">
            {Icon && (
              <Icon
                color="inherit"
                fontSize="inherit"
                sx={{ verticalAlign: "-2px" }}
              />
            )}
          </Typography>
        </Grid>
        <Grid item xs>
          {title && <Typography color="textSecondary">{title}:</Typography>}
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InlineIconInfo;
