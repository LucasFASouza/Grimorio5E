import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
