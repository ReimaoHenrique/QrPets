const Footer = () => {
  const footerStyle = {
    backgroundColor: '#f8f8f8',
    color: '#666',
    textAlign: 'center' as 'center',
    padding: '2rem 0',
    marginTop: 'auto',
    borderTop: '1px solid #eaeaea',
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} QR Pets. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
