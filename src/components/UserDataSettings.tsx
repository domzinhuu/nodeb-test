"use client";
import { Button, Typography } from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";

import { useEffect, useState } from "react";
import { API_URL } from "@/constants/variables";

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
    if (userDataJson) {
      await fetch("http://localhost:3000/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataJson),
      });

      alert("Salvo!");
    }
  };

  if (isLoading) return <Typography variant="body2">Loading...</Typography>;
  return (
    <main>
      <Typography variant="h4">Mock de dados de usuário</Typography>

      <div className="bg-white lg:w-[50%] w-full rounded-lg p-4 mt-4">
        <Typography variant="body1" className="pb-2">
          Adicione aqui o JSON contendo o request que deseja ver no dashboard.
        </Typography>
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
            onClick={saveUserData}
            variant="contained"
            className="bg-purple-800 text-white p-1 rounded-lg w-[100px]"
          >
            Salvar
          </Button>
        </div>
      </div>
    </main>
  );
}
