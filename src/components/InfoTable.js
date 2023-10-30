import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const InfoTable = ({ data, width }) => (
  <Table size="small">
    <TableBody>
      {data.map((item, idx) => {
        if (item.value == null) return "";
        return (
          <TableRow key={idx} sx={{ verticalAlign: "top" }}>
            <TableCell
              sx={{
                width,
                border: "none",
                py: 0,
                pl: 0,
              }}
            >
              <Typography noWrap color="text.secondary" align="right">
                {item.name}:
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                width: "100%",
                border: "none",
                py: 0,
                pr: 0,
                pl: 0,
              }}
            >
              <Typography>{item.value}</Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

export default InfoTable;
