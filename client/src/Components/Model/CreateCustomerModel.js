import React, { useContext, useState } from "react";
import { Form, Modal, Button, TextField, Spinner } from "@shopify/polaris";
import { useCallback } from "react";
import context from "../../Context/context";

const CreateCustomerModel = () => {
  const {
    model,
    setModel,
    setLoading,
    loading,
    setModelName,
    setToast,
    setMsg,
  } = useContext(context);
  const [data, setData] = useState({});
  const [address, setAddress] = useState([
    {
      address1: "",
      address2: "",
      city: "",
      country: "",
      zip: "",
    },
  ]);
  const handleChange = useCallback(() => setModel(!model), [model]);
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
    if (address.length == 1) {
      setMsg("One Address is Mandetory");
      setToast(true);
    } else {
      const newAddress = address.slice(0, address.length - 1);
      setAddress(newAddress);
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
    setAddress(updatedAddress);
  };
  const handleSubmit = async () => {
    console.log(data, address);
    data["address"] = address;
    console.log(data);
    if (!data.firstName || !data.lastName || !data?.email || !data?.phone) {
      setMsg("Enter Data Properly.");
      setToast(true);
    } else if (!isValidEmail(data?.email)) {
      setMsg("Enter Email Properly.");
      setToast(true);
    } else if (data.address.length == 0) {
      setMsg("Enter minimum one address.");
      setToast(true);
    } else if (
      data.address.some(
        (item) =>
          item.address1 === "" ||
          item.city === "" ||
          item.country === "" ||
          item.zip === ""
      )
    ) {
      setMsg("Enter Address Properly.");
      setToast(true);
    } else {
      setLoading(true);
      try {
        const res = await fetch("/createCustomer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const responce = await res.json();
        if (res.status !== 201) {
          setMsg("Error");
          setToast(true);
          const error = new Error(res.error);
          throw error;
        } else {
          setMsg("Customer Created.");
          setToast(true);
          setModel(false);
          setModelName("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <Modal
        open={model}
        onClose={handleChange}
        title="Create"
        primaryAction={{
          content: loading ? (
            <Spinner accessibilityLabel="Spinner" size="small" />
          ) : (
            "Create"
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
              value={data?.firstName}
              onChange={(e) => setData({ ...data, ["firstName"]: e })}
            />
            <TextField
              label="Last Name"
              type="text"
              value={data?.lastName}
              onChange={(e) => setData({ ...data, ["lastName"]: e })}
            />
            <TextField
              label="Email"
              type="email"
              value={data?.email}
              autoComplete="email"
              onChange={(e) => setData({ ...data, ["email"]: e })}
            />
            <TextField
              label="Phone Number"
              type="text"
              value={data?.phone}
              onChange={(e) => {
                let bool = numberLength(e, 10);
                bool && setData({ ...data, ["phone"]: e });
              }}
            />
            {address.map((item, key) => {
              return (
                <>
                  <TextField
                    label="Address1"
                    type="text"
                    value={address[key]?.address1}
                    onChange={(e) => handleAddressChange(key, "address1", e)}
                  />
                  <TextField
                    label="Address2"
                    type="text"
                    value={address[key]?.address2}
                    onChange={(e) => handleAddressChange(key, "address2", e)}
                  />
                  <TextField
                    label="City"
                    type="text"
                    value={address[key]?.city}
                    onChange={(e) => handleAddressChange(key, "city", e)}
                  />
                  <TextField
                    label="Country"
                    type="text"
                    value={address[key]?.country}
                    onChange={(e) => handleAddressChange(key, "country", e)}
                  />
                  <TextField
                    label="Zip"
                    type="text"
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

export default CreateCustomerModel;
