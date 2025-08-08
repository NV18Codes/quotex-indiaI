import React from 'react';
import Hero from '../components/Hero';
import Steps from '../components/Steps';
import About from '../components/About';
import Plans from '../components/Plans';
import Showcase from '../components/Showcase';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div>
      <Hero />
      <Steps />
      <About />
      <Plans />
      <Showcase />
      <Contact />
    </div>
  );
}
