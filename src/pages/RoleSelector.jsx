import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="text-2xl font-bold mb-4 text-amber-950">Select your role</div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => {
              navigate("/employeeform");
            }}
          >
            Employee
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={() => {
              navigate("/employerform");
            }}
          >
            Employer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
