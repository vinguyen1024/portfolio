import React from 'react';
import { Poppins } from 'next/font/google';
import './globals.scss';

const poppins = Poppins({ 
	weight: ['300', '400', '500'],
	subsets: ['latin'],
	variable: '--poppins-font',
});

interface Props {
    children: React.ReactNode;
}

export default function ResumeLayout({ children }: Props) {
	return (
		<html lang="en" className={poppins.variable}>
			<body>
				{children}
			</body>
		</html>
	);
};
