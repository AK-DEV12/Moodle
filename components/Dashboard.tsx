"use client";
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calender from "./Calender";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import Login from "./Login";
import Loading from "./Loading";
const fugazOne = Fugaz_One({ weight: "400", subsets: ["latin"] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState(null);

  const moods = {
    "&*@#$": "😭",
    Sad: "😢",
    Existing: "😕",
    Goood: "😌",
    Elated: "😍",
  };

  const statuses = {
    num_days: 14,
    average_mood: Object.keys(moods)[Math.floor(computeValues())],
    time_remaining: `${24 - new Date().getHours()}hrs and ${
      60 - new Date().getMinutes()
    }mins`,
  };

  function computeValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;
    for (const year in data) {
      for (const month in data[year]) {
        for (const day in data[year][month]) {
          const days_mood = data[year][month][day];
          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }

    return sum_moods / total_number_of_days;
  }

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  async function handleSetMood(mood: number) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;
      setData(newData);
      setUserDataObj(newData);

      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log("Error has occuered " + err);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-4 sm:gap-8 md:gap-12">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg">
        {Object.keys(statuses).map((status, index) => {
          return (
            <div key={index} className="p-4 flex flex-col gap-1 sm:gap-2">
              <p className="font-medium uppercase text-xs sm:text-sm truncate ">
                {status.replaceAll("_", " ")}
              </p>
              <p className={"text-base sm:text-lg " + fugazOne.className}>
                {statuses[status as keyof typeof statuses]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + fugazOne.className
        }
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-10">
        {Object.keys(moods).map((mood, index) => {
          return (
            <button
              onClick={() => handleSetMood(index + 1)}
              key={index}
              className={
                "p-4 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 " +
                (index === 4 ? " col-span-1" : "")
              }
            >
              <p className="text-5xl sm:text-6xl md:text-7xl">
                {moods[mood as keyof typeof moods]}
              </p>
              <p className={"text-indigo-500 " + fugazOne.className}>{mood}</p>
            </button>
          );
        })}
      </div>
      <Calender completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
