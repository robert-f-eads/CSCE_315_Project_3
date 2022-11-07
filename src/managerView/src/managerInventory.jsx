import React from 'react';

import '../styles/managerInventory.css';

import { product } from '../../dataStructures/dataStructuresExports';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(product) {
    return { id: product.id, name: product.name, price: product.price };
}

const rows = [
  createData(new product(1, "hulk", 4.34, [])),
  createData(new product(2, "Sandwhich", 2.34, [])),
  createData(new product(3, "Eclair", 5.95, [])),
  createData(new product(4, "Cupcake", 9.99, [])),
  createData(new product(5, "Gingerbread", 14.55, [])),
];


function ManagerInventory() {
    return (
        <>
          <TableContainer id="managerInventoryTable" component={Paper}>
            <Table sx={{ minWidth: 65}} aria-label="simple table">
              <caption>Product names and prices</caption>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
    )
}

export default ManagerInventory;
