import type { Metadata } from "next";
import { Poppins, VT323 } from 'next/font/google';
import { metaData } from '@/_data/resume';
import './globals.scss';

const poppins = Poppins({ 
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--poppins-font',
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--vt323-font',
});

export const metadata: Metadata = metaData;

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className={vt323.variable}>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
};
