import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const jobsData = [
  {
    role: "Software Engineer",
    companyName: "Tech Corp",
    salary: "$100,000",
    location: "San Francisco, CA",
    description: "Develop and maintain scalable software applications.",
    requirements: "Experience with JavaScript, React, and Node.js.",
  },
  {
    role: "Product Manager",
    companyName: "Innovate Ltd",
    salary: "$90,000",
    location: "New York, NY",
    description: "Lead product development and collaborate with teams.",
    requirements: "Strong leadership and analytical skills.",
  },
  {
    role: "Data Scientist",
    companyName: "DataWorks",
    salary: "$110,000",
    location: "Chicago, IL",
    description: "Analyze large datasets to derive insights.",
    requirements: "Experience with Python, SQL, and Machine Learning.",
  },
  {
    role: "UX Designer",
    companyName: "DesignPro",
    salary: "$85,000",
    location: "Remote",
    description: "Create user-friendly designs and wireframes.",
    requirements: "Proficiency in Figma, Sketch, or Adobe XD.",
  },
  {
    role: "DevOps Engineer",
    companyName: "CloudNet",
    salary: "$105,000",
    location: "Seattle, WA",
    description: "Maintain cloud infrastructure and CI/CD pipelines.",
    requirements: "Experience with AWS, Docker, and Kubernetes.",
  },
  {
    role: "QA Engineer",
    companyName: "QualityFirst",
    salary: "$95,000",
    location: "Austin, TX",
    description: "Ensure software quality through automated testing.",
    requirements: "Experience with Selenium, Cypress, or Jest.",
  },
  {
    role: "Business Analyst",
    companyName: "BizSolutions",
    salary: "$80,000",
    location: "Boston, MA",
    description: "Analyze business processes and recommend improvements.",
    requirements: "Experience with data analysis and reporting tools.",
  },
  {
    role: "Cybersecurity Analyst",
    companyName: "SecureNet",
    salary: "$120,000",
    location: "Washington, D.C.",
    description: "Protect systems and data from security threats.",
    requirements:
      "Knowledge of firewalls, encryption, and compliance standards.",
  },
  {
    role: "HR Manager",
    companyName: "PeopleFirst",
    salary: "$85,000",
    location: "Los Angeles, CA",
    description: "Manage hiring, onboarding, and employee relations.",
    requirements: "Experience with HR policies and recruitment strategies.",
  },
  {
    role: "Cloud Architect",
    companyName: "CloudSphere",
    salary: "$130,000",
    location: "San Diego, CA",
    description: "Design and implement cloud solutions.",
    requirements: "Experience with AWS, Azure, or Google Cloud.",
  },
  {
    role: "Marketing Manager",
    companyName: "BrandWave",
    salary: "$95,000",
    location: "Denver, CO",
    description: "Develop and execute marketing campaigns.",
    requirements: "Strong knowledge of digital marketing and SEO.",
  },
  {
    role: "Front-End Developer",
    companyName: "WebCraft",
    salary: "$90,000",
    location: "Miami, FL",
    description: "Create responsive and interactive web interfaces.",
    requirements: "Expertise in HTML, CSS, JavaScript, and React.",
  },
  {
    role: "Full Stack Developer",
    companyName: "CodeWorks",
    salary: "$110,000",
    location: "Portland, OR",
    description: "Develop both front-end and back-end applications.",
    requirements: "Proficiency in JavaScript, Node.js, and databases.",
  },
  {
    role: "IT Support Specialist",
    companyName: "TechHelp",
    salary: "$70,000",
    location: "Dallas, TX",
    description: "Provide technical support and troubleshoot IT issues.",
    requirements: "Familiarity with networking and system administration.",
  },
  {
    role: "AI Engineer",
    companyName: "NeuralTech",
    salary: "$140,000",
    location: "Palo Alto, CA",
    description: "Build and optimize AI and machine learning models.",
    requirements: "Experience with TensorFlow, PyTorch, and NLP.",
  },
  {
    role: "Database Administrator",
    companyName: "DataSafe",
    salary: "$100,000",
    location: "Houston, TX",
    description: "Manage and optimize databases for performance and security.",
    requirements: "Knowledge of SQL, PostgreSQL, and database tuning.",
  },
  {
    role: "Network Engineer",
    companyName: "NetConnect",
    salary: "$95,000",
    location: "Atlanta, GA",
    description: "Design and maintain network infrastructure.",
    requirements: "Experience with Cisco, firewall configuration, and routing.",
  },
  {
    role: "Game Developer",
    companyName: "PlayVision",
    salary: "$105,000",
    location: "Orlando, FL",
    description: "Develop engaging video games for multiple platforms.",
    requirements: "Proficiency in Unity, C++, or Unreal Engine.",
  },
  {
    role: "Technical Writer",
    companyName: "DocuPro",
    salary: "$75,000",
    location: "Philadelphia, PA",
    description: "Write and edit technical documentation and manuals.",
    requirements: "Excellent writing skills and technical knowledge.",
  },
  {
    role: "E-commerce Manager",
    companyName: "ShopEase",
    salary: "$88,000",
    location: "Remote",
    description: "Oversee online store operations and growth strategies.",
    requirements: "Experience with Shopify, Magento, or WooCommerce.",
  },
];

export const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [selectedJob, setSelectedJob] = useState(null);
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
        <h1 className="text-2xl font-bold mb-4">Job List</h1>
        <input
          type="text"
          className={`w-full p-2 border rounded mb-4 ${
            theme === "dark"
              ? "border-gray-700 bg-gray-700 text-white"
              : "border-gray-300"
          }`}
          placeholder="Search by role, company name, or salary"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto"
          style={{ maxHeight: "70vh" }}
        >
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md flex flex-col justify-between cursor-pointer 
                          ${
                            theme === "dark"
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
              onClick={() => setSelectedJob(job)}
            >
              <div>
                <h2 className="text-xl font-semibold">{job.role}</h2>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Company: {job.companyName}
                </p>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Salary: {job.salary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96 text-black relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl font-bold mb-2">{selectedJob.role}</h2>
            <p className="text-gray-700">
              <strong>Company:</strong> {selectedJob.companyName}
            </p>
            <p className="text-gray-700">
              <strong>Salary:</strong> {selectedJob.salary}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {selectedJob.location}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Description:</strong> {selectedJob.description}
            </p>
            <p className="text-gray-700">
              <strong>Requirements:</strong> {selectedJob.requirements}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded "
              onClick={() => setSelectedJob(null)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
