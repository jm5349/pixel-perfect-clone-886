import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Award, Users, Truck, Wrench, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet';

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We partner with top-tier manufacturers to bring you the finest automotive accessories and body kits available."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction drives everything we do. From pre-sale support to after-sale service, we're here for you."
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free shipping on all orders to the lower 48 states, with international shipping available worldwide."
    },
    {
      icon: Wrench,
      title: "Expert Support",
      description: "Our team of automotive enthusiasts provides expert guidance to help you find the perfect parts for your vehicle."
    },
    {
      icon: Shield,
      title: "Trusted Brands",
      description: "We exclusively work with reputable brands like Yofer Design, GF Bodykit, and CTM Design to ensure authenticity."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Based in California, we serve automotive enthusiasts across the United States and around the world."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Cuztomtuning | Premium Automotive Accessories</title>
        <meta name="description" content="Learn about Cuztomtuning, your trusted source for premium automotive body kits, spoilers, and accessories. Based in City of Industry, CA, serving enthusiasts worldwide." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden" style={{ background: 'var(--gradient-accent)' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  About Cuztomtuning
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Your trusted partner in automotive customization and performance enhancement
                </p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  Our Story
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Welcome to Cuztomtuning, where automotive passion meets premium quality. Based in the heart of City of Industry, California, we've built our reputation as a trusted source for high-quality automotive accessories, body kits, and performance parts.
                  </p>
                  <p>
                    Our journey began with a simple mission: to provide automotive enthusiasts with access to the finest aftermarket parts from around the world. We understand that your vehicle is more than just transportation—it's an expression of your personality, style, and dedication to automotive excellence.
                  </p>
                  <p>
                    Today, we're proud to partner with industry-leading manufacturers including Yofer Design, GF Bodykit, CTM Design, and Akasaka Genuine Parts. These partnerships allow us to offer authentic, premium-quality products that meet the highest standards of craftsmanship and performance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                What We Stand For
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  Our Commitment to You
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    At Cuztomtuning, we're committed to providing an exceptional shopping experience from start to finish. Whether you're looking for a complete body kit transformation, performance upgrades, or aesthetic enhancements, our team is here to guide you every step of the way.
                  </p>
                  <p>
                    We offer free shipping on all orders to the lower 48 states and provide international shipping to enthusiasts around the globe. Our customer support team is available Monday through Friday, 10AM - 5PM PST, ready to answer your questions and help you make informed decisions about your vehicle modifications.
                  </p>
                  <p>
                    We stand behind every product we sell with comprehensive warranty coverage and a commitment to customer satisfaction. If you have any questions, concerns, or need assistance with your order, our dedicated team at <a href="mailto:support@cuztomtuning.com" className="text-primary hover:underline">support@cuztomtuning.com</a> is here to help.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Join Our Community
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Follow us on social media to stay updated on new products, special offers, and automotive inspiration.
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.instagram.com/cuztomtuning/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Follow on Instagram
                  </a>
                  <a 
                    href="https://www.tiktok.com/@cuztomtuning" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-muted/50 transition-colors font-medium"
                  >
                    Follow on TikTok
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;