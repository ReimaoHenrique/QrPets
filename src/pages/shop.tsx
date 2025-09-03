import Head from "next/head";
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

export default function Shop() {
  return (
    <>
      <Head>
        <title>Shop - QR Pets</title>
        <meta
          name="description"
          content="Compre gadgets e acessórios para pets com QR Codes inteligentes."
        />
        <meta property="og:title" content="Shop - QR Pets" />
        <meta
          property="og:description"
          content="Compre gadgets e acessórios para pets."
        />
        <meta
          property="og:image"
          content="https://qrpets.info/QrPetesLogo.png"
        />
        <meta property="og:url" content="https://qrpets.info/shop" />
        <meta property="og:type" content="website" />
      </Head>
      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
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
      </main>
    </>
  );
}
