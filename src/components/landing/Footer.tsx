import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import LogoMonogram from "@/components/shared/LogoMonogram";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger } from
"@/components/ui/tooltip";

const Footer = React.forwardRef<HTMLElement>((_, ref) => {
  const { t } = useTranslation();

  // Using forwardRef for Tooltip compatibility
  const ComingSoonLink = React.forwardRef<HTMLSpanElement, {children: React.ReactNode;}>(
    ({ children }, tooltipRef) =>
    <span ref={tooltipRef} className="text-slate-500 cursor-not-allowed">
        {children}
      </span>

  );
  ComingSoonLink.displayName = "ComingSoonLink";

  const ComingSoonWithTooltip = ({ children }: {children: React.ReactNode;}) =>
  <Tooltip>
      <TooltipTrigger asChild>
        <ComingSoonLink>{children}</ComingSoonLink>
      </TooltipTrigger>
      <TooltipContent>
        <p>Coming Soon</p>
      </TooltipContent>
    </Tooltip>;


  return (
    <footer ref={ref} className="bg-[#0F172A] text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <LogoMonogram size="md" variant="light" />
            </div>
            <p className="text-slate-400 text-sm mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">{t('footer.platform')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/campaigns" className="text-slate-400 hover:text-primary transition-colors">
                  {t('footer.browseGigs')}
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-slate-400 hover:text-primary transition-colors">
                  {t('footer.forCreators')}
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-slate-400 hover:text-primary transition-colors">
                  {t('footer.forBrands')}
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-slate-400 hover:text-primary transition-colors">
                  {t('footer.forBrands')}
                </Link>
              </li>
              <li>
                <ComingSoonWithTooltip>{t('footer.pricing')}</ComingSoonWithTooltip>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">{t('footer.resources')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <ComingSoonWithTooltip>{t('footer.helpCenter')}</ComingSoonWithTooltip>
              </li>
              <li>
                <ComingSoonWithTooltip>{t('footer.blog')}</ComingSoonWithTooltip>
              </li>
              <li>
                <ComingSoonWithTooltip>{t('footer.caseStudies')}</ComingSoonWithTooltip>
              </li>
              <li>
                <ComingSoonWithTooltip>{t('footer.apiDocs')}</ComingSoonWithTooltip>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-white">{t('footer.legal')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-primary transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-primary transition-colors">
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <ComingSoonWithTooltip>{t('footer.cookiePolicy')}</ComingSoonWithTooltip>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>);

});

Footer.displayName = "Footer";

export default Footer;