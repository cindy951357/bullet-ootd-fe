/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
        },
        fontFamily: {
          sans: ['Nunito', 'sans-serif'],
        },
        screens: {
          'xs': '480px',  // 新增
          'sm': '640px',  // 新增
          'md': '768px',  //
          'lg': '1024px', //
          'xl': '1280px', //
          '2xl': '1536px', //
          '3xl': '1920px', // 新增
        },
      },
    },
    plugins: [],
  };
  