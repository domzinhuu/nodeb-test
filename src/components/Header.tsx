'use client'
import Typography from "@mui/material/Typography";

function Header() {
  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <Typography variant="h4" className="lg:h-6 text-md">Dashboard</Typography>
      <Typography variant="h6" className="lg:h-6 text-sm">
        Bem vindo, <b>Maique</b>
      </Typography>
    </div>
  );
}

export default Header;
