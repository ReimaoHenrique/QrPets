import React from "react";
import styles from "./ProductCard.module.css"; // ⚡ Importa como styles
import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: string;
  img: string;
  phoneNumber: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  img,
  phoneNumber,
}) => {
  return (
    <div className={styles.productCard}>
      <Image
        width={152}
        height={152}
        src={img}
        alt={name}
        className={styles.productImage}
      />
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>{price}</p>
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.buyButton}
        >
          Comprar
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
