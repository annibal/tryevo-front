import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import LoaderTryEvo from "../LoaderTryEvo";

const DashChartWrapper = ({
  loading,
  enabled,
  data,
  error,
  children,
  title,
  titleButtonContent,
  onClick,
}) => {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };

  // console.log(title, [loading, enabled, data, error])

  if (!enabled) return "";

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            {titleButtonContent && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleClick}
              >
                {titleButtonContent}
              </Button>
            )}
          </Grid>
        </Grid>
        {error ? (
          <Box sx={{ p: 2, minHeight: "160px" }}>
            <Typography color="error">{String(error.message || error)}</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              minHeight: "160px",
            }}
          >
            {loading ? <LoaderTryEvo /> : children}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DashChartWrapper;
