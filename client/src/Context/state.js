import context from "./context";
import React, { useState } from "react";

const State = (props) => {
  const [shop, setShop] = useState({});
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [toast, setToast] = useState(false);
  const [model, setModel] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [modelName, setModelName] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <context.Provider
      value={{
        shop,
        setShop,
        limit,
        setLimit,
        page,
        setPage,
        toast,
        setToast,
        msg,
        setMsg,
        search,
        setSearch,
        model,
        setModel,
        updateData,
        setUpdateData,
        modelName,
        setModelName,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
