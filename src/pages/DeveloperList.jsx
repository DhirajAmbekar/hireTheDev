import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const developersData = [
  {
    name: "John Doe",
    role: "Frontend Developer",
    skills: "React, JavaScript",
    experience: "3 years",
  },
  {
    name: "Jane Smith",
    role: "Backend Developer",
    skills: "Node.js, Express",
    experience: "5 years",
  },
  {
    name: "Alice Johnson",
    role: "Full Stack Developer",
    skills: "React, Node.js",
    experience: "4 years",
  },
  {
    name: "Bob Brown",
    role: "DevOps Engineer",
    skills: "AWS, Docker",
    experience: "6 years",
  },
  {
    name: "Charlie Davis",
    role: "Data Scientist",
    skills: "Python, Machine Learning",
    experience: "2 years",
  },
  {
    name: "Eve Wilson",
    role: "Mobile Developer",
    skills: "Flutter, Dart",
    experience: "3 years",
  },
  {
    name: "David Miller",
    role: "AI Engineer",
    skills: "TensorFlow, Deep Learning",
    experience: "4 years",
  },
  {
    name: "Sophia Carter",
    role: "Game Developer",
    skills: "Unity, C#",
    experience: "5 years",
  },
  {
    name: "Daniel White",
    role: "Cybersecurity Analyst",
    skills: "Penetration Testing, Network Security",
    experience: "7 years",
  },
  {
    name: "Olivia Martin",
    role: "Embedded Systems Engineer",
    skills: "C++, IoT",
    experience: "5 years",
  },
  {
    name: "William Scott",
    role: "Blockchain Developer",
    skills: "Ethereum, Solidity",
    experience: "3 years",
  },
  {
    name: "Emma Lopez",
    role: "Data Engineer",
    skills: "Big Data, SQL",
    experience: "6 years",
  },
  {
    name: "James Parker",
    role: "Cloud Architect",
    skills: "Azure, Kubernetes",
    experience: "8 years",
  },
  {
    name: "Mia Hernandez",
    role: "UI/UX Designer",
    skills: "Figma, Sketch",
    experience: "4 years",
  },
  {
    name: "Benjamin Roberts",
    role: "Software Engineer",
    skills: "Java, Spring Boot",
    experience: "5 years",
  },
  {
    name: "Charlotte Adams",
    role: "IoT Developer",
    skills: "Raspberry Pi, MQTT",
    experience: "3 years",
  },
  {
    name: "Alexander Thomas",
    role: "Automation Engineer",
    skills: "Selenium, CI/CD",
    experience: "6 years",
  },
  {
    name: "Amelia Clark",
    role: "Database Administrator",
    skills: "MySQL, PostgreSQL",
    experience: "7 years",
  },
  {
    name: "Henry Walker",
    role: "Network Engineer",
    skills: "Cisco, Firewall",
    experience: "5 years",
  },
  {
    name: "Lily Hall",
    role: "VR Developer",
    skills: "Unity, Oculus SDK",
    experience: "4 years",
  },
];

export const DeveloperList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDevelopers, setFilteredDevelopers] = useState(developersData);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredDevelopers(
      term.trim() === ""
        ? developersData
        : developersData.filter(
            (developer) =>
              developer.name.toLowerCase().includes(term.toLowerCase()) ||
              developer.role.toLowerCase().includes(term.toLowerCase()) ||
              developer.skills.toLowerCase().includes(term.toLowerCase()) ||
              developer.experience.toLowerCase().includes(term.toLowerCase())
          )
    );
  };

  return (
    <div
      className={`w-full mt-16 px-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">Developer List</h1>
        <input
          type="text"
          className={`w-full p-2 border rounded mb-4 ${
            theme === "dark"
              ? "border-gray-700 bg-gray-700 text-white"
              : "border-gray-300"
          }`}
          placeholder="Search by name, role, skills, or experience"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto"
          style={{ maxHeight: "70vh" }}
        >
          {filteredDevelopers.map((developer, index) => (
            <div
              key={index}
              onClick={() => setSelectedDeveloper(developer)}
              className={`p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <h2 className="text-xl font-semibold">{developer.name}</h2>
              <p className="text-gray-500">Role: {developer.role}</p>
              <p className="text-gray-500">Skills: {developer.skills}</p>
              <p className="text-gray-500">
                Experience: {developer.experience}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedDeveloper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg shadow-lg w-96 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">
              {selectedDeveloper.name}
            </h2>
            <p className="text-gray-500">Role: {selectedDeveloper.role}</p>
            <p className="text-gray-500">Skills: {selectedDeveloper.skills}</p>
            <p className="text-gray-500">
              Experience: {selectedDeveloper.experience}
            </p>
            <p className="mt-4">{selectedDeveloper.description}</p>
            <button
              onClick={() => setSelectedDeveloper(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
