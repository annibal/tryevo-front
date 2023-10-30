import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { isValidElement } from "react";

const InfoTable = ({ data, width }) => (
  <Table size="small">
    <TableBody>
      {data.map((item, idx) => {
        if (item.value == null) return "";

        const isNameNode = isValidElement(item.name);
        const isValueNode = isValidElement(item.value);
        return (
          <TableRow key={idx} sx={{ verticalAlign: "top" }}>
            <TableCell
              sx={{
                minWidth: width,
                maxWidth: width,
                border: "none",
                py: 0,
                pl: 0,
              }}
            >
              {isNameNode ? (
                item.name
              ) : (
                <Typography noWrap color="text.secondary" align="right">
                  {item.name}:
                </Typography>
              )}
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
              {isValueNode ? item.value : <Typography>{item.value}</Typography>}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

export default InfoTable;
