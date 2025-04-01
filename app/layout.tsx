import { ReactNode } from "react";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';

export default function RootLayout({children}:{children:ReactNode}) {
  return children;
}
