import React, { useEffect } from 'react';
import { useGetProductsQuery } from '../redux/api/productsApi';
import ProductCard from './Product';

const Home = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
// test elemek ucun 
//   useEffect(() => {
//     console.log(products);
//   }, [products]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  if (!Array.isArray(products.products)) {
    return <div>No products available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Products</h1>
      <div className="flex flex-wrap justify-center">
        {/* each child should have unique key xetasi ucun _id veririk :) */}
        {products.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
