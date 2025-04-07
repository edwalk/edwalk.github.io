export default function Footer() {
  // const currentYear = new Date().getFullYear(); // No longer needed

  return (
    <footer className="py-6 mt-8 text-center"> {/* Increased py padding slightly */}
      {/* Remove copyright paragraph */}
      {/* <p className="text-sm text-gray-500">
        &copy; {currentYear} Edward Walker. All rights reserved.
      </p> */}

      {/* Add LinkedIn Icon Link */}
      <a
        href="https://www.linkedin.com/in/edward-walker-uk/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Edward Walker LinkedIn Profile"
        className="inline-block text-gray-400 hover:text-[#dcd7ba] transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
    </footer>
  );
} 