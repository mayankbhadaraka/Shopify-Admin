import React, { useContext } from "react";
import { Text } from "@shopify/polaris";
import context from "../../Context/context";

const Welcome = () => {
  const { shop } =
    useContext(context);
  return (
    <div id="Welcome">
      <Text variant="heading4xl" as="h6">
        Welcome {shop.storeName}
      </Text>
    </div>
  );
};

export default Welcome;
