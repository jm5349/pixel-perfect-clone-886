import React from 'react';
import Header from '@/components/Header';
import BusinessInfo from '@/components/BusinessInfo';
import SearchBar from '@/components/SearchBar';
import Categories from '@/components/Categories';
import ProductShowcase from '@/components/ProductShowcase';
import About from '@/components/About';
import InstagramFeed from '@/components/InstagramFeed';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BusinessInfo />
      <div className="relative z-[1000]">
        <SearchBar />
      </div>
      <Categories />
      <ProductShowcase />
      <About />
      <InstagramFeed />
      <Footer />
    </div>
  );
};

export default Index;
