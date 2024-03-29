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
import {
  formatDate,
  formatToDocument,
  formatToCurrency,
} from "@/utils/helper.functions";
import { DashboardContext } from "@/app/context/DashboardContext";
import { Funnel, Info } from "phosphor-react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { NodebTooltip } from "./Tooltip";

interface DataTableProps {
  data: any;
  showFilterButton?: boolean;
  onFilterOpen?: () => void;
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

export default function DataTable({
  data,
  showFilterButton = false,
  onFilterOpen,
}: DataTableProps) {
  const [expanded, setExpanded] = React.useState(false);
  const { consolidateData } = React.useContext(DashboardContext);
  const handleChange =
    (panel: any) =>
    (event: any, isExpanded: boolean): void => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="md:col-span-2 bg-white">
      <div className="py-2 px-4 bg-slate-50 rounded-lg rounded-b-none border-b border-b-slate-100">
        <div className="font-bold w-full flex justify-between">
          <div className="flex items-center gap-2">
            <Typography variant="h6">Comércios</Typography>
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
              <Info size={24} className="text-primary-500 cursor-pointer" />
            </NodebTooltip>
          </div>

          {showFilterButton && (
            <button
              onClick={onFilterOpen}
              title="Abrir filtros"
              className="text-sm underline flex gap-2 items-center hover:bg-slate-100 font-bold rounded-lg p-2 transition-all duration-100"
            >
              <Funnel size={20} />
            </button>
          )}
        </div>
      </div>
      <div className="w-full relative lg:h-[65vh] h-[50vh] m-auto border rounded-lg bg-white overflow-y-scroll mt-4">
        {consolidateData?.map((row: any, index: number) => (
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
                  Loja {index + 1}
                  <br />
                  <span className="text-md text-slate-500">
                    {formatToDocument(row.document)}
                  </span>
                </Typography>

                <div className="flex-1 flex lg:flex-row lg:pt-0 pt-4 flex-col lg:justify-start">
                  <Typography className="xl:w-[30%] xl:text-right">
                    <span className="block">Valor total:</span>
                    <b>{formatToCurrency(row.totalValue)}</b>
                  </Typography>
                  <Typography className="xl:w-[30%] xl:text-right">
                    <span className="block">Total a receber:</span>
                    <b>{formatToCurrency(row.totalReceiveValue)}</b>
                  </Typography>

                  <Typography className=" xl:w-[30%] xl:text-right">
                    <span className="block">Total a pagar:</span>
                    <b className="text-red-500">
                      - {formatToCurrency(row.totalPayValue)}
                    </b>
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-bold"><Typography variant="body2" fontWeight={"bold"}>Maquininha</Typography></TableCell>
                      <TableCell className="font-bold" align="right">
                        <Typography variant="body2" fontWeight={"bold"}>Valor total</Typography>
                      </TableCell>
                      <TableCell className="font-bold" align="right">
                        <Typography variant="body2" fontWeight={"bold"}>Valor a receber</Typography>
                      </TableCell>
                      <TableCell className="font-bold" align="right">
                        <Typography variant="body2" fontWeight={"bold"}>
                          Valor comprometido
                        </Typography>
                      </TableCell>
                      <TableCell className="font-bold" align="right">
                        <Typography variant="body2" fontWeight={"bold"}>
                          Último Pagamento agendado
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.acquirers.map((acquirer: any) => (
                      <TableRow
                        key={acquirer.document}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography variant="body1">
                            {" "}
                            {acquirer.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1">
                            {formatToCurrency(acquirer.valorTotal)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1">
                            {formatToCurrency(acquirer.valorReceber)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1" className="text-red-500">
                            - {formatToCurrency(acquirer.valorPagar)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1">
                            {formatDate(acquirer.ultimoPagamento)}
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
    </div>
  );
}
