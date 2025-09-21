import Link from 'next/link'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className="container">
      <Head><title>GAX | Starter</title></Head>
      <h1>GAX Starter</h1>
      <p>Conecta tu wallet y prueba el check-in con QR y SIWE (demo).</p>
      <div className="row m-2">
        <ConnectButton />
        <Link href="/checkin" className="btn">Check-in con QR</Link>
      </div>
      <div className="m-2">
        <Link href="/staking" className="btn">Staking (placeholder)</Link>
      </div>
    </div>
  )
}
