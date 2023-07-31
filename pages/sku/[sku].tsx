/** @format */

import { GetServerSideProps } from "next";

interface SkuData {
  sku: string;
  qty: number;
}

const SkuPage: React.FC<{ sku: string | SkuData }> = ({ sku }) => {
  if (typeof sku === "string") {
    return <div>{sku}</div>;
  }

  return (
    <div>
      <h1>SKU Details</h1>
      <h2>SKU: {sku.sku}</h2>
      <p>Quantity: {sku.qty}</p>
    </div>
  );
};

export default SkuPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const skuId = context.params?.sku as string;
  const encodedSkuId = encodeURIComponent(skuId);
  const res = await fetch(
    `https://vpjzb2ujzm.us-east-1.awsapprunner.com/api/stock-tracker/v1/stock/sku/${encodedSkuId}`
  );

  if (res.status !== 200) {
    return {
      props: {
        sku: "SKU not found",
      },
    };
  }
  const sku = await res.json();
  return {
    props: {
      sku,
    },
  };
};
