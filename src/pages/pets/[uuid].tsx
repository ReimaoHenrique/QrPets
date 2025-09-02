// src/pages/pets/[uuid].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import { useState } from "react";
import ContactCheck from "../../components/ContactCheck/ContactCheck";
import { BlurFade } from "@/components/magicui/blur-fade"; // import do MagicUI
import styles from "./uuid.module.css";
import Image from "next/image";

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
  BlurFadeImage?: string[];
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

        {/* --- Open Graph (WhatsApp, Facebook, Insta) --- */}
        <meta
          property="og:title"
          content={pet.name ? `Conheça ${pet.name}` : "Conheça esse pet"}
        />
        <meta
          property="og:description"
          content={pet.notes || "Adote amor, adote um pet 🐾"}
        />
        <meta
          property="og:image"
          content={`https://www.qrpets.info${pet.photoUrl}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.qrpets.info/pets/${pet.id}`}
        />

        {/* --- Twitter Cards (Telegram, Twitter, Discord) --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={pet.name ? `Conheça ${pet.name}` : "Conheça esse pet"}
        />
        <meta
          name="twitter:description"
          content={pet.notes || "Adote amor, adote um pet 🐾"}
        />
        <meta
          name="twitter:image"
          content={`https://www.qrpets.info${pet.photoUrl}`}
        />
      </Head>
      <ContactCheck
        photoUrl={pet.photoUrl} // <-- aqui, pega a URL da foto do pet
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
        <Image
          src={pet.photoUrl}
          alt={pet.name}
          className={styles.avatar}
          width={128}
          height={128}
        />
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

        {/* Nova Seção: Nossos Momentos */}
        {pet.BlurFadeImage && pet.BlurFadeImage.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Nossos Momentos</h2>
            <div className="columns-2 gap-4 sm:columns-3">
              {pet.BlurFadeImage.map((src, idx) => (
                <BlurFade key={idx} delay={0.4 + idx * 0.05} inView>
                  <Image
                    src={src}
                    alt={`Momento ${idx + 1}`}
                    width={300}
                    height={300}
                    className="mb-4 w-full rounded-lg object-cover"
                  />
                </BlurFade>
              ))}
            </div>
          </section>
        )}
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
  } catch {
    console.warn(`Pet não encontrado: ${uuid}`);
  }

  return { props: { pet: petData } };
};
