import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import SiweGate from '../components/SiweGate'

const Html5QrcodeScanner = dynamic(
  async () => (await import('html5-qrcode')).Html5QrcodeScanner,
  { ssr: false }
);

export default function Checkin() {
  const { isConnected } = useAccount();
  const [result, setResult] = useState('');
  const [ready, setReady] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!ready || typeof window === 'undefined') return;
    const config = { fps: 10, qrbox: 250 };
    const scanner = new Html5QrcodeScanner('reader', config, false);
    scanner.render(async (decodedText) => {
      scanner.clear();
      setResult('Leyendo QR...');
      const r = await fetch(`/api/checkin?qr=${encodeURIComponent(decodedText)}`, { method: 'POST' });
      const j = await r.json();
      setResult(j.ok ? '✅ Check-in registrado' : '❌ ' + (j.error || 'Error'));
    }, (error) => {
      console.warn(error);
    });
    scannerRef.current = scanner;
    return () => { try { scanner?.clear(); } catch {} };
  }, [ready]);

  return (
    <div className="container">
      <Head><title>Check-in | GAX</title></Head>
      <h1>Check-in con QR</h1>
      {!isConnected && <p>Conecta tu wallet primero en la Home.</p>}
      {isConnected && <SiweGate />}
      <div className="m-2">
        <button className="btn" onClick={() => setReady(true)} disabled={!isConnected}>
          {isConnected ? 'Activar cámara y escanear' : 'Conecta tu wallet'}
        </button>
      </div>
      <div id="reader" className="m-2" />
      {result && <div className="card m-2">{result}</div>}
    </div>
  )
}
