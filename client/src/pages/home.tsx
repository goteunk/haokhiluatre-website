import { Link } from 'wouter';
import { Play, Box, ChevronDown } from 'lucide-react';

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero background gradient */}
        <div className="absolute inset-0 hero-gradient"></div>
        
        {/* Background video */}
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          data-testid="hero-video"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Hào Khí Lửa Tre
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Cinematic UE5 — dự án indie bởi The Weakened
          </p>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            Khám phá thế giới võ thuật cổ đại với công nghệ đồ họa hiện đại. 
            Trải nghiệm câu chuyện đầy cảm xúc về danh dự và lửa tre bất diệt.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/videos">
              <button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-3"
                data-testid="button-watch-teaser"
              >
                <Play className="w-5 h-5" />
                Xem Teaser
              </button>
            </Link>
            <Link href="/models">
              <button 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-border hover:border-primary flex items-center gap-3"
                data-testid="button-explore-models"
              >
                <Box className="w-5 h-5" />
                Khám phá Mô Hình 3D
              </button>
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </section>
    </div>
  );
}
