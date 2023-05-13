"use client";

import { Person, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <main className="w-full h-screen grid place-content-center">
      <div className="w-[500px] bg-white drop-shadow-lg shadow-black rounded-lg p-16 text-center">
        <Typography variant="h4">Nodeb</Typography>
        <Typography variant="body2">
          Faça login para ter acesso a plataforma
        </Typography>

        <div className="mt-4 flex flex-col gap-5">
          <FormControl
            color="primary"
            fullWidth
            variant="standard"
            sx={{ m: 1 }}
          >
            <InputLabel htmlFor="standard-adornment-login">Login</InputLabel>
            <Input
              id="standard-adornment-weight"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="Icone login">
                    <Person />
                  </IconButton>
                </InputAdornment>
              }
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </FormControl>

          <FormControl
            color="primary"
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "Ocultar password" : "Exibir senha"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button className="bg-purple-800 text-white mt-8" variant="contained">
            Conectar
          </Button>
          <Button
            className="text-purple-800 mt-4"
            variant="text"
            disableRipple={true}
            disableFocusRipple={true}
          >
            Esqueci minha senha
          </Button>
        </div>
      </div>
    </main>
  );
}
