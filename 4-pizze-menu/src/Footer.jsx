function Footer() {
  return (
    <>
      <footer className="footer">
        {new Date().toLocaleDateString()}. We're currently open!
      </footer>
    </>
  );
}

export default Footer;
