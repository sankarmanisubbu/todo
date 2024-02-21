import React, { useState, useCallback, useEffect } from "react";
import CalciButton from "./calci-button/calculator-button";
import { clear } from "console";
interface CalculatorState {
    firstvalue: string;
    secondvalue: string;
    operator: string;
    result?: string;
}

const Calculator: React.FC = () => {
    const [value, setValue] = useState<CalculatorState>
        ({
            firstvalue: "0",
            secondvalue: "",
            operator: "",
            result: "0",
        });
    const handleButtonpress = (digit: string) => {
        const digitvalue: number = parseInt(digit);
        if (Number.isNaN(digitvalue)) {
            handleSymbol(digit);
        } else {
            handleNumber(digit);
        }
    }
    const handleNumber = useCallback((num: string) => {
        if (num === '0' && value.firstvalue === '0') {
            return;
        }
        if (num === "." && value.firstvalue!.includes(".")) {
            return;
        }
        setValue({
            ...value,
            firstvalue:
                value.firstvalue === "0" ? num : value.firstvalue + num,
        });
    },[value.firstvalue]);
    const clear = useCallback(() => {
        setValue({
            ...value,
            firstvalue: '',
            secondvalue: '',
            operator: '',
            result: '',
        });
    },[]);
    const deletechar = useCallback(() => {
        setValue({
            ...value,
            firstvalue: value.firstvalue.slice(0, -1),
        })
    },[value.firstvalue]);
    const selectoperator = useCallback((operand: string) => {
        if (value.firstvalue === '' && value.secondvalue === '') {
            return;
        } else if (value.firstvalue!.includes("+" || "-" || "/" || "*")) {
            return;
        } else if (value.firstvalue === "") {
            setValue({ ...value, operator: operand });
        } else if (value.secondvalue === "") {
            setValue({
                ...value,
                secondvalue: value.firstvalue,
                firstvalue: "",
                operator: operand,
                result: "",
            });
        } else {
            setValue({
                ...value,
                firstvalue: "",
                operator: operand,
                secondvalue: evaluate(value) ?? "",
                result: "",
            });
        }
    },[value]);
    const evaluate = useCallback((value: CalculatorState) => {
        const {firstvalue, secondvalue, operator} = value;
        if(secondvalue === undefined){
            return;
        }
        const first = parseFloat(firstvalue);
        const second = parseFloat(secondvalue);
        if(isNaN(first) && isNaN(second)){
            return;
        }
        let calculation = 0;
        switch(operator){
            case "+":
                calculation = second + first;
                break;
            case "-":
                calculation = second - first;
                break;
            case "*":
                calculation = second * first;
                break;
            case "/":
                calculation = second / first;
                break;
        }
        return calculation.toString();
    },[value]);
    const setEqual = useCallback(() => {
        if(value.firstvalue === '' || value.secondvalue === '' || value.operator === ''){
            return;
        }
        setValue({
            ...value,
            firstvalue : evaluate(value) ?? "",
            secondvalue : '',
            operator : '',
            result : '',
        });
    },[value]);
    const getper = useCallback(() =>{
        if(value.firstvalue === ""){
            return;
        }else{
            let pervalue = parseFloat(value.firstvalue);
            let get_per = pervalue / 100;
            setValue({
                ...value,
                firstvalue : get_per.toString(),
                secondvalue : '',
                operator : '',
            })
        }
    },[value.firstvalue]);
    const handleSymbol = useCallback((symbol: string) => {
        switch (symbol) {
            case 'C':
                clear();
                break;
            case 'DEL':
                deletechar();
                break;
            case '.':
                handleNumber(symbol);
                break;
            case '+':
            case '-':
            case '/':
            case '*':
                selectoperator(symbol);
                break;
            case "=":
                setEqual();
                break;
            case "%":
                getper();
                break;
        }
    },[value]);
    return (
        <div className="w-[250px] m-auto">
            <h1 className="bg-blue-500 uppercase text-white text-center 
            font-sans text-3xl mt-5 p-3 font-bold">Calculator</h1>
            <div className="bg-blue-300">
                <div className="mb-4 font-bold">
                    <input type="text" readOnly className="w-full
                     bg-gray-100 text-right text-xl px-2 py-3
                      rounded-lg focus:outline-none" value={value.firstvalue}></input>
                </div>
                <div>
                    <CalciButton handleOnPress={handleButtonpress} />
                </div>
            </div>
        </div>
    )
}
export default Calculator;
/*
import { useEffect, useMemo, useCallback, useState } from "react";
import CalciButton from "./components/CalciButton";

type CalculatorState = {
  currentOperand: string;
  previousOperand?: string;
  operation?: string;
  memory?: string;
};

function Calci() {
  const [state, setState] = useState<CalculatorState>({
    currentOperand: "Welcome",
    previousOperand: "",
    operation: "",
    memory: "",
  });

  function evaluate(state: CalculatorState) {
    const { currentOperand, previousOperand, operation } = state;
    if (previousOperand == undefined) {
      return "";
    }
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) && isNaN(current)) {
      return "";
    }
    let computation = 0;
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
    }
    return computation.toString();
  }

  const selectOperator = useCallback(
    (operand: string) => {
      if (state.currentOperand == "" && state.previousOperand == "") {
        return;
      } else if (state.currentOperand!.includes("+" || "-" || "/" || "*")) {
        return;
      } else if (state.currentOperand == "") {
        setState({ ...state, operation: operand });
      } else if (state.previousOperand == "") {
        setState({
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: "",
          operation: operand,
          memory: "",
        });
      } else {
        setState({
          ...state,
          currentOperand: "",
          operation: operand,
          previousOperand: evaluate(state),
          memory: "",
        });
      }
    },
    [state]
  );
  const clear = useCallback(() => {
    setState({
      ...state,
      currentOperand: "",
      previousOperand: "",
      operation: "",
      memory: "",
    });
  }, []);

  const deleteCharacter = useCallback(() => {
    setState({ ...state, currentOperand: state.currentOperand.slice(0, -1) });
  }, [state.currentOperand]);

  const appendNumber = useCallback(
    (digit: string) => {
      if (digit === "0" && state.currentOperand === "0") {
        return;
      }
      if (digit === "." && state.currentOperand!.includes(".")) {
        return;
      }
      setState({
        ...state,
        currentOperand:
          state.currentOperand === "0" ? digit : state.currentOperand + digit,
      });
    },
    [state.currentOperand]
  );

  useMemo(() => {
    if (
      state.currentOperand == "" ||
      state.previousOperand == "" ||
      state.operation == ""
    ) {
      return;
    }
    setState({
      ...state,
      currentOperand: evaluate(state),
      operation: "",
      previousOperand: "",
      memory: state.previousOperand + state.operation! + state.currentOperand,
    });
  }, [state.currentOperand, state.previousOperand, state.operation]);
  useEffect(() => {
    state.currentOperand = "";
    state.previousOperand = "";
  }, []);

  return (
    <>
      <div className="output">
        <div className="previous-operand">
          {state.memory != "" && state.memory}
          {state.previousOperand != "" && state.previousOperand}
          {state.operation != "" && state.operation}
        </div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={clear}>
        C
      </button>
      <CalciButton onClick={deleteCharacter} digit="DEL"></CalciButton>
      <CalciButton onClick={() => selectOperator("/")} digit="/"></CalciButton>
      <CalciButton onClick={() => selectOperator("*")} digit="*"></CalciButton>
      <button onClick={() => appendNumber("7")}>7</button>
      <button onClick={() => appendNumber("8")}>8</button>
      <button onClick={() => appendNumber("9")}>9</button>
      <button onClick={() => selectOperator("-")}>-</button>
      <button onClick={() => appendNumber("4")}>4</button>
      <button onClick={() => appendNumber("5")}>5</button>
      <button onClick={() => appendNumber("6")}>6</button>
      <button onClick={() => selectOperator("+")}>+</button>
      <button onClick={() => appendNumber("1")}>1</button>
      <button onClick={() => appendNumber("2")}>2</button>
      <button onClick={() => appendNumber("3")}>3</button>
      <button className="span-two">=</button>
      <button onClick={() => appendNumber("0")}>0</button>
      <button onClick={() => appendNumber(".")}>.</button>
    </>
  );
}

export default Calci;
*/