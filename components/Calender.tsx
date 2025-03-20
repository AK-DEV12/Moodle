"use client";
import { baseRating, demoData, gradients } from "@/utils/gradients";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

interface CalenderProps {
  demo?: boolean;
  completeData?: null | object;
}

export default function Calender({ demo, completeData }: CalenderProps) {
  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[now.getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    monthsArr.indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const numericMonth = monthsArr.indexOf(selectedMonth);

  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleMonthChange(val: number) {
    if (numericMonth === 0 && val < 0) {
      setSelectedYear((prevState) => prevState - 1);
      setSelectedMonth(Object.keys(months)[11]);
    } else if (numericMonth === 11 && val > 0) {
      setSelectedYear((prevState) => prevState + 1);
      setSelectedMonth(Object.keys(months)[0]);
    } else setSelectedMonth(Object.keys(months)[numericMonth + val]);
  }

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:-y-10">
      <div className="flex gap-4 justify-center w-full items-center mb-8">
        <button onClick={() => handleMonthChange(-1)}>back</button>
        <h3
          className={"text-center text-3xl text-indigo-600 " + fugaz.className}
        >
          {selectedMonth}
        </h3>
        <button onClick={() => handleMonthChange(+1)}>forward</button>
      </div>
      {[...Array(numRows).keys()].map((row, rowIndex) => {
        return (
          <div className="grid grid-cols-7 gap-1" key={rowIndex}>
            {dayList.map((day, index) => {
              const dayIndex = rowIndex * 7 + index - (firstDayOfMonth - 1);
              const dayDisplay =
                dayIndex > daysInMonth
                  ? false
                  : row === 0 && dayIndex <= 0
                  ? false
                  : true;

              const isToday = dayIndex === now.getDate();

              if (!dayDisplay) {
                return <div className="bg-white" key={index} />;
              }

              const color = demo
                ? gradients.indigo[baseRating[dayIndex]]
                : dayIndex in data
                ? gradients.indigo[data[dayIndex]]
                : "white";

              return (
                <div
                  style={{ background: color }}
                  className={
                    "text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " +
                    (isToday ? " border-indigo-400 " : "border-indigo-100 ") +
                    (color === "white" ? "text-indigo-400 " : "text-white")
                  }
                  key={index}
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
