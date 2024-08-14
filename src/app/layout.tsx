import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import { metaData } from '@/_data/resume';
import './globals.scss';

const poppins = Poppins({ 
    weight: ['300', '400', '500'],
    subsets: ['latin'],
    variable: '--poppins-font',
});
export const metadata: Metadata = metaData;

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                {children}
            </body>
        </html>
    );
};
