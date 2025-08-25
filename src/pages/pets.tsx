import fs from 'fs';
import path from 'path';
import PetCard from '../components/PetCard';
import Link from 'next/link';
import styles from '../styles/Pets.module.css';

// Define the Pet type, it's good practice to have it shared
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

export default function Pets({ pets }: { pets: Pet[] }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nossos Pets</h1>
      <div className={styles.grid}>
        {pets.map(pet => (
          <Link key={pet.id} href={`/pets/${pet.id}`} passHref className={styles.cardLink}>
            <PetCard {...pet} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const petsDir = path.join(process.cwd(), 'data', 'pets');
  const filenames = fs.readdirSync(petsDir);
  const pets = filenames.map(name => {
    const filePath = path.join(petsDir, name);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents);
  });
  return { props: { pets } };
}
