import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
// import { getUserTypeFromToken } from "../utils/auth"; // Assume this function checks the token and returns 'employee' or 'employer'

export const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const [userType, setUserType] = useState("employee"); // Dummy userType
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // const userType = getUserTypeFromToken();
    // setUserType(userType);
    // Fetch profile data based on user type
    // Assume fetchProfileData is a function that fetches profile data
    fetchProfileData(userType).then((data) => setProfileData(data));
  }, [userType]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`w-full mt-16 px-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className={`p-8 rounded-lg shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {userType === "employee" ? (
          <div>
            <h2 className="text-xl font-semibold">Employee Profile</h2>
            <p>Name: {profileData.name}</p>
            <p>Email: {profileData.email}</p>
            <p>Phone: {profileData.phone}</p>
            <p>Description: {profileData.description}</p>
            <h3 className="text-lg font-semibold mt-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-semibold mt-4">Projects</h3>
            {profileData.projects.map((project, index) => (
              <div key={index} className={`p-4 rounded-lg shadow-md mt-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                <p>Project Name: {project.name}</p>
                <p>Type: {project.type}</p>
                <p>Description: {project.description}</p>
                <p>URL: <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a></p>
                <h4 className="text-md font-semibold mt-2">Skills Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skillsUsed.map((skill, i) => (
                    <span key={i} className="bg-green-500 text-white px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">Employer Profile</h2>
            <p>Company Name: {profileData.companyName}</p>
            <p>Address: {profileData.address}</p>
            <p>Web URL: <a href={profileData.webUrl} target="_blank" rel="noopener noreferrer">{profileData.webUrl}</a></p>
            <p>Company Type: {profileData.companyType}</p>
            <h3 className="text-lg font-semibold mt-4">Jobs</h3>
            {profileData.jobs.map((job, index) => (
              <div key={index} className={`p-4 rounded-lg shadow-md mt-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                <p>Role: {job.role}</p>
                <p>Experience: {job.experience}</p>
                <p>Salary: {job.salary}</p>
                <h4 className="text-md font-semibold mt-2">Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="bg-red-500 text-white px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Mock function to fetch profile data
const fetchProfileData = async (userType) => {
  // Replace with actual API call
  if (userType === "employee") {
    return {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      description: "A passionate developer.",
      skills: ["React", "JavaScript", "Node.js"],
      projects: [
        {
          name: "Project A",
          type: "Web Development",
          skillsUsed: ["React", "Node.js"],
          description: "A web development project.",
          url: "https://project-a.com",
        },
      ],
    };
  } else {
    return {
      companyName: "Tech Corp",
      address: "123 Tech Street",
      webUrl: "https://techcorp.com",
      companyType: "Software",
      jobs: [
        {
          role: "Software Engineer",
          experience: "3 years",
          skills: ["React", "JavaScript"],
          salary: "$100,000",
        },
      ],
    };
  }
};
