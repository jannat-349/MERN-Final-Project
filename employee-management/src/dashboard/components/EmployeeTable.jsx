import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Title from "./Title";
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
import { useContext } from "react";
import DashboardContext from "../context/DashboardContext";

export default function EmployeeTable({ onDelete }) {
  const [openDialogs, setOpenDialogs] = useState({});
  const { employees } = useContext(DashboardContext);

  const handleClickOpen = (employeeId) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [employeeId]: true,
    }));
  };

  const handleClose = (employeeId) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [employeeId]: false,
    }));
  };

  const getImageUrl = (filename) => {
    return `uploads/${filename}`; // Adjust the URL as needed
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
    // Implement your edit functionality here
    // You can use the employeeId to identify which employee to edit
    // For example, open a modal with a form for editing the employee data
  };

  const handleDelete = (employeeId) => {
    onDelete(employeeId);
  };

  useEffect(() => {}, [employees]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Title>Recent Employees</Title>
      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
