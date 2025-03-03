"use client"
import React from "react";
import { Button, TextField } from "@mui/material";

import { add, getDelimiter, getDelimiters, getValues, reduceNumbers } from "./common";

export default function Page() {



  const [inputString, setInputString] = React.useState("")
  const [formula, setformula] = React.useState("")
  const [error, setError] = React.useState("")
  const [result, setResult] = React.useState("")
  const [altDelimiter, setAltDelimiter] = React.useState("\n") // just in case if you want to specifiy any other custom delimeter


  const handleClick = () => {
    try {
      console.log("inputString", inputString)

      const delimiterSettings = inputString.split("\n")[0];
      console.log("delimiterSettings", delimiterSettings)

      if (delimiterSettings.slice(0, 2) === '//' && !inputString.split('\n')[1]) {
        throw new Error('There is nothing to parse for the calculation.');
      };
      const delimiters = getDelimiter(delimiterSettings, altDelimiter);
      console.log("delimiters", delimiters)

      const values = getValues(inputString, delimiters);
      console.log("values", values)

      const formulaToSet = inputString ? values.join(` ${"+"} `) + ' =' : "0";
      console.log("formulaToSet", formulaToSet)

      setformula(formulaToSet)
      let resultToSet = add(values);
      console.log("resultToSet", resultToSet)

      setResult(resultToSet)
      setError("")

    } catch (error) {
      console.log("error", error)
      setError(error.toString())
    }

  }


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "3rem", border: "3px solid black", rowGap: "1rem", padding: "1rem" }}>


      <h1>String Calculator</h1>

      <div style={{ border: "2px solid green", padding:"0.5rem" }}>
        {formula} {result}
      </div>
      <div style={{ color: "red" }}>
        {error}
      </div>
      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder="1,2,3 or //;\n1,2;3"
        value={inputString}
        onChange={({ target: { value } }) => {
          setInputString(value)
        }}
      />
      <Button fullWidth variant="contained" onClick={handleClick}>Calculate</Button>


    </div>
  );
}
