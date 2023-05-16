"use client";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

export default function UserDataSettings() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userDataJson, setUserDataJson] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserDataJson(data);
        }
        setIsLoading(false);
      });
  }, []);

  const saveUserData = async () => {
    setIsLoading(true);
    if (userDataJson) {
      await fetch("http://localhost:3000/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataJson),
      }).then(() => {
        toast.success("Dados salvos com sucesso!", {
          autoClose: 3000,
          theme: "colored",
          position: "top-right",
        });
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="bg-white lg:w-[50%] w-full rounded-lg p-4">
      <p className="pb-2">
        Adicione aqui o JSON contendo o request que deseja ver no dashboard.
      </p>
      <AceEditor
        className="rounded-lg"
        fontSize={14}
        width="100%"
        value={userDataJson}
        onChange={setUserDataJson}
        mode="json"
        setOptions={{ useWorker: false }}
        theme="twilight"
        name="jsonEditor"
      />
      <div className="py-4 flex justify-end">
        <Button
          disabled={isLoading || !userDataJson}
          onClick={saveUserData}
          className="disabled:bg-gray-200 disabled:text-gray-600"
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
