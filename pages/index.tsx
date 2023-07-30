/** @format */

import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Sku = {
  sku: string;
};

type SkusListProps = {
  skus: Sku[];
};

const SkusList: React.FC<SkusListProps> = ({ skus }) => (
  <div>
    <h1>List of SKUs</h1>
    <ul>
      {skus.map((item) => (
        <li key={item.sku}>
          <Link href={`/sku/${encodeURIComponent(item.sku)}`}>{item.sku}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SkusList;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    // 'http://127.0.0.1:4000/api/stock-tracker/v1/stock/skus'
    'https://vpjzb2ujzm.us-east-1.awsapprunner.com/api/stock-tracker/v1/stock/skus'
  );
  const skus: Sku[] = await res.json();

  return {
    props: { skus },
  };
};
