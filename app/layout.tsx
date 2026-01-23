// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { Montserrat, Inter } from 'next/font/google';
import { Navbar } from './components/Navbar';

export const metadata = {
  title: 'CAT Crack - Crack the Code in 45 Days',
  description: 'Join the best CAT preparation program with expert mentors and proven strategies.',
  icons:{
    icon:"./favicon.ico"
  }
};

// Load readable, modern fonts and expose as CSS variables
const fontHeading = Montserrat({ subsets: ['latin'], weight: ['700', '800', '900'], variable: '--font-heading' });
const fontBody = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
  <body className={`${fontHeading.variable} ${fontBody.variable}`}>
        <MantineProvider>
          <Navbar/>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}