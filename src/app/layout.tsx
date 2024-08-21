import Script from "next/script";
import type { Metadata } from 'next';
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
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID}`} />
            <Script dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.GTM_ID}');
              `
            }}/>
            <body className={poppins.className}>
                <noscript>
                    <iframe
                      src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
                      height="0"
                      width="0"
                      style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                {children}
            </body>
        </html>
    );
};
