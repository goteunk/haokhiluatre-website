import { usePreset } from '../../contexts/PresetContext';
import HeroModern from './modern/HeroModern';
import HeroTrad from './trad/HeroTrad';

export default function PresetAwareHero() {
  const { preset } = usePreset();
  
  if (preset === 'trad') {
    return <HeroTrad />;
  }
  
  return <HeroModern />;
}