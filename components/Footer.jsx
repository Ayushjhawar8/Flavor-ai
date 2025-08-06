'use-client'

import React, { useEffect, useState } from 'react'

const Footer = () => {
    const [currentTheme, setCurrentTheme] = useState('light');

    useEffect(() => {
        const theme = document.documentElement.getAttribute('dark-theme') || 'light';
        setCurrentTheme(theme);
        console.log(theme);
    }, []);

    return (
        <footer className="footer rounded-md p-10 bg-base-200 text-base-content footer-center">
            <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                    <h3 className={`card-title text-lg md:text-xl flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
                        }`}>Flavor AI</h3>
                    <p className={`card-title text-lg md:text-xl flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
                        }`}>Your AI-powered culinary companion.</p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <a
                        href="https://x.com/JhawarAj123"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`card-title text-lg md:text-xl flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
                            }`}
                    >
                        Ayush Jhawar
                    </a>
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <a
                            href="https://github.com/Ayushjhawar8/Flavor-ai/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-md flex items-center gap-2 hover:bg-primary-focus transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
                                    }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.107-.775.418-1.305.762-1.604c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.30c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.30 3.297-1.30c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.911 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z" />
                            </svg>
                            Contribute on GitHub
                        </a>
                    </div>
                </div>
                <div className="text-sm text-center md:text-right">
                    <p className={`card-title text-lg md:text-xl flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
                        }`}>
                        &copy; {new Date().getFullYear()} Flavor AI. All Rights
                        Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer