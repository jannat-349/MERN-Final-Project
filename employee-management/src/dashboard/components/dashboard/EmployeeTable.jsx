import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Title from "../extras/Title";
import { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import DashboardContext from "../../context/DashboardContext";
import { getImageUrl } from "../../utils/imgUrl";

export default function EmployeeTable({ onDelete }) {
  const [openDialogs, setOpenDialogs] = useState({});
  const [openDialogs2, setOpenDialogs2] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { employees} = useContext(DashboardContext);
  const navigate = useNavigate();

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
    navigate(`/admin/employee/update/${employeeId}`);
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
      <Title>Recent Employees</Title>
      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
        onRowClick={(params) => handleRowClick(params.row._id)}
      />
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

              <div style={{ flex: 1, textAlign: "left" }}>
                <p>ID: {selectedEmployee.id}</p>
                <p>Name: {selectedEmployee.name}</p>
                <p>Age: {selectedEmployee.age}</p>
                <p>Position: {selectedEmployee.position}</p>
                <p>Email: {selectedEmployee.email}</p>
                <p>Phone: {selectedEmployee.phone}</p>
                <p>Address: {selectedEmployee.address}</p>
                <p>
                  Joining Date:{" "}
                  {selectedEmployee.joiningDate
                    ? new Date(
                        selectedEmployee.joiningDate
                      ).toLocaleDateString()
                    : ""}
                </p>

                <p>Department: {selectedEmployee.department}</p>
                <p>
                  Skills:
                  <ol>
                    {selectedEmployee.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ol>
                </p>
              </div>
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
