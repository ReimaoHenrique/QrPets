import Image from 'next/image';
import QRCodeDisplay from './QRCodeDisplay';
import styles from '../styles/PetCard.module.css';

interface PetCardProps {
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
  themeColor: string; // Keep themeColor for potential future use or slight variations
}

export default function PetCard({ id, name, photoUrl, weight, age, breed, email, phone, address, notes, themeColor }: PetCardProps) {
  return (
    <div className={styles.card} style={{ borderColor: themeColor }}>
      <Image src={photoUrl} alt={name} width={150} height={150} className={styles.photo} />
      <h2 className={styles.name} style={{ color: themeColor }}>{name}</h2>
      <div className={styles.info}>
        <p><strong>Raça:</strong> {breed}</p>
        <p><strong>Idade:</strong> {age}</p>
        <p><strong>Peso:</strong> {weight}</p>
        <p><strong>Contato:</strong> {email} | {phone}</p>
        <p><strong>Endereço:</strong> {address}</p>
      </div>
      {notes && <p className={styles.notes}><strong>Observações:</strong> {notes}</p>}
      <QRCodeDisplay value={`https://qrpets.info/pets/${id}`} />
    </div>
  );
}
