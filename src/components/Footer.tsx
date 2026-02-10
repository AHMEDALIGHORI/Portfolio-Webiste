const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ahmed Ali Ghori. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Designed & Built with ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
