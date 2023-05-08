import { TextField } from "@shopify/polaris";
import { useCallback, useContext } from "react";
import React from "react";
import context from "../../Context/context";

const SerchBox = () => {
  const { search, setSearch } = useContext(context);

  const handleChange = (newValue) =>{ setSearch(newValue)};

  return (
    <div style={{ height: "75px" }}>
      <TextField
        label="Search"
        value={search}
        onChange={handleChange}
        placeholder="Search Here"
        autoComplete="off"
      />
    </div>
  );
};
export default SerchBox;
