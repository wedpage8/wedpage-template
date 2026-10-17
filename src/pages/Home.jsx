import { useEffect } from 'react';
import Countdown from '../components/Countdown/Countdown.jsx';
import EventDetails from '../components/EventDetails/EventDetails.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Gallery from '../components/Gallery/Gallery.jsx';
import Hero from '../components/Hero/Hero.jsx';
import Location from '../components/Location/Location.jsx';
import RSVP from '../components/RSVP/RSVP.jsx';
import Story from '../components/Story/Story.jsx';
import weddingData from '../data/weddingData.js';

export default function Home() {
  useEffect(() => {
    const metadata = {
      description: weddingData.seoDescription,
      'og:title': weddingData.seoTitle,
      'og:description': weddingData.seoDescription,
      'og:image': weddingData.heroImage,
    };

    document.title = weddingData.seoTitle;
    Object.entries(metadata).forEach(([name, content]) => {
      const attribute = name.startsWith('og:') ? 'property' : 'name';
      document.querySelector(`meta[${attribute}="${name}"]`)?.setAttribute('content', content);
    });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {weddingData.copy.skipToContent}
      </a>
      <Hero data={weddingData} />
      <main id="main-content">
        <Countdown data={weddingData} />
        <Story data={weddingData} />
        <EventDetails data={weddingData} />
        <Gallery data={weddingData} />
        <Location data={weddingData} />
        <RSVP data={weddingData} />
      </main>
      <Footer data={weddingData} />
    </>
  );
}