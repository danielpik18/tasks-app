import React from "react";

export default function Footer() {
    return (
        <footer className="w-full min-h-[120px] py-8 mt-auto flex flex-col items-center justify-center bg-blue-500 text-slate-100 opacity-75">
            <h2 className="block">
                <strong>Created by:</strong> Daniel Mantilla
            </h2>
            <div className="flex items-center gap-4 mt-2">
                <a href="https://github.com/danielpik18" target="_blank">
                    <img className="w-[20px]" src="/img/github.svg" alt="" />
                </a>

                <a
                    href="https://www.linkedin.com/in/daniel-mantilla-ochoa-ba5443129/"
                    target="_blank"
                >
                    <img className="w-[30px]" src="/img/linkedin.svg" alt="" />
                </a>
            </div>
        </footer>
    );
}
