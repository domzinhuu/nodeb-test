"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./globals.css";
import { lightTheme } from "./theme/themes";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="__next" className="bg-gray-50">
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
