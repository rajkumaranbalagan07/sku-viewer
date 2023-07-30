/** @format */

import { GetServerSideProps } from 'next';

interface SkuProps {
  sku: {
    sku: string;
    qty: number;
  };
}

export default function SkuPage({ sku }: SkuProps) {
  return (
    <div>
      <h1>SKU: {sku.sku}</h1>
      <p>Quantity: {sku.qty}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const skuId = context.params?.sku as string;
  const decodedSkuId = decodeURIComponent(skuId);

  const res = await fetch(
    // 'http://127.0.0.1:4000/api/stock-tracker/v1/stock',
    'https://vpjzb2ujzm.us-east-1.awsapprunner.com/api/stock-tracker/v1/stock',
    {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sku: decodedSkuId }),
    }
  );

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const sku = await res.json();

  if (!sku) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      sku,
    },
  };
};
