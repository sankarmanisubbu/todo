import React, { ButtonHTMLAttributes } from "react";
interface Props {
    handleOnPress: (value: string) => void;
}
export default function CalciButton ({ handleOnPress }: Props) {
    const onPress = (event:React.MouseEvent<HTMLButtonElement>) => {
        const value: HTMLButtonElement = event.currentTarget;
        handleOnPress(value.name);
    }
    return (
        <div>
            <div>
                <button name="C" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">C</button>
                <button name="DEL" onClick={onPress} className="w-[106px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">DEL</button>
                <button name="/" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">/</button>
            </div>
            <div>
                <button name="7" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">7</button>
                <button name="8" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">8</button>
                <button name="9" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">9</button>
                <button name="*" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">*</button>
            </div>
            <div>
                <button name="4" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">4</button>
                <button name="5" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">5</button>
                <button name="6" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">6</button>
                <button name="-" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">-</button>
            </div>
            <div>
                <button name="1" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">1</button>
                <button name="2" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">2</button>
                <button name="3" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">3</button>
                <button name="+" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">+</button>
            </div>
            <div>
                <button name="%" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">%</button>
                <button name="0" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">0</button>
                <button name="." onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">.</button>
                <button name="=" onClick={onPress} className="w-[46px] bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2 hover:bg-gray-400 hover:text-white">=</button>
            </div>
        </div>
        /*<button onClick={onclick}
            className="bg-gray-200 text-xl font-bold px-4 py-2 rounded-lg focus:outline-none m-2">
            {label}
        </button>*/
    )
}
