import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const developersData = [
  { name: "John Doe", role: "Frontend Developer", skills: "React, JavaScript", experience: "3 years" },
  { name: "Jane Smith", role: "Backend Developer", skills: "Node.js, Express", experience: "5 years" },
  { name: "Alice Johnson", role: "Full Stack Developer", skills: "React, Node.js", experience: "4 years" },
  { name: "Bob Brown", role: "DevOps Engineer", skills: "AWS, Docker", experience: "6 years" },
  { name: "Charlie Davis", role: "Data Scientist", skills: "Python, Machine Learning", experience: "2 years" },
  { name: "Eve Wilson", role: "Mobile Developer", skills: "Flutter, Dart", experience: "3 years" },
];

export const DeveloperList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDevelopers, setFilteredDevelopers] = useState(developersData);
  const { theme } = useContext(ThemeContext);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredDevelopers(developersData);
    } else {
      setFilteredDevelopers(
        developersData.filter(
          (developer) =>
            developer.name.toLowerCase().includes(term.toLowerCase()) ||
            developer.role.toLowerCase().includes(term.toLowerCase()) ||
            developer.skills.toLowerCase().includes(term.toLowerCase()) ||
            developer.experience.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <div className={`w-full mt-16 px-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className={`p-8 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="text-2xl font-bold mb-4">Developer List</h1>
        <input
          type="text"
          className={`w-full p-2 border rounded mb-4 ${theme === "dark" ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300"}`}
          placeholder="Search by name, role, skills, or experience"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredDevelopers.map((developer, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md flex flex-col justify-between ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <div>
                <h2 className="text-xl font-semibold">{developer.name}</h2>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Role: {developer.role}</p>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Skills: {developer.skills}</p>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Experience: {developer.experience}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
