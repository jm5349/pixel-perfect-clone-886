import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck } from 'lucide-react';
import TikTok from './icons/TikTok';
const Footer = () => {
  const socialLinks = [{
    icon: TikTok,
    href: 'https://www.tiktok.com/@cuztomtuning',
    label: 'TikTok'
  }, {
    icon: Instagram,
    href: 'https://www.instagram.com/cuztomtuning/',
    label: 'Instagram'
  }, {
    icon: Youtube,
    href: '#',
    label: 'YouTube'
  }];
  const quickLinks = [
    { label: 'Search', href: '#' },
    { label: 'About Us', href: '/about' },
    { label: 'Warranty Policy', href: '#' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' }
  ];
  const categories = ['Body Kits', 'Spoilers', 'Mirror Caps', 'DRLs & Others', 'Yofer Design®', 'GF Bodykit®'];
  return <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Contact Our Team */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-automotive text-foreground mb-6 tracking-wide">
                CONTACT OUR TEAM
              </h4>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground mb-2">Hours:</p>
                  <p>Monday through Friday<br />10AM - 5PM PST<br />(Closed on Public Holidays)</p>
                </div>
                
                <div>
                  <p className="font-semibold text-foreground mb-2">Questions?</p>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <a href="mailto:support@cuztomtuning.com" className="hover:text-primary transition-colors">
                      support@cuztomtuning.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>City of Industry, CA</span>
                </div>
                
                <p className="text-sm leading-relaxed pt-2">
                  For questions regarding existing orders, warranty claims, and other concerns please contact our team via email for the fastest response during business hours.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-automotive text-foreground mb-6 tracking-wide">
                QUICK LINKS
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => <li key={index}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-300">
                      {link.label}
                    </a>
                  </li>)}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-automotive text-foreground mb-6 tracking-wide">
                CATEGORIES
              </h4>
              <ul className="space-y-3">
                {categories.map((category, index) => <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                      {category}
                    </a>
                  </li>)}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-automotive text-foreground mb-6 tracking-wide">
                STAY UPDATED
              </h4>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for the latest products and exclusive offers.
              </p>
              
              <div className="flex gap-2 mb-6">
                <Input type="email" placeholder="Enter your email" className="bg-background border-border focus:border-primary" />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                  Subscribe
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return <a key={index} href={social.href} className="text-muted-foreground hover:text-primary transition-colors duration-300" aria-label={social.label}>
                      <Icon className="h-5 w-5" />
                    </a>;
              })}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="text-sm">Easy Financing</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 Cuztomtuning. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;