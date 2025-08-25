import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import PetCard from "../../components/PetCard";
import fs from "fs";
import path from "path";

interface Pet {
  id: string;
  name: string;
  photoUrl: string;
  weight: string;
  age: string;
  breed: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  themeColor: string;
}

export default function PetPage({ pet }: { pet: Pet }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.qrpets.info";
  const petUrl = `${baseUrl}/pets/${pet.id}`;
  const imageUrl = `${baseUrl}${pet.photoUrl}`;

  return (
    <>
      <Head>
        <title>{pet.name} - QR Pets</title>
        <meta property="og:title" content={`Conheça ${pet.name}`} />
        <meta
          property="og:description"
          content={`Raça: ${pet.breed} | Idade: ${pet.age} | Peso: ${pet.weight}`}
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={petUrl} />
        <meta property="og:type" content="website" />

        {/* Bonus: Twitter cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Conheça ${pet.name}`} />
        <meta
          name="twitter:description"
          content={`Raça: ${pet.breed} | Idade: ${pet.age} | Peso: ${pet.weight}`}
        />
        <meta name="twitter:image" content={imageUrl} />
      </Head>

      <div
        style={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <PetCard {...pet} />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const petsDir = path.join(process.cwd(), "data", "pets");
  const filenames = fs.readdirSync(petsDir);
  const paths = filenames.map((name) => ({
    params: { uuid: name.replace(".json", "") },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const uuid = context.params?.uuid as string;
  const filePath = path.join(process.cwd(), "data", "pets", `${uuid}.json`);
  const petData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return { props: { pet: petData } };
};
