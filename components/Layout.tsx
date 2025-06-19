import Head from "next/head";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import $ from "jquery";

export default function Layout({ children, title }: { children: ReactNode; title: string }) {
    useEffect(() => {
        $(".fade-in").hide().fadeIn(500);
    }, []);

    return (
        <>
        <Head>
        <title>{title}</title>
        <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
        rel="stylesheet"
        />
        <style>{`
            body {
                font-family: 'Nunito', sans-serif;
                background-color: #111;
                color: white;
            }
            `}</style>
            </Head>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
            <div className="container">
            <Link className="navbar-brand fw-bold" href="/">
            🛡️ INKA Security
            </Link>
            <div>
            <Link className="btn btn-outline-light btn-sm me-2" href="/">
            Dashboard
            </Link>
            <Link className="btn btn-outline-light btn-sm" href="/admin">
            Administración
            </Link>
            </div>
            </div>
            </nav>

            <main className="container fade-in" style={{ paddingTop: "6rem" }}>
            {children}
            </main>
            </>
    );
}
