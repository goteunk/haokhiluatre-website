import { usePreset } from '../../contexts/PresetContext';
import NavbarModern from './modern/NavbarModern';
import NavbarTrad from './trad/NavbarTrad';

export default function PresetAwareNavbar() {
  const { preset } = usePreset();
  
  if (preset === 'trad') {
    return <NavbarTrad />;
  }
  
  return <NavbarModern />;
}