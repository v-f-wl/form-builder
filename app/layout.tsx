import { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";

export default function RootLayout({children}:{children:ReactNode}) {
  return children;
}
