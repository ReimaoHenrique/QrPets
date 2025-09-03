import React from "react";
import ProductCard from "../components/ProductCard/ProductCard";

const phoneNumber = "5571992076895";

const products = [
  {
    id: 1,
    name: "Chaveiro QR Tag",
    price: "R$79,90",
    img: "/images/produtos/chaveiro.jpeg",
  },
  {
    id: 2,
    name: "Meu Dono Osso QR Tag",
    price: "R$79,90",
    img: "/images/produtos/meuDonoOsso.jpeg",
  },
];

const ProductsLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "40px 0",
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          img={product.img}
          phoneNumber={phoneNumber}
        />
      ))}
    </div>
  );
};

export default ProductsLayout;
