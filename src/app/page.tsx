"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { USER_SESSION } from "@/constants/variables";
import { User, checkifUserExist } from "@/functions/auth.functions";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormEvent, useContext, useState } from "react";
import { RxLockClosed, RxLockOpen1 } from "react-icons/rx";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "./context/AuthContext";

const loginFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const authentication = async (data: LoginFormInputs) => {
    await login(data.username, data.password);
    router.push("/dashboard");
  };

  return (
    <main className="w-full h-screen grid place-content-center">
      <div className="w-[500px] bg-white drop-shadow-lg shadow-black rounded-lg p-16 text-center">
        <h1 className="text-6xl pb-8 uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-green-400">
          Nodeb
        </h1>
        <p>Faça login para ter acesso a plataforma</p>

        <form
          onSubmit={handleSubmit(authentication)}
          className="mt-8 flex flex-col gap-8"
        >
          <InputText
            label="Login"
            name="username"
            className="pb-8"
            useForm={true}
            register={register}
          />
          <InputText
            label="Senha"
            name="password"
            secure={showPassword ? false : true}
            useForm={true}
            register={register}
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
          />
          <Button
            isLoading={isSubmitting}
            disabled={!isValid}
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
