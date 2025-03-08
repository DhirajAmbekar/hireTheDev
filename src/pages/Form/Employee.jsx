import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Chip,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Employee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [],
    description: "",
    projects: [
      { name: "", type: "", skillsUsed: [], description: "", url: "" },
    ],
  });
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] });
      setSkillInput("");
      e.preventDefault();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleAddProject = () => {
    setFormData((prevState) => ({
      ...prevState,
      projects: [
        ...prevState.projects,
        { name: "", type: "", skillsUsed: [], description: "", url: "" },
      ],
    }));
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleProjectSkillChange = (index, e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const updatedProjects = [...formData.projects];
      updatedProjects[index].skillsUsed.push(e.target.value.trim());
      setFormData({ ...formData, projects: updatedProjects });
      e.target.value = "";
      e.preventDefault();
    }
  };

  const handleRemoveProjectSkill = (projIndex, skillToRemove) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[projIndex].skillsUsed = updatedProjects[
      projIndex
    ].skillsUsed.filter((skill) => skill !== skillToRemove);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted:", formData);
      localStorage.setItem("usertype", "employee");
      navigate("/profile");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="bg-white p-8 rounded-lg shadow-lg mt-16">
        <Typography variant="h4" component="h1" gutterBottom className="text-center text-black">
          Employee Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                type="email"
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" className="text-black">Skills</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Press Enter to add skill"
              />
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {formData.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                    color="primary"
                  />
                ))}
              </Box>
            </Grid>
            {/* Description Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" className=" text-black">Projects</Typography>
              {formData.projects.map((project, index) => (
                <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <TextField
                      fullWidth
                      label="Project Name"
                      value={project.name}
                      onChange={(e) =>
                        handleProjectChange(index, "name", e.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Project Type"
                      value={project.type}
                      onChange={(e) =>
                        handleProjectChange(index, "type", e.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Add Skills Used"
                      variant="outlined"
                      onKeyDown={(e) => handleProjectSkillChange(index, e)}
                      placeholder="Press Enter to add skill"
                    />
                    <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                      {project.skillsUsed.map((skill, i) => (
                        <Chip
                          key={i}
                          label={skill}
                          onDelete={() =>
                            handleRemoveProjectSkill(index, skill)
                          }
                          color="primary"
                        />
                      ))}
                    </Box>
                    <TextField
                      fullWidth
                      label="Description"
                      value={project.description}
                      onChange={(e) =>
                        handleProjectChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      multiline
                      rows={2}
                    />
                    <TextField
                      fullWidth
                      label="Project URL"
                      value={project.url}
                      onChange={(e) =>
                        handleProjectChange(index, "url", e.target.value)
                      }
                      variant="outlined"
                    />
                    <Box display="flex" justifyContent="space-between">
                      {index === formData.projects.length - 1 && (
                        <IconButton onClick={handleAddProject} color="primary">
                          <AiOutlinePlus />
                        </IconButton>
                      )}
                      {formData.projects.length > 1 && (
                        <IconButton
                          onClick={() => handleRemoveProject(index)}
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
