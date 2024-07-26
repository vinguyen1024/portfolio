import type { Metadata } from "next";
import { Poppins, VT323 } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Vi Nguyen — Front-end Software Developer',
  description: 'A passion to building web applications for seamless user experience',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className={vt323.variable}>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
};
