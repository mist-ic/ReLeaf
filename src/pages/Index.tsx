
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import OnboardingSection from '@/components/sections/OnboardingSection';
import ChallengeDashboard from '@/components/sections/ChallengeDashboard';
import ProgressSection from '@/components/sections/ProgressSection';
import CommunitySection from '@/components/sections/CommunitySection';
import ChallengeCompletionSection from '@/components/sections/ChallengeCompletionSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import FutureFeaturesSection from '@/components/sections/FutureFeaturesSection';
import JoinMovementSection from '@/components/sections/JoinMovementSection';
import EcoTips from '@/components/EcoTips';
import AppNotification from '@/components/AppNotification';

type AppSection = 'hero' | 'onboarding' | 'dashboard' | 'progress' | 'community' | 'completion' | 'how-it-works' | 'future-features' | 'join';

const Index = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>('hero');
  const [showNotification, setShowNotification] = useState(true);
  
  const handleStartJourney = () => {
    setCurrentSection('onboarding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCompleteOnboarding = () => {
    setCurrentSection('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCompletionContinue = () => {
    setCurrentSection('progress');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const renderSection = () => {
    switch (currentSection) {
      case 'hero':
        return <HeroSection onStart={handleStartJourney} />;
      case 'onboarding':
        return <OnboardingSection onComplete={handleCompleteOnboarding} />;
      case 'dashboard':
        return (
          <>
            <ChallengeDashboard />
            <button 
              className="fixed right-6 bottom-16 bg-leafy-500 text-white rounded-full p-3 shadow-lg hover:bg-leafy-600 transition-colors z-40"
              onClick={() => setCurrentSection('completion')}
              title="Submit proof"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11L11 15L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </>
        );
      case 'completion':
        return <ChallengeCompletionSection onContinue={handleCompletionContinue} />;
      case 'progress':
        return (
          <>
            <ProgressSection />
            <button
              className="fixed right-6 bottom-16 bg-leafy-500 text-white rounded-full p-3 shadow-lg hover:bg-leafy-600 transition-colors z-40"
              onClick={() => setCurrentSection('community')}
              title="Continue demo"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        );
      case 'community':
        return (
          <>
            <CommunitySection />
            <button
              className="fixed right-6 bottom-16 bg-leafy-500 text-white rounded-full p-3 shadow-lg hover:bg-leafy-600 transition-colors z-40"
              onClick={() => setCurrentSection('how-it-works')}
              title="Continue demo"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        );
      case 'how-it-works':
        return (
          <>
            <HowItWorksSection />
            <button
              className="fixed right-6 bottom-16 bg-leafy-500 text-white rounded-full p-3 shadow-lg hover:bg-leafy-600 transition-colors z-40"
              onClick={() => setCurrentSection('future-features')}
              title="Continue demo"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        );
      case 'future-features':
        return (
          <>
            <FutureFeaturesSection />
            <button
              className="fixed right-6 bottom-16 bg-leafy-500 text-white rounded-full p-3 shadow-lg hover:bg-leafy-600 transition-colors z-40"
              onClick={() => setCurrentSection('join')}
              title="Continue demo"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        );
      case 'join':
        return (
          <>
            <JoinMovementSection />
            <button
              className="fixed right-6 bottom-16 bg-leafy-500 text-white rounded-full p-3 shadow-lg hover:bg-leafy-600 transition-colors z-40"
              onClick={() => {
                setCurrentSection('hero');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Restart demo"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C2 10 4.00498 7.26822 5.63384 5.63824C7.26269 4.00827 9.5136 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.89691 21 4.43511 18.2543 3.35177 14.5M2 10V4M2 10H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        );
      default:
        return <HeroSection onStart={handleStartJourney} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation onStart={handleStartJourney} />
      <main className="flex-grow">
        {renderSection()}
      </main>
      <Footer />
      
      {/* Interactive elements */}
      <EcoTips />
      {showNotification && <AppNotification onClose={() => setShowNotification(false)} />}
      
      {/* Demo navigation */}
      <div className="fixed left-4 bottom-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-2 z-40 hidden md:block">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-leafy-600 font-medium px-2">Demo Navigation:</p>
          {(
            [
              { id: 'hero', label: 'Intro' },
              { id: 'onboarding', label: 'Onboarding' },
              { id: 'dashboard', label: 'Challenges' },
              { id: 'completion', label: 'Complete Challenge' },
              { id: 'progress', label: 'Progress' },
              { id: 'community', label: 'Community' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'future-features', label: 'Future' },
              { id: 'join', label: 'Join' },
            ] as { id: AppSection; label: string }[]
          ).map(section => (
            <button
              key={section.id}
              className={`text-xs px-3 py-1 rounded-md ${
                currentSection === section.id
                  ? 'bg-leafy-500 text-white'
                  : 'hover:bg-leafy-100 text-leafy-700'
              }`}
              onClick={() => {
                setCurrentSection(section.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
