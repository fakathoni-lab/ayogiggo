import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter, Mail } from "lucide-react";

const SlabscanFooter = () => {
  const footerLinks = {
    Platform: [
      { label: "Untuk Kreator", href: "/creators" },
      { label: "Untuk Brand", href: "/brands" },
      { label: "Browse Kampanye", href: "/campaigns" },
      { label: "Cara Kerja", href: "/#cara-kerja" },
    ],
    Resources: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "API Documentation", href: "#" },
      { label: "Status", href: "#" },
    ],
    Company: [
      { label: "Tentang Kami", href: "#" },
      { label: "Karir", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Kontak", href: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "#" },
      { label: "DMCA", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@giggo.com", label: "Email" },
  ];

  return (
    <footer className="bg-bg-primary border-t border-white/5">
      <div className="container-slabscan py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold text-white font-heading">
                GIGGO
              </span>
            </Link>
            <p className="text-text-subtle text-sm leading-relaxed">
              Platform marketplace #1 di Indonesia untuk kolaborasi kreator dan
              brand.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.Platform.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-text-subtle hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.Resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-text-subtle hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.Company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-text-subtle hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.Legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-text-subtle hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-text-subtle text-sm">
            © 2026 GIGGO. All rights reserved. Made with ❤️ in Indonesia
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-subtle hover:text-brand-emerald transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SlabscanFooter;
