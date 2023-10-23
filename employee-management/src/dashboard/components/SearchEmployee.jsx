import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { Search } from "@mui/icons-material";

export function SearchEmployee({ onSearch, searchList }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "center"}}>
        <Autocomplete
          style={{ width: "50vw" }}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={searchList.map((employee) => employee.name)}
          onInputChange={(event, newSearchTerm) => setSearchTerm(newSearchTerm)}
          renderInput={(params) => (
            <TextField
              value={searchTerm}
              onChange={handleSearchTerm}
              {...params}
              label="Search employee"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <div style={{ paddingLeft: "10px" }}>
          <Button
            type="submit"
            onClick={() => {
              onSearch(searchTerm);
            }}
          >
            <Search />
            Search
          </Button>
        </div>
      </div>
    </>
  );
}
