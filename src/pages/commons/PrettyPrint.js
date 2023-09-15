import { Box, Typography } from "@mui/material";

const PrettyPrint = ({ keyName, value, ignoreFields }) => {
  if ((ignoreFields || []).includes(keyName)) return '';
  if (value === null || value === undefined) {
    return (
      <Typography gutterBottom>
        <strong>{keyName}</strong>:{" "}
        <Typography color="textSecondary" component="span">
          - empty -
        </Typography>
      </Typography>
    );
  }
  if (!isNaN(+value)) {
    return (
      <Typography gutterBottom>
        <strong>{keyName}</strong>:{" "}
        <Typography color="secondary" component="span">
          {(+value).toLocaleString()}
        </Typography>
      </Typography>
    );
  }
  if (typeof value === "string") {
    return (
      <Typography gutterBottom>
        <strong>{keyName}</strong>: {value}
      </Typography>
    );
  }
  if (value instanceof Array) {
    return (
      <>
        <Typography gutterBottom>
          <strong>{keyName}</strong>:
        </Typography>
        <Box sx={{ pl: 2, pb: 1 }}>
          {value.map((val, idx) => (
            <PrettyPrint
              key={idx}
              keyName={`#${idx}`}
              value={val}
              ignoreFields={ignoreFields}
            />
          ))}
        </Box>
      </>
    );
  }
  if (typeof value === "object") {
    return (
      <>
        <Typography gutterBottom>
          <strong>{keyName}</strong>:
        </Typography>
        <Box sx={{ pl: 2, pb: 1 }}>
          {Object.entries(value).map(([valueKey, valueVal]) => (
            <PrettyPrint
              key={valueKey}
              keyName={valueKey}
              value={valueVal}
              ignoreFields={ignoreFields}
            />
          ))}
        </Box>
      </>
    );
  }
  return (
    <Typography gutterBottom>
      <strong>{keyName}</strong>: {value}
    </Typography>
  );
};

export default PrettyPrint