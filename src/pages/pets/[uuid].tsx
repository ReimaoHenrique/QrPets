import { GetStaticPaths, GetStaticProps } from 'next';
import PetCard from '../../components/PetCard';
import fs from 'fs';
import path from 'path';

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
  // A simple layout wrapper to center the card
  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <PetCard {...pet} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const petsDir = path.join(process.cwd(), 'data', 'pets');
  const filenames = fs.readdirSync(petsDir);
  const paths = filenames.map(name => ({ params: { uuid: name.replace('.json', '') } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const uuid = context.params?.uuid as string;
  const filePath = path.join(process.cwd(), 'data', 'pets', `${uuid}.json`);
  const petData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return { props: { pet: petData } };
};
