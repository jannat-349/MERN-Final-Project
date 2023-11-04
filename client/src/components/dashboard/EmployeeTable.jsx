import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Title from "../Title";
import { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { getImageUrl } from "../../utils/imgUrl";
import DashboardContext from "../../contexts/DashboardContext";

export function EmployeeTable({ onDelete }) {
  const navigate = useNavigate();
  const [openDialogs, setOpenDialogs] = useState({});
  const [openDialogs2, setOpenDialogs2] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { employees } = useContext(DashboardContext);

  const handleClickOpen = (employeeId) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [employeeId]: true,
    }));
    setOpenDialogs2((prevState) => ({
      ...prevState,
      [employeeId]: false,
    }));
  };

  const handleClose = (employeeId) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [employeeId]: false,
    }));
    setOpenDialogs2((prevState) => ({
      ...prevState,
      [employeeId]: false,
    }));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img
          src={getImageUrl(params.row.image)}
          alt={params.row.fullName}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      field: "age",
      headerName: "Age",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "position",
      headerName: "Position",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            style={{ marginRight: "10px" }}
            onClick={() => {
              handleEdit(params.row._id);
            }}
          >
            <Edit></Edit>Edit
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleClickOpen(params.row._id)}
          >
            <Delete></Delete>Delete
          </Button>
          <Dialog
            open={openDialogs[params.row._id] || false}
            onClose={() => handleClose(params.row._id)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose(params.row._id);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleDelete(params.row._id);
                  handleClose(params.row._id);
                }}
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ),
    },
  ];

  const handleEdit = (employeeId) => {
    navigate(`/update/${employeeId}`);
  };

  const handleDelete = (employeeId) => {
    onDelete(employeeId);
  };

  const handleRowClick = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setOpenDialogs2((prevState) => ({
        ...prevState,
        [employeeId]: true,
      }));
    }
  };

  const handleCloseDialog = () => {
    setSelectedEmployee(null);
    if (selectedEmployee) {
      setOpenDialogs2((prevState) => ({
        ...prevState,
        [selectedEmployee._id]: false,
      }));
    }
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 490,
          }}
        >
          <Title>Recent Employees</Title>
          <DataGrid
            rows={employees}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
            onRowClick={(params) => handleRowClick(params.row._id)}
          />
        </Paper>
      </Grid>

      <Dialog
        open={openDialogs2[selectedEmployee?._id] || false}
        onClose={handleCloseDialog}
        aria-labelledby="employee-info-dialog-title"
      >
        <DialogTitle id="employee-info-dialog-title">
          Employee Information
        </DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "500px",
                height: "500px",
              }}
            >
              <div
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
              >
                <img
                  src={getImageUrl(selectedEmployee.image)}
                  alt={selectedEmployee.name}
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                  }}
                />
              </div>

              <ul style={{ flex: 1, textAlign: "left" }}>
                <li>ID: {selectedEmployee.id}</li>
                <li>Name: {selectedEmployee.name}</li>
                <li>Age: {selectedEmployee.age}</li>
                <li>Position: {selectedEmployee.position}</li>
                <li>Email: {selectedEmployee.email}</li>
                <li>Phone: {selectedEmployee.phone}</li>
                <li>Address: {selectedEmployee.address}</li>
                <li>
                  Joining Date:{" "}
                  {selectedEmployee.joiningDate
                    ? new Date(
                        selectedEmployee.joiningDate
                      ).toLocaleDateString()
                    : ""}
                </li>

                <li>Department: {selectedEmployee.department}</li>
                <li>Salary: {selectedEmployee.salary}</li>
                <li>
                  Skills:
                  <ol>
                    {selectedEmployee.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ol>
                </li>
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
