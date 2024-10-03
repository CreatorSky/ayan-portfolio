import React from 'react';
import SlideShow from './SlideShow.tsx';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-page__content">
        <div className="about-page__photo fixed top-0 left-0 w-full h-screen">
          <img src="/images/ayan-self.jpg" alt="Ayan Mansuri" className="about-page__image object-cover w-full h-full" />
        </div>
      </div>
      <SlideShow />
    </div>
  );
};

export default AboutPage;