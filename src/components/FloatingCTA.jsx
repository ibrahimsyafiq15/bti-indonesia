function FloatingCTA() {
  return (
    <div className="floating-cta">
      <a 
        href="https://wa.me/6281234567890" 
        className="floating-btn whatsapp" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact via WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}

export default FloatingCTA;
