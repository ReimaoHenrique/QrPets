import dynamic from 'next/dynamic';

const QRCode = dynamic(() => import('qrcode.react'), { ssr: false });

interface QRCodeDisplayProps {
  value: string;
}

export default function QRCodeDisplay({ value }: QRCodeDisplayProps) {
  return <QRCode value={value} size={128} fgColor="#FF6F00" />;
}
