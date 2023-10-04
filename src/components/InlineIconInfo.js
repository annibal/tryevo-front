import { Box, Grid, Typography } from "@mui/material";

const InlineIconInfo = ({ Icon, title, children, ...restProps }) => {
  return (
    <Box className="vaga-created-at" {...restProps}>
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
