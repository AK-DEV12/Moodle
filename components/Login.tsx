"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";

interface formDataProps {
  email?: string;
  password?: string;
}

const fugazOne = Fugaz_One({ weight: "400", subsets: ["latin"] });

export default function Login() {
  const [formData, setFormData] = useState<formDataProps>({});
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signUp, login } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit() {
    if (!formData.email || !formData.password || formData.password.length < 6) {
      console.log(formData);
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegister) {
        await signUp(formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAuthenticating(false);
    }
  }
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugazOne.className}>
        {isRegister ? "Register" : "Log In"}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border-2 border-indigo-300 rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
        name="email"
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border-2 border-indigo-300 rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        type="password"
      />
      <div className="max-w-[350px] w-full mx-auto">
        <Button
          onClick={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        ></Button>
      </div>
      <p>
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button
          className="text-indigo-600"
          onClick={() => setIsRegister((prevState) => !prevState)}
        >
          {isRegister ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
