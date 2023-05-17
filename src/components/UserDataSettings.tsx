"use client";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import { js_beautify } from "js-beautify";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

export default function UserDataSettings() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userDataJson, setUserDataJson] = useState("");
  useEffect(() => {
    fetch("http://173.230.136.213:8080/node-api/userdata")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const { _id, __v, ...otherParams } = data[0]; // removendo o _id e a versão pois não preciso, checkar para tirar isso na api
          const jsonStringify = JSON.stringify(otherParams);
          const options = { indent_size: 2, space_in_empty_paren: true };
          setUserDataJson(js_beautify(jsonStringify, options));
        }
        setIsLoading(false);
      });
  }, []);

  const saveUserData = async () => {
    setIsLoading(true);
    if (userDataJson) {
      await fetch("http://173.230.136.213:8080/node-api/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userDataJson,
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
