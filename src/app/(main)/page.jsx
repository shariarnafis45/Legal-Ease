import React from 'react';
import Banner from '../components/home/Banner';
import FeaturedLawyers from '../components/home/FeaturedLawyers';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TopLegalExperts from '../components/home/TopLegalExperts';
import LegalCategories from '../components/home/LegalCategories';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <>
    <Banner/>
    <FeaturedLawyers/>
    <WhyChooseUs/>
    <TopLegalExperts/>
    <LegalCategories/>
    <CTASection/>
    
    </>
  );
};

export default HomePage;