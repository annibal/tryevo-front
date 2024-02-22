import { Box, Grid, Typography } from "@mui/material";

const InlineIconInfo = ({
  Icon,
  title,
  children,
  end = false,
  oneLine = false,
  noIcon = false,
  ...restProps
}) => {
  const titleProps = oneLine
    ? {
        color: "text.secondary",
        variant: "body2",
        sx: { marginInlineEnd: "0.5em" },
        component: "span",
      }
    : {
        color: "text.secondary",
      };

  return end ? (
    <Box {...restProps}>
      <Grid container spacing={2}>
        <Grid item xs sx={{ textAlign: "right" }}>
          {title && <Typography {...titleProps}>{title}:</Typography>}
          {children}
        </Grid>
        {!noIcon && (
          <Grid item>
            <Typography color="textSecondary">
              {Icon && (
                <Icon
                  color="inherit"
                  fontSize="inherit"
                  sx={{ verticalAlign: "-2px", transform: "scaleX(-1)" }}
                />
              )}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  ) : (
    <Box {...restProps}>
      <Grid container spacing={2}>
        {!noIcon && (
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
        )}
        <Grid item xs>
          {title && <Typography {...titleProps}>{title}:</Typography>}
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InlineIconInfo;
