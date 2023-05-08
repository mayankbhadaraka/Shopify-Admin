import { Modal, Spinner } from "@shopify/polaris";
import { useContext } from "react";
import context from "../../Context/context";

function DeleteModel() {
  const { updateData,model,loading,setLoading,setPage ,setModel,setUpdateData,setModelName} = useContext(context);
  const handleChange =() => setModel(!model);

  const deleteCustomer = async() => {
    setLoading(true)
    console.log("Delete this id",updateData)
    const res = await fetch(`/deleteCustomer?id=${updateData}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data)
      if(res.status==200){
        setPage(0)
        setLoading(false)
        setModel(false)
        setModelName('')
        setUpdateData({})
      }
  };
  return (
    <div>
      <Modal
       title="Delete"
        open={model}
        onClose={handleChange}
        primaryAction={{
          content: loading ? <Spinner accessibilityLabel="Spinner" size="small" /> : "Delete",
          onAction: deleteCustomer,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <p>Are you Sure?</p>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default DeleteModel;
