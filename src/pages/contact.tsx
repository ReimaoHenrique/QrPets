import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contato - QR Pets</title>
        <meta
          name="description"
          content="Entre em contato com a QR Pets para dúvidas e suporte."
        />
        <meta property="og:title" content="Contato - QR Pets" />
        <meta
          property="og:description"
          content="Entre em contato com a QR Pets para dúvidas e suporte."
        />
        <meta
          property="og:image"
          content="https://qrpets.info/images/produtos/logo.png"
        />
        <meta property="og:url" content="https://qrpets.info/contact" />
        <meta property="og:type" content="website" />
      </Head>
      <main>{/* Conteúdo da Contact */}</main>
    </>
  );
}
