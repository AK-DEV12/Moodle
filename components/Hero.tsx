//Important to keep HERO and stuff not behind AUTH well as server components for SEO
import { Fugaz_One } from "next/font/google";
import React from "react";
import Button from "./Button";
import Calender from "./Calender";
import Link from "next/link";
import CallToAction from "./CallToAction";

const fugazOne = Fugaz_One({ weight: "400", subsets: ["latin"] });

export default function Hero() {
  return (
    <div className="py-4 md:py-10 text-center flex flex-col gap-4 sm:gap-8">
      <h1 className={"text-5xl sm:text-6xl md:text-7xl " + fugazOne.className}>
        <span className="textGradient">Moodle</span> helps you track your{" "}
        <span className="textGradient">daily</span> mood!
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl w-full mx-auto max-w-[600px]">
        Create your mood record and see how you feel on{" "}
        <span className="font-bold">every day of every year.</span>
      </p>
      <CallToAction />
      <Calender demo />
    </div>
  );
}
