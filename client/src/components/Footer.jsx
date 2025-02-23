const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-auto dark:bg-gray-800">
      <div className="container mx-auto px-6 py-4 text-center text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} IDE-X. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
