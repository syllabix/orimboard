module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    plugins: [require('daisyui')],
    daisyui: {
        styled: true,
        themes: ["dracula"],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        darkTheme: "dracula"
    },
};
