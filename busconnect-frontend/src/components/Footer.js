export default function Footer() {
  return (
    <footer className="bg-dark text-white-50 py-3 mt-auto">
      <div className="container d-flex justify-content-between">
        <span>&copy; {new Date().getFullYear()} BusConnect</span>
        <span>Built with React &amp; Bootstrap</span>
      </div>
    </footer>
  );
}
