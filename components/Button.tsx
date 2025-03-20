import { Fugaz_One } from "next/font/google";
import React from "react";

interface ButtonProps {
  text: string;
  dark?: boolean;
  full?: boolean;
}

const fugazOne = Fugaz_One({ weight: "400", subsets: ["latin"] });

export default function Button({ text, dark, full, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={
        "border-indigo-600 rounded-full overflow-hidden border-2 border-solid duration-20 hover:opacity-60 cursor-pointer " +
        (dark ? "text-white bg-indigo-600 " : "text-indigo-600 ") +
        (full && "w-full")
      }
    >
      <p
        className={
          "px-6 sm::px-10 whitespace-nowrap py-2 sm:py-3 " + fugazOne.className
        }
      >
        {text}
      </p>
    </button>
  );
}
