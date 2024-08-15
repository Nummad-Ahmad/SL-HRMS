import Providers from "@/redux/provider";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "HRMS",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Providers>
      <Toaster></Toaster>
      {children}
      </Providers>
      </body>
      
    </html>
  );
}
