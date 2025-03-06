import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
  IconButton,
  Paper,
  Chip,
} from "@mui/material";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

export const Employer = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    webUrl: "",
    companyType: "",
    jobs: [{ role: "", experience: "", skills: [], salary: "" }],
  });
  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs[index][field] = value;
    setFormData({ ...formData, jobs: updatedJobs });
  };

  const handleAddJob = () => {
    setFormData((prevState) => ({
      ...prevState,
      jobs: [...prevState.jobs, { role: "", experience: "", skills: [], salary: "" }],
    }));
  };

  const handleRemoveJob = (index) => {
    const updatedJobs = formData.jobs.filter((_, i) => i !== index);
    setFormData({ ...formData, jobs: updatedJobs });
  };

  const handleAddSkill = (index, e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      const updatedJobs = [...formData.jobs];
      updatedJobs[index].skills.push(skillInput.trim());
      setFormData({ ...formData, jobs: updatedJobs });
      setSkillInput("");
      e.preventDefault();
    }
  };

  const handleRemoveSkill = (jobIndex, skillToRemove) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs[jobIndex].skills = updatedJobs[jobIndex].skills.filter(
      (skill) => skill !== skillToRemove
    );
    setFormData({ ...formData, jobs: updatedJobs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <Container maxWidth="sm">
      <Box className="bg-white p-8 rounded-lg shadow-lg mt-10">
        <Typography variant="h4" component="h1" gutterBottom>
          Employer Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Web URL"
                name="webUrl"
                value={formData.webUrl}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Type"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Jobs</Typography>
              {formData.jobs.map((job, index) => (
                <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <TextField
                      fullWidth
                      label="Job Role"
                      value={job.role}
                      onChange={(e) =>
                        handleJobChange(index, "role", e.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Expected Experience"
                      value={job.experience}
                      onChange={(e) =>
                        handleJobChange(index, "experience", e.target.value)
                      }
                      variant="outlined"
                    />
                    {/* <Typography variant="h6">Skills Required</Typography> */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Skills Required"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => handleAddSkill(index, e)}
                      placeholder="Press Enter to add skill"
                    />
                    <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                      {job.skills.map((skill, i) => (
                        <Chip
                          key={i}
                          label={skill}
                          onDelete={() => handleRemoveSkill(index, skill)}
                          color="primary"
                        />
                      ))}
                    </Box>
                    <TextField
                      fullWidth
                      label="Salary"
                      value={job.salary}
                      onChange={(e) =>
                        handleJobChange(index, "salary", e.target.value)
                      }
                      variant="outlined"
                    />
                    <Box display="flex" justifyContent="space-between">
                      {index === formData.jobs.length - 1 && (
                        <IconButton onClick={handleAddJob} color="primary">
                          <AiOutlinePlus />
                        </IconButton>
                      )}
                      {formData.jobs.length > 1 && (
                        <IconButton
                          onClick={() => handleRemoveJob(index)}
                          color="secondary"
                        >
                          <AiOutlineDelete />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Grid>
          </Grid>
          <Button
            variant="contained"
            className="w-full mt-6"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};
