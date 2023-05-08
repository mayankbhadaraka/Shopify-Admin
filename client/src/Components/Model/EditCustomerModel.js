import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Spinner, TextField } from "@shopify/polaris";
import { useCallback } from "react";
import context from "../../Context/context";

const Model = () => {
  const {
    model,
    setModel,
    setLoading,
    setModelName,
    updateData,
    setUpdateData,
    setToast,
    loading,
    setMsg,
  } = useContext(context);
  const [data, setData] = useState(updateData[0]);
  const [address, setAddress] = useState(data.addresses);
  const handleChange = () => {
    setModel(!model);
  };
  useEffect(() => {
    setData(updateData[0]);
    setAddress(updateData[0]?.addresses);
  }, [updateData]);
  const addAddress = () => {
    const addAddress = {
      address1: "",
      address2: "",
      city: "",
      country: "",
      zip: "",
    };
    setAddress([...address, addAddress]);
  };
  const deleteAddress = () => {
    if (address.length == data.addresses.length) {
      setMsg("Can not delete already created address.");
      setToast(true);
    } else {
      const newAddress = address.slice(0, address.length - 1);
      setAddress(newAddress);
    }
  };
  const handleSubmit = async () => {
    console.log(data, address);
    data["addresses"] = address;
    console.log(data);
    if (!data.firstName || !data.lastName || !data?.email || !data?.phone) {
      console.log("Enter Data Properly.");
      setMsg("Enter Data Properly.");
      setToast(true);
    } else if (!isValidEmail(data?.email)) {
      setMsg("Enter Email Properly.");
      setToast(true);
    } else if (data?.address?.length == 0) {
      console.log("Enter minimum one address.");
      setMsg("Enter minimum one address.");
      setToast(true);
    } else if (
      data.addresses.some(
        (item) =>
          item.address1 === "" ||
          item.city === "" ||
          item.country === "" ||
          item.zip === ""
      )
    ) {
      console.log("Enter Address Properly.");
      setMsg("Enter Address Properly.");
      setToast(true);
    } else {
      setLoading(true);
      try {
        const res = await fetch("/editCustomer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responce = await res.json();
        if (res.status !== 201) {
          const error = new Error(res.error);
          throw error;
        } else {
          console.log(responce);
          setMsg("Data Edited Successfully.");
          setToast(true);
          setLoading(false);
          setModel(false);
          setModelName("");
          setUpdateData({});
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  function isValidEmail(email) {
    const re = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (re.test(email)) {
      return true;
    }
  }
  const numberLength = (e, l) => {
    if (e.length <= l) {
      return true;
    } else {
      return false;
    }
  };
  const handleAddressChange = (index, name, event) => {
    console.log(name, event, index);
    const updatedAddress = [...address];
    updatedAddress[index] = {
      ...updatedAddress[index],
      [name]: event,
    };
    console.log(updatedAddress);
    setAddress(updatedAddress);
  };
  console.log(address);
  return (
    <div>
      <Modal
        open={model}
        onClose={handleChange}
        title="Edit"
        primaryAction={{
          content: loading ? (
            <Spinner accessibilityLabel="Spinner" size="small" />
          ) : (
            "Edit"
          ),
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: "Close",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <Form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              value={data?.firstName}
              onChange={(e) => setData({ ...data, ["firstName"]: e })}
              autoComplete="email"
            />
            <TextField
              label="Last Name"
              type="text"
              name="lastName"
              value={data?.lastName}
              onChange={(e) => setData({ ...data, ["lastName"]: e })}
              autoComplete="email"
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={data?.email}
              onChange={(e) => setData({ ...data, ["email"]: e })}
              autoComplete="email"
            />
            <TextField
              label="Phone Number"
              type="text"
              name="phoneNumber"
              value={data?.phone}
              onChange={(e) => {
                let bool = numberLength(e, 13);
                bool && setData({ ...data, ["phone"]: e });
              }}
              autoComplete="email"
            />
            {address.map((item, key) => {
              return (
                <>
                  <TextField
                    label="Address1"
                    type="text"
                    name="Address1"
                    value={address[key]?.address1}
                    onChange={(e) => handleAddressChange(key, "address1", e)}
                  />
                  <TextField
                    label="Address2"
                    type="text"
                    name="Address2"
                    value={address[key]?.address2}
                    onChange={(e) => handleAddressChange(key, "address2", e)}
                  />
                  <TextField
                    label="City"
                    type="text"
                    name="city"
                    value={address[key]?.city}
                    onChange={(e) => handleAddressChange(key, "city", e)}
                  />
                  <TextField
                    label="Country"
                    type="text"
                    name="country"
                    value={address[key]?.country}
                    onChange={(e) => handleAddressChange(key, "country", e)}
                  />
                  <TextField
                    label="Zip"
                    type="text"
                    name="zip"
                    value={address[key]?.zip}
                    onChange={(e) => {
                      let bool = numberLength(e, 6);
                      bool && handleAddressChange(key, "zip", e);
                    }}
                  />
                  <p>
                    ----------------------------------------------------------------------------------------------------
                  </p>
                </>
              );
            })}
            <div style={{ marginTop: "17px" }}>
              <Button fullWidth onClick={() => addAddress()}>
                Add Address
              </Button>
              <Button fullWidth onClick={() => deleteAddress()}>
                Delete Address
              </Button>
            </div>
          </Form>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default Model;
