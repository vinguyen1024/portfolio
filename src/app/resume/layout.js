import './globals.scss';
import { Poppins } from 'next/font/google';
import { header, metaData } from '@/_data/resume';

const poppins = Poppins({ 
	weight: ['300', '400', '500'],
	subsets: ['latin'],
	variable: '--poppins-font',
});

export const metadata = metaData;

export default function ResumeLayout({ children }) {
	return (
		<html lang="en" className={poppins.variable}>
			<body>
				{children}
			</body>
		</html>
	);
};
