import React, { useContext } from "react";
import { Toast } from "@shopify/polaris";
import context from "../../Context/context";

const ToastMsg = () => {
  const { msg, toast, setToast } = useContext(context);

  const toggleActive = () => setToast(!toast);

  const toastMarkup = toast ? (
    <Toast content={msg} duration={4500} onDismiss={toggleActive} />
  ) : null;
  return (
    <div>
      { toastMarkup }
    </div>
    );
};

export default ToastMsg;
