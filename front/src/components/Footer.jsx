import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0d253f] w-full p-4 border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-white sm:text-center dark:text-gray-400">
        © 2023
        <a href="#" className="hover:underline font-bold">
          Proyecto 3D
        </a>
        . All Rights Reserved.
      </span>
      <p className="text-sm text-white sm:text-center dark:text-gray-400">
        Contacto: proyecto3D@email.com
      </p>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"></ul>
    </footer>
  );
};

export default Footer;
