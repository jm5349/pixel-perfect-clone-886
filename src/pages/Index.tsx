import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import BrandCarousel from '@/components/BrandCarousel';
import FeaturedModels from '@/components/FeaturedModels';
import ProductShowcase from '@/components/ProductShowcase';
import About from '@/components/About';
import BespokeServices from '@/components/BespokeServices';
import InstagramFeed from '@/components/InstagramFeed';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <BrandCarousel />
      <FeaturedModels />
      <ProductShowcase />
      <About />
      <BespokeServices />
      <InstagramFeed />
      <Footer />
    </div>
  );
};

export default Index;
