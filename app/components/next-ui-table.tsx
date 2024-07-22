"use client";

import React from "react";

// table components
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

export const NextUITable = ({ data }) => {
  let headers = data.headers.map((header, index) => (
    <TableColumn
      className="font-normal text-neutral-600 dark:text-neutral-300 dark:bg-neutral-800"
      key={index}
    >
      {header}
    </TableColumn>
  ));
  let rows = data.rows.map((row, index) => (
    <TableRow key={index}>
      {row.map((cell, cellIndex) => (
        <TableCell
          className="text-neutral-500 dark:text-neutral-400"
          key={cellIndex}
        >
          {cell}
        </TableCell>
      ))}
    </TableRow>
  ));

  return (
    <Table className="mt-7 mb-8" removeWrapper aria-label="Table component">
      <TableHeader>{headers}</TableHeader>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};
