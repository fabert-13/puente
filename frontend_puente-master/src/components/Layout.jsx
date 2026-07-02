import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-gray-300 bg-gray-100 text-center text-sm text-gray-600 py-10">
        <p>
            Web desarrollada por {" "}
            <a
              href="https://www.linkedin.com/in/ayrton-elian-c%C3%A1ceres-7617052a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              AC
            </a>
        </p>
      </footer>
    </>
  );
}
