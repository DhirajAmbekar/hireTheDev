import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [hitOtp, setHitOtp] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value.length === 1) {
      const nextIndex = index + 1;
      if (nextIndex < otp.length) {
        document.getElementById(`otp-${nextIndex}`).focus();
      }
    }
  };

  useEffect(() => {
    if (hitOtp) {
      otp?.forEach((_, index) => {
        document
          .getElementById(`otp-${index}`)
          .addEventListener("keyup", (e) => {
            if (e.key === "Backspace" && index > 0) {
              document.getElementById(`otp-${index - 1}`).focus();
            }
          });
      });
    }
  }, [otp, hitOtp]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg p-6 bg-white rounded-lg shadow-md w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Login</h2>
        <div className="mb-4">
          <TextField
            id="filled-basic"
            label="Email id"
            variant="filled"
            value={email}
            className="w-full"
            onChange={(e) => {
              handleEmailChange(e);
            }}
          />
        </div>
        {hitOtp ? (
          <div className="flex justify-center mb-4 space-x-2 w-full">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                id={`otp-${index}`}
                value={otp[index]}
                onChange={(e) => handleOtpChange(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            ))}
          </div>
        ) : (
          ""
        )}
        <Button
          variant="contained"
          className="w-full"
          onClick={() => {
            setHitOtp((prev) => !prev);
          }}
        >
          {hitOtp ? "Re-Send Otp" : "Send Otp"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
