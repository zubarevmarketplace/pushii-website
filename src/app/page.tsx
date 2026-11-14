import { Header } from '@/components/Header';
import { Hero } from '@/components/sections/Hero';
import { Care } from '@/components/sections/Care';
import { About, Principles } from '@/components/sections/About';
import { Production } from '@/components/sections/Production';
import { Questions } from '@/components/sections/Questions';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';
import { PetWorld } from '@/components/sections/PetWorld';
import { StructuredData } from '@/components/StructuredData';

export default function Home() {
  return <><StructuredData/><a className="skip-link" href="#main">Перейти к содержимому</a><div id="top" tabIndex={-1}/><Header/><main id="main" tabIndex={-1}><Hero/><PetWorld/><Principles/><Care/><About/><Production/><Questions/><Contact/></main><Footer/></>;
}
