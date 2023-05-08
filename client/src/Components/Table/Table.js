import React, { useContext } from "react";
import {
  Page,
  LegacyCard,
  DataTable,
  Pagination,
  Button,
  Avatar,
  Spinner,
} from "@shopify/polaris";
import context from "../../Context/context";
import SearchBox from "../SearchBox/SearchBox";
import CreateCustomerModel from "../Model/CreateCustomerModel";
import DeleteModel from "../Model/DeleteModel";

const Table = (props) => {
  const {
    page,
    loading,
    setPage,
    limit,
    modelName,
    setModel,
    setUpdateData,
    setModelName,
  } = useContext(context);
  let count = props.count;
  const data = props.row;
  console.log(data);
  const column = props.column;
  var titleCase = (s) =>
    s
      .replace(/(^|[_-])([a-z])/g, (a, b, c) => c.toUpperCase())
      .replace(/([a-z])([A-Z])/g, (a, b, c) => `${b} ${c}`);
  let normalCase = column.map((item) => titleCase(item));
  const Edit = (id) => {
    setModelName("editCustomer");
    const editData = data.filter((i) => {
      return i.customerId === id;
    });
    setUpdateData(editData);
    setModel(true);
  };
  const Delete = (id) => {
    setUpdateData(id)
    setModel(true)
    setModelName('DeleteCustomer')
  };
  let rows = data?.map((item) => {
    let arr = [];
    column.map((x) => {
      if (x === "Edit") {
        arr.push(<Button primary  onClick={() => Edit(item.customerId)}>{x}</Button>);
      } else if (x === "Delete") {
        arr.push(<Button onClick={() => Delete(item.customerId)}>{x}</Button>);
      } else if(x==='Image'){
        arr.push(<Avatar source={item?.images[0]?.src}  customer size="Medium" name="Farrah Fawcett" />)
      } else {
        arr.push(item[x]);
      }
    });
    return arr;
  });
  console.log(rows);
  const openCreateModel = () => {
    console.log(props.btn);
    if (props.btn === "Create Customer") {
      setModelName("createCustomer");
      setModel(true);
    } else if (props.btn === "Create Products") {
    }
  };
console.log(loading,"Table")
  return (
    <Page
      title={props.title}
      primaryAction={
        <Button primary onClick={openCreateModel}>
          {props.btn}
        </Button>
      }
    >
      {modelName === "createCustomer" ? <CreateCustomerModel /> : null}
      {modelName === "DeleteCustomer" ? <DeleteModel /> : null}
      <SearchBox />
      
        {!loading?(rows?.length>0?(<LegacyCard><DataTable
          columnContentTypes={props.columnType}
          headings={normalCase}
          rows={rows}
          footerContent={`Showing ${limit * page + 1} of ${
            limit * page + rows?.length
          } results out of ${count}`}
        />
        <Pagination
          hasPrevious={page + 1 === 1 ? false : true}
          onPrevious={() => {
            if (page === 0) {
              console.log("Page Zero");
            } else {
              console.log(page == 0);
              setPage(page - 1);
              console.log(page);
            }
          }}
          hasNext={page + 1 >= count / limit ? false : true}
          onNext={() => {
            if (page >= count / limit) {
              console.log("No More Data");
            } else {
              setPage(page + 1);
              console.log(page + 1);
            }
          }}
        /></LegacyCard>):<h1>No Data Found.</h1>):<div id="Welcome"><Spinner accessibilityLabel="Spinner" size="large" /></div>}
      
    </Page>
  );
};

export default Table;
