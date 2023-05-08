import React, { useContext, useEffect, useState } from "react";

import Table from "../Table/Table";
import fetchData from "../../Helper/FetchApi";
import context from "../../Context/context";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { setLoading, setPage, model, limit, page, search } =
    useContext(context);
  const getProductsData = async () => {
    const data = await fetchData(
      `/getProductFromDB?limit=${limit}&page=${page + 1}&search=${search}`
    );
    setProducts(data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getProductsData();
  }, [page]);

  useEffect(() => {
      const time = setTimeout(() => {
        setPage(0);
        getProductsData();
      }, 800);
      return () => {
        clearTimeout(time);
      };
  }, [search]);
  // useEffect(() => {
  //   if (model == false) {
  //     getProductsData();
  //   } else {
  //     return;
  //   }
  // }, [model]);
  const column = [
    "Image",
    "title",
    "status",
    "vendor",
    "productType",
    "productId",
  ];
  const columnType = ["text", "text", "email", "text", "numeric"];
  return (
    <div id="products">
      <div className="emptySpace"></div>
      <div className="productsData">
        <Table
          row={products.data}
          title={"Products Data"}
          count={products.count}
          column={column}
          columnType={columnType}
          btn={"Create Products"}
        />
      </div>
    </div>
  );
};

export default Product;
