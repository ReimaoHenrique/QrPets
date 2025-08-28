// src/pages/pets/[uuid].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import { useState } from "react";
import ContactCheck from "../../components/ContactCheck";
import styles from "./uuid.module.css";

interface Pet {
  id: string;
  name: string;
  photoUrl: string;
  coverUrl?: string;
  weight: string;
  age: string;
  breed: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  themeColor: string;
  vetCare?: string;
  photos?: string[];
  sex: "male" | "female";
  insta?: string;
}

interface Props {
  pet?: Pet;
}

export default function PetProfile({ pet }: Props) {
  const [activeTab, setActiveTab] = useState("info");

  if (!pet) {
    return <p className={styles.notFound}>Pet não encontrado 😿</p>;
  }

  return (
    <>
      <Head>
        <title>{pet.name ? `${pet.name} - Perfil` : "Pet - Perfil"}</title>
        <meta
          property="og:title"
          content={pet.name ? `Conheça ${pet.name}` : "Conheça esse pet"}
        />
      </Head>

      <ContactCheck
        name={pet.name}
        sex={pet.sex}
        email={pet.email}
        instagram={pet.insta}
        whatsapp={pet.phone}
      />

      {/* Fundo e Avatar */}
      <div
        className={styles.cover}
        style={{ backgroundImage: `url(${pet.coverUrl || pet.photoUrl})` }}
      >
        <img src={pet.photoUrl} alt={pet.name} className={styles.avatar} />
      </div>

      {/* Conteúdo */}
      <div className={styles.content}>
        <h1 className={styles.name}>{pet.name}</h1>
        <p className={styles.subtitle}>
          {pet.breed} • {pet.age}
        </p>

        {/* Tabs */}
        <div className={styles.tabs}>
          {["info", "vet", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tab} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
              style={{
                backgroundColor: activeTab === tab ? pet.themeColor : undefined,
              }}
            >
              {tab === "info" && "Informações"}
              {tab === "vet" && "Cuidados Veterinários"}
              {tab === "contact" && "Contato"}
            </button>
          ))}
        </div>

        {/* Conteúdo das abas */}
        <div className={styles.tabContent}>
          {activeTab === "info" && (
            <div>
              <p>
                <strong>Peso:</strong> {pet.weight}
              </p>
              <p>
                <strong>Notas:</strong>{" "}
                {pet.notes || "Nenhuma nota adicionada."}
              </p>
            </div>
          )}

          {activeTab === "vet" && (
            <div>
              {pet.vetCare || "Sem informações de cuidados veterinários."}
            </div>
          )}

          {activeTab === "contact" && (
            <div>
              <p>
                <strong>Email:</strong> {pet.email || "-"}
              </p>
              <p>
                <strong>Telefone:</strong> {pet.phone || "-"}
              </p>
              <p>
                <strong>Endereço:</strong> {pet.address || "-"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// -------------------- Next.js Data Fetch --------------------
export const getStaticPaths: GetStaticPaths = async () => {
  const petsDir = path.join(process.cwd(), "data", "pets");
  const filenames = fs.readdirSync(petsDir);
  const paths = filenames.map((name) => ({
    params: { uuid: name.replace(".json", "") },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const uuid = context.params?.uuid as string;
  let petData: Pet | undefined = undefined;

  try {
    const filePath = path.join(process.cwd(), "data", "pets", `${uuid}.json`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    petData = JSON.parse(fileContent);
  } catch (err) {
    console.warn(`Pet não encontrado: ${uuid}`);
  }

  return { props: { pet: petData } };
};
