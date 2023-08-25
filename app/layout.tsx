import UserNav from "@/components/UserNav/UserNav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthContextProvider from "@/contexts/AuthContext";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tasks App",
    description:
        "Created by Daniel Mantilla, using NextJS, TailwindCSS and MongoDB",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex min-h-screen flex-col items-center bg-sky-500 pt-20">
                    <AuthContextProvider>
                        <div className="pb-20 w-full flex justify-center">
                            <UserNav />
                            <div className="w-4/5">
                                <h1 className="text-5xl uppercase text-center font-bold text-slate-100">
                                    Tasks.
                                </h1>
                                <div className="flex justify-center mt-10">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </AuthContextProvider>

                    <Footer />
                </div>
            </body>
        </html>
    );
}
