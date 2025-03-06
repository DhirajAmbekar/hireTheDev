import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    otp: ["", "", "", ""],
    hitOtp: false,
    emailError: false,
    resendOtpTimer: 10,
    isSendingOtp: false,
  });

  const navigate = useNavigate();
  useEffect(() => {
    let timer;
    if (state.isSendingOtp && state.resendOtpTimer > 0) {
      timer = setInterval(() => {
        setState((prev) => {
          if (prev.resendOtpTimer === 1) {
            clearInterval(timer);
            return { ...prev, isSendingOtp: false, resendOtpTimer: 10 };
          }
          return { ...prev, resendOtpTimer: prev.resendOtpTimer - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state.isSendingOtp]);

  const handleSendOtp = () => {
    setState((prev) => ({
      ...prev,

      hitOtp: true,
      isSendingOtp: true,
      resendOtpTimer: 10,
    }));
  };

  const handleEditEmail = () => {
    setState((prev) => ({
      ...prev,
      otp: ["", "", "", ""],
      hitOtp: false,
      isSendingOtp: false,
      resendOtpTimer: 10,
    }));
  };
  const handleOtpChange = (e, index) => {
    const newOtp = [...state.otp];
    if (!isNaN(e.target.value) && e.target.value.length <= 1) {
      newOtp[index] = e.target.value;
    }

    setState((prev) => ({ ...prev, otp: newOtp }));

    if (e.target.value.length === 1 && index < state.otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    // If all 4 OTP digits are filled, call the API
    const otpCode = newOtp.join("");
    if (otpCode.length === 4) {
      handleVerifyOtp(otpCode);
    }
  };

  const handleVerifyOtp = async (otpCode) => {
    try {
      const response = await fetch("YOUR_OTP_VERIFICATION_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          otp: otpCode,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("OTP verified successfully!");
        // Proceed to the next step
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      navigate("/roleselector")
      // alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Login</h2>

        <div className="w-full min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!state.hitOtp ? (
              <motion.div
                key="email"
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                <TextField
                  label="Email id"
                  variant="filled"
                  value={state.email}
                  className="w-full"
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      email: e.target.value,
                      emailError: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        e.target.value
                      ),
                    }))
                  }
                  error={state.emailError}
                  helperText={state.emailError ? "Invalid email" : ""}
                />
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-center mb-2">
                  <p className="text-gray-500">
                    Send OTP to{" "}
                    <span className="underline text-blue-500">
                      {state.email}
                    </span>
                  </p>
                  <button
                    onClick={handleEditEmail}
                    className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                </div>
                <div className="flex justify-center space-x-2 w-full">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      id={`otp-${index}`}
                      value={state.otp[index]}
                      // onChange={(e) => {
                      //   const newOtp = [...state.otp];
                      //   if (
                      //     !isNaN(e.target.value) &&
                      //     e.target.value.length <= 1
                      //   ) {
                      //     newOtp[index] = e.target.value;
                      //   }
                      //   setState((prev) => ({ ...prev, otp: newOtp }));
                      //   if (
                      //     e.target.value.length === 1 &&
                      //     index < state.otp.length - 1
                      //   ) {
                      //     document.getElementById(`otp-${index + 1}`).focus();
                      //   }
                      // }}

                      onChange={(e) => handleOtpChange(e, index)}
                      // onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          const newOtp = [...state.otp];
                          if (newOtp[index]) {
                            newOtp[index] = "";
                          } else if (index > 0) {
                            newOtp[index - 1] = "";
                            document.getElementById(`otp-${index - 1}`).focus();
                          }
                          setState((prev) => ({ ...prev, otp: newOtp }));
                        }
                      }}
                      className="w-12 h-12 text-center text-lg font-semibold rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="1"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          variant="contained"
          className="w-full mt-6"
          onClick={handleSendOtp}
          disabled={state.isSendingOtp}
        >
          {state.hitOtp ? "Re-Send OTP" : "Send OTP"}
        </Button>

        {state.isSendingOtp && (
          <div className="w-full mt-4 text-center text-gray-600">
            <p>OTP is being sent...</p>
            <p>{state.resendOtpTimer} seconds left</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
