"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { USER_SESSION } from "@/constants/variables";
import { User, checkifUserExist } from "@/functions/auth.functions";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";
import { RxLockClosed, RxLockOpen1 } from "react-icons/rx";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const authentication = (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault();
    setIsLoading(true);
    let logged;
    setTimeout(() => {
      logged = checkifUserExist(username, password);
      if (!logged) {
        toast.error("Login ou senha incorreto!", {
          autoClose: 3000,
          position: "top-right",
          closeOnClick: true,
          theme: "colored",
        });
        setIsLoading(false);
        return;
      }

      saveSession(logged);

      router.push("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="w-full h-screen grid place-content-center">
      <div className="w-[500px] bg-white drop-shadow-lg shadow-black rounded-lg p-16 text-center">
        <h1 className="text-6xl pb-8 uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-green-400">
          Nodeb
        </h1>
        <p>Faça login para ter acesso a plataforma</p>

        <form
          onSubmit={(e) => authentication(e)}
          className="mt-8 flex flex-col gap-8"
        >
          <InputText
            label="Login"
            name="login"
            className="pb-8"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputText
            label="Senha"
            name="password"
            secure={showPassword ? false : true}
            value={password}
            showIcon={true}
            icon={
              showPassword ? (
                <RxLockOpen1
                  onClick={handleClickShowPassword}
                  className="absolute z-10 right-0 text-gray-800 text-2xl cursor-pointer"
                />
              ) : (
                <RxLockClosed
                  onClick={handleClickShowPassword}
                  className="absolute z-10 right-0 text-gray-800 text-2xl cursor-pointer"
                />
              )
            }
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={!username || !password}
            className="disabled:bg-gray-200 disabled:text-gray-600"
            type="submit"
          >
            Conectar
          </Button>
          <Link href={"/"} className="text-purple-800 mt-2">
            Esqueci minha senha
          </Link>
        </form>
      </div>
    </main>
  );
}

function saveSession(userLogged: User): void {
  window.sessionStorage.setItem(USER_SESSION, JSON.stringify(userLogged));
}

function getSession(): User | null {
  const json = window.sessionStorage.getItem(USER_SESSION);

  if (!json) return null;

  return JSON.parse(json);
}
