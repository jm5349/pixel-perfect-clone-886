import React from 'react';
import Header from '@/components/Header';

import Categories from '@/components/Categories';
import BrandCarousel from '@/components/BrandCarousel';
import ProductShowcase from '@/components/ProductShowcase';
import About from '@/components/About';
import InstagramFeed from '@/components/InstagramFeed';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <Categories />
      <BrandCarousel />
      <ProductShowcase />
      <About />
      <InstagramFeed />
      <Footer />
    </div>
  );
};

export default Index;
