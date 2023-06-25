"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import * as React from "react";
import { formatToCurrency } from "@/utils/helper.functions";
import { DashboardContext } from "@/app/context/DashboardContext";

interface DataTableProps {
  data: any;
}

export default function DataTable({ data }: DataTableProps) {
  const [expanded, setExpanded] = React.useState(false);
  const { consolidateData } = React.useContext(DashboardContext);
  const handleChange =
    (panel: any) =>
    (event: any, isExpanded: boolean): void => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto border rounded-lg bg-white overflow-y-scroll">
      {consolidateData?.map((row: any) => (
        <Accordion
          className="hover:bg-slate-50"
          key={row.document}
          expanded={expanded === row.document}
          onChange={handleChange(row.document)}
        >
          <AccordionSummary
            className="w-full"
            expandIcon={expanded ? <MdExpandLess /> : <MdExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex xl:flex-row w-full justify-between flex-wrap flex-col py-4">
              <Typography className="flex-shrink-0">
                {row.document} - Nome do comercio LTDA.
              </Typography>

              <div className="flex-1 flex lg:flex-row lg:pt-0 pt-4 flex-col lg:justify-start">
                <Typography className=" xl:w-[30%] xl:text-right">
                  <span className="block">Total a pagar:</span>
                  <b>{formatToCurrency(row.totalPayValue)}</b>
                </Typography>
                <Typography className="xl:w-[30%] xl:text-right">
                  <span className="block">Total a receber:</span>
                  <b>{formatToCurrency(row.totalReceiveValue)}</b>
                </Typography>
                <Typography className="xl:w-[30%] xl:text-right">
                  <span className="block">Valor total:</span>
                  <b>{formatToCurrency(row.totalValue)}</b>
                </Typography>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold">Adquirente</TableCell>
                    <TableCell className="font-bold" align="right">
                      <Typography variant="body1">
                        {" "}
                        Último Pagamento{" "}
                      </Typography>
                    </TableCell>
                    <TableCell className="font-bold" align="right">
                      <Typography variant="body1">Valor a pagar</Typography>
                    </TableCell>
                    <TableCell className="font-bold" align="right">
                      <Typography variant="body1">Valor a receber</Typography>
                    </TableCell>
                    <TableCell className="font-bold" align="right">
                      <Typography variant="body1">Valor total</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.acquirers.map((acquirer: any) => (
                    <TableRow
                      key={acquirer.document}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant="body1">
                          {" "}
                          {acquirer.document} - Nome Adquirente
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">
                          {acquirer.ultimoPagamento}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">
                          {formatToCurrency(acquirer.valorPagar)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">
                          {formatToCurrency(acquirer.valorReceber)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">
                          {formatToCurrency(acquirer.valorTotal)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
