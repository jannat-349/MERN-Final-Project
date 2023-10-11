import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Title from "./Title";
import { useEffect, useState } from "react";
import { DELETE_EMPLOYEE_API_URL, GET_All_EMPLOYEES_API_URL } from "../api/api";
import { fetchDataFromAPI } from "../utils/fetchDataFromAPI";
import { Delete, Edit } from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";


export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [openDialogs, setOpenDialogs] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromAPI(GET_All_EMPLOYEES_API_URL);
        setEmployees(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

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
      field: "fullName",
      headerName: "Name",
      width: 300,

      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(DELETE_EMPLOYEE_API_URL + employeeId);
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== employeeId
      );
      setEmployees(updatedEmployees);
      naviga
    } catch (error) {
      console.log(error);
    }
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
