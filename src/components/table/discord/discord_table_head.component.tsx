import * as React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { DiscordMessage } from "@external/discord/discord.type";
import { Order } from "@components/table/table.common";

interface HeadCell {
  disablePadding: boolean;
  id: keyof DiscordMessage;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "sku",
    numeric: false,
    disablePadding: false,
    label: "SKU",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "retailPrice",
    numeric: true,
    disablePadding: false,
    label: "Retail Price",
  },
  {
    id: "stockXLink",
    numeric: false,
    disablePadding: false,
    label: "Stock X Links",
  },
  {
    id: "goatLink",
    numeric: false,
    disablePadding: false,
    label: "Goat Link",
  },
  {
    id: "availableSizes",
    numeric: false,
    disablePadding: false,
    label: "Available Sizes",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Datetime",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DiscordMessage
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order,
    orderBy,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof DiscordMessage) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;