// src/pages/pets/[uuid].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import { useState } from "react";
import ContactCheck from "../../components/ContactCheck";

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
  address: string;
  notes?: string;
  themeColor: string;
  vetCare?: string;
  photos?: string[];
  sex: string;
}

interface Props {
  pet?: Pet;
}

export default function PetProfile({ pet }: Props) {
  const [activeTab, setActiveTab] = useState("info");

  if (!pet)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Pet não encontrado 😿
      </p>
    );

  return (
    <>
      <Head>
        <title>{`${pet?.name || "Pet"} - Perfil`}</title>
        <meta
          property="og:title"
          content={`Conheça ${pet?.name || "esse pet"}`}
        />
      </Head>

      <ContactCheck
        name={pet.name}
        sex={(pet.sex === "female" ? "female" : "male") as "male" | "female"}
        email={pet.email}
        phone={pet.phone}
        address={pet.address}
      />
      <div style={{ fontFamily: "sans-serif" }}>
        {/* Capa */}
        <div
          style={{
            position: "relative",
            height: "50vh",
            backgroundColor: "#ccc",
            backgroundImage: `url(${pet.coverUrl || pet.photoUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Avatar */}
          <img
            src={pet.photoUrl}
            alt={pet.name}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: `5px solid white`,
              position: "absolute",
              bottom: "-75px",
              left: "50%",
              transform: "translateX(-50%)",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Conteúdo */}
        <div
          style={{
            marginTop: "100px",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Nome */}
          <h1
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {pet.name}
          </h1>
          <p style={{ textAlign: "center", color: "gray" }}>
            {pet.breed} • {pet.age} anos
          </p>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              gap: "1rem",
            }}
          >
            {["info", "vet", "photos", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: activeTab === tab ? pet.themeColor : "#eee",
                  color: activeTab === tab ? "white" : "black",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {tab === "info" && "Informações"}
                {tab === "vet" && "Cuidados Veterinários"}
                {tab === "photos" && "Fotos"}
                {tab === "contact" && "Contato"}
              </button>
            ))}
          </div>

          {/* Conteúdo das abas */}
          <div style={{ marginTop: "2rem" }}>
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
                <p>
                  {pet.vetCare || "Sem informações de cuidados veterinários."}
                </p>
              </div>
            )}

            {activeTab === "photos" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: "0.5rem",
                }}
              >
                {pet.photos && pet.photos.length > 0 ? (
                  pet.photos.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Foto ${idx + 1}`}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  ))
                ) : (
                  <p>Sem fotos adicionais.</p>
                )}
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
