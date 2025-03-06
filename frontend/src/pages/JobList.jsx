import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const jobsData = [
  { role: "Software Engineer", companyName: "Tech Corp", salary: "$100,000" },
  { role: "Product Manager", companyName: "Innovate Ltd", salary: "$90,000" },
  { role: "Data Scientist", companyName: "DataWorks", salary: "$110,000" },
  { role: "UX Designer", companyName: "DesignPro", salary: "$85,000" },
  { role: "DevOps Engineer", companyName: "CloudNet", salary: "$105,000" },
  { role: "QA Engineer", companyName: "QualityFirst", salary: "$95,000" },
];

export const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const { theme } = useContext(ThemeContext);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredJobs(jobsData);
    } else {
      setFilteredJobs(
        jobsData.filter(
          (job) =>
            job.role.toLowerCase().includes(term.toLowerCase()) ||
            job.companyName.toLowerCase().includes(term.toLowerCase()) ||
            job.salary.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <div className={`w-full mt-16 px-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className={`p-8 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="text-2xl font-bold mb-4">Job List</h1>
        <input
          type="text"
          className={`w-full p-2 border rounded mb-4 ${theme === "dark" ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300"}`}
          placeholder="Search by role, company name, or salary"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md flex flex-col justify-between ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <div>
                <h2 className="text-xl font-semibold">{job.role}</h2>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Company: {job.companyName}</p>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Salary: {job.salary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
