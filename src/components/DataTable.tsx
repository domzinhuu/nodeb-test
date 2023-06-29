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
import { Info } from "phosphor-react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { NodebTooltip } from "./Tooltip";

interface DataTableProps {
  data: any;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    width: "100%",
    maxWidth: 450,
    fontSize: "0.75rem",
    border: "1px solid #dadde9",
    padding: "1rem",
  },
  [`& .${tooltipClasses.tooltip} p`]: {
    paddingBottom: "0.5rem",
  },
  [`& .${tooltipClasses.tooltip} ul li:first-child`]: {
    paddingTop: "1rem",
  },
  [`& .${tooltipClasses.tooltip} ul li`]: {
    paddingBottom: "1rem",
  },
}));

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
      <div className="p-4">
        <p className="text-2xl font-bold w-full flex items-center gap-2">
          Comércios
          <NodebTooltip
            content={
              <React.Fragment>
                <Typography color="inherit">INFORMAÇÃO</Typography>
                <u>Visão dos valores separados por credenciador, sendo:</u>
                <ul>
                  <li>
                    {" "}
                    <b>- Último pagamento agendado:</b>{" "}
                    <em>A data do pagamento futuro mais distante</em>
                  </li>
                  <li>
                    <b>- Valor a comprometido:</b>{" "}
                    <em>
                      Montante descontado da sua agenda que foi utilizado em
                      alguma negociação (ex: antecipação, cessão de garantia,
                      etc...)
                    </em>
                  </li>
                  <li>
                    <b>- Valor a receber:</b>{" "}
                    <em>
                      Valor líquido que você irá receber ou que poderá usar em
                      alguma negociação
                    </em>
                  </li>
                  <li>
                    <b>- Valor total:</b>{" "}
                    <em>
                      montante referente a todo valor transacionado que compõe
                      sua agenda
                    </em>
                    (valor comprometido + valor a receber)
                  </li>
                </ul>
              </React.Fragment>
            }
          >
            <Info size={24} className="text-purple-700 cursor-pointer" />
          </NodebTooltip>
        </p>
      </div>
      {consolidateData?.map((row: any) => (
        <Accordion
          className="hover:bg-slate-50"
          sx={{
            backgroundColor: `${
              expanded === row.document && "rgb(249 250 251)"
            }`,
          }}
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
                  <b className="text-red-500">
                    - {formatToCurrency(row.totalPayValue)}
                  </b>
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
                        Último Pagamento agendado
                      </Typography>
                    </TableCell>
                    <TableCell className="font-bold" align="right">
                      <Typography variant="body1">
                        Valor comprometido
                      </Typography>
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
                        <Typography variant="body1" className="text-red-500">
                          - {formatToCurrency(acquirer.valorPagar)}
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
