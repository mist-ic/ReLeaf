
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Leaf, Check, Calendar, ArrowUp, User, Star, MapPin, Clock, Upload } from "lucide-react";

type Challenge = {
  id: string;
  title: string;
  description: string;
  instructions: string;
  points: number;
  badge: string;
  category: string;
  progress?: number;
  completed?: boolean;
  impact?: string;
  proofRequirement?: string;
};

const ChallengeDashboard = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Reusable Cup Hero',
      description: 'Use a reusable coffee cup or water bottle today.',
      instructions: 'Bring your own reusable cup when buying coffee today or use a refillable water bottle. Take a photo with the cup or bottle as proof.',
      points: 10,
      badge: 'Reusable Rookie',
      category: 'daily',
      progress: 60,
      impact: 'Saves 1 disposable cup from landfill. If done daily for a year, prevents 365 cups from being thrown away.',
      proofRequirement: 'Photo of you using your reusable cup with timestamp.',
    },
    {
      id: '2',
      title: 'Shorten Your Shower',
      description: 'Take a shower under 5 minutes.',
      instructions: 'Set a timer for 5 minutes before stepping into the shower. Try to finish before the timer goes off.',
      points: 15,
      badge: 'Water Saver',
      category: 'daily',
      progress: 30,
      impact: 'Saves approximately 10-15 gallons of water per shower.',
      proofRequirement: 'Screenshot of a timer showing under 5 minutes.',
    },
    {
      id: '3',
      title: 'Digital Clean-Up',
      description: 'Clean up your inbox by unsubscribing from unnecessary lists.',
      instructions: 'Go through your email and identify subscriptions you no longer need. Unsubscribe from at least 5 email lists.',
      points: 20,
      badge: 'Digital Declutterer',
      category: 'daily',
      progress: 0,
      impact: 'Reduces digital carbon footprint by minimizing server energy for storing and sending emails.',
      proofRequirement: 'Screenshot of your unsubscribe confirmations.',
    },
    {
      id: '4',
      title: 'Zero-Waste Week',
      description: 'Go zero waste for a week. Document with daily photos.',
      instructions: 'Avoid generating trash that cannot be recycled or composted for an entire week. Plan your meals, shopping and activities to minimize waste.',
      points: 100,
      badge: 'Zero Waste Champion',
      category: 'weekly',
      progress: 15,
      impact: 'Prevents approximately 4.5 pounds of trash from entering landfills.',
      proofRequirement: 'Daily photos of your zero-waste activities.',
    },
    {
      id: '5',
      title: 'Bike for 3 Days',
      description: 'Bike instead of driving for 3 days. Submit your biking logs.',
      instructions: 'Replace car trips with bicycle rides for 3 days this week. Keep track of the distance covered.',
      points: 50,
      badge: 'Pedal Power',
      category: 'weekly',
      progress: 66,
      impact: 'Reduces carbon emissions by approximately 25 lbs per 10 miles biked instead of driven.',
      proofRequirement: 'Screenshots of your biking app logs or photos.',
    },
    {
      id: '6',
      title: 'Community Cleanup',
      description: 'Join or organize a community cleanup. Upload before-and-after photos.',
      instructions: 'Find a local area that needs cleaning and spend at least 1 hour picking up trash. Better yet, invite friends to join!',
      points: 75,
      badge: 'Neighborhood Hero',
      category: 'weekly',
      progress: 0,
      impact: 'Directly removes litter that could harm wildlife and pollute water sources.',
      proofRequirement: 'Before and after photos of the cleanup area.',
    },
    {
      id: '7',
      title: 'Plastic-Free Week',
      description: 'Go entirely plastic-free for one week.',
      instructions: 'Avoid buying or using any single-use plastic items for a week. Find alternatives for packaging, utensils, and containers.',
      points: 200,
      badge: 'Plastic-Free Pioneer',
      category: 'monthly',
      progress: 10,
      impact: 'Prevents approximately 20 pieces of plastic waste from entering the environment.',
      proofRequirement: 'Daily photos of your plastic-free solutions.',
    },
    {
      id: '8',
      title: 'Plant a Tree (or Garden)',
      description: 'Plant a tree or set up an indoor garden.',
      instructions: 'Plant a native tree species in your yard or community, or create an indoor garden with at least 3 plants.',
      points: 150,
      badge: 'Green Thumb',
      category: 'monthly',
      progress: 0,
      impact: 'A single tree can absorb up to 48 pounds of CO2 per year and provide habitat for wildlife.',
      proofRequirement: 'Photo of your newly planted tree or garden setup.',
    },
    {
      id: '9',
      title: 'Host an Eco-Swap Event',
      description: 'Organize or join an eco-swap event.',
      instructions: 'Arrange a gathering where people can exchange items they no longer need instead of buying new or throwing away.',
      points: 100,
      badge: 'Eco-Swap Host',
      category: 'monthly',
      progress: 0,
      impact: 'Extends the lifecycle of products, reducing waste and the need for new manufacturing.',
      proofRequirement: 'Photos from the event showing exchanged items.',
    },
  ]);
  
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  
  const handleViewDetails = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };
  
  const handleSubmitProof = () => {
    setIsSubmissionDialogOpen(false);
    setSubmitted(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };
  
  const renderChallengeCard = (challenge: Challenge) => (
    <div key={challenge.id} className="challenge-card">
      <div className="flex justify-between items-start">
        <div className="badge-icon">
          <Leaf className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-leafy-600">+{challenge.points} pts</span>
      </div>
      
      <div>
        <h3 className="font-bold text-lg text-leafy-800">{challenge.title}</h3>
        <p className="mt-1 text-leafy-600 text-sm">{challenge.description}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="bg-leafy-50 px-3 py-1 rounded-full text-xs text-leafy-700 font-medium">
          {challenge.category === 'daily' ? 'Daily' : challenge.category === 'weekly' ? 'Weekly' : 'Monthly'} Challenge
        </div>
        <Button 
          variant="link" 
          className="text-leafy-600 hover:text-leafy-700 p-0 h-auto text-sm font-medium"
          onClick={() => handleViewDetails(challenge)}
        >
          View Details
        </Button>
      </div>
      
      <div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${challenge.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-leafy-600">Challenge Progress</span>
          <span className="text-xs font-medium text-leafy-700">{challenge.progress}%</span>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="bg-leafy-50/50 min-h-screen py-12">
      <div className="section-container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">Your Eco-Challenge Dashboard</h2>
          <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
            Choose from personalized challenges designed to fit your lifestyle. Complete them to earn points, badges, and real-world impact!
          </p>
        </div>
        
        {/* Challenge Tabs */}
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="bg-white mb-6 p-1 rounded-lg mx-auto block w-fit">
            <TabsTrigger value="daily" className="text-sm">Daily Challenges</TabsTrigger>
            <TabsTrigger value="weekly" className="text-sm">Weekly Challenges</TabsTrigger>
            <TabsTrigger value="monthly" className="text-sm">Monthly Challenges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="animate-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.filter(c => c.category === 'daily').map(renderChallengeCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="animate-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.filter(c => c.category === 'weekly').map(renderChallengeCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="animate-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.filter(c => c.category === 'monthly').map(renderChallengeCard)}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Challenge Detail Dialog */}
        {selectedChallenge && (
          <Dialog open={!!selectedChallenge} onOpenChange={open => !open && setSelectedChallenge(null)}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-leafy-800 flex items-center">
                  <div className="badge-icon mr-2">
                    <Leaf className="h-4 w-4" />
                  </div>
                  {selectedChallenge.title}
                </DialogTitle>
                <DialogDescription className="text-leafy-600">
                  {selectedChallenge.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-leafy-700 mb-1">Instructions:</h4>
                  <p className="text-sm text-leafy-600">{selectedChallenge.instructions}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-leafy-50 rounded-lg p-3 flex items-center">
                    <Star className="h-4 w-4 text-leafy-600 mr-2" />
                    <div>
                      <p className="text-xs text-leafy-600">Points</p>
                      <p className="font-medium text-leafy-800">{selectedChallenge.points} pts</p>
                    </div>
                  </div>
                  
                  <div className="bg-leafy-50 rounded-lg p-3 flex items-center">
                    <User className="h-4 w-4 text-leafy-600 mr-2" />
                    <div>
                      <p className="text-xs text-leafy-600">Badge</p>
                      <p className="font-medium text-leafy-800">{selectedChallenge.badge}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-leafy-700 mb-1">Environmental Impact:</h4>
                  <p className="text-sm text-leafy-600">{selectedChallenge.impact}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-leafy-700 mb-1">Proof Required:</h4>
                  <p className="text-sm text-leafy-600">{selectedChallenge.proofRequirement}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-leafy-700 mb-1">Progress:</h4>
                  <Progress value={selectedChallenge.progress} className="h-2" />
                  <p className="text-xs text-right mt-1 text-leafy-600">{selectedChallenge.progress}% complete</p>
                </div>
                
                <div className="pt-2 flex justify-end">
                  <Dialog open={isSubmissionDialogOpen} onOpenChange={setIsSubmissionDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="eco-button">
                        Submit Proof
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Submit Challenge Proof</DialogTitle>
                        <DialogDescription>
                          Upload a photo or screenshot as proof of completing <span className="font-medium">{selectedChallenge.title}</span>
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-leafy-200 rounded-lg p-8 text-center">
                          <Upload className="h-10 w-10 text-leafy-400 mx-auto mb-2" />
                          <p className="text-sm text-leafy-600 mb-2">Drag & drop your proof here</p>
                          <Button variant="outline" size="sm" className="text-xs">
                            Browse Files
                          </Button>
                        </div>
                        
                        <div className="bg-leafy-50 rounded-lg p-3">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-leafy-600 mr-2" />
                            <p className="text-sm text-leafy-700">Location: <span className="font-medium">Current Location</span></p>
                          </div>
                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-leafy-600 mr-2" />
                            <p className="text-sm text-leafy-700">Timestamp: <span className="font-medium">{new Date().toLocaleString()}</span></p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsSubmissionDialogOpen(false)}>Cancel</Button>
                          <Button className="eco-button" onClick={handleSubmitProof}>Complete Challenge</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Congratulation Dialog */}
        {submitted && (
          <Dialog open={submitted} onOpenChange={setSubmitted}>
            <DialogContent className="sm:max-w-md text-center">
              <div className="relative">
                {confetti && Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 left-1/2 w-2 h-2 rounded-full animate-confetti"
                    style={{
                      backgroundColor: ['#48a948', '#FFC107', '#FF5722', '#2196F3'][i % 4],
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${1 + Math.random() * 3}s`,
                      animationDelay: `${Math.random() * 0.5}s`,
                    }}
                  ></div>
                ))}
              </div>
              
              <div className="bg-leafy-500 text-white rounded-full h-20 w-20 flex items-center justify-center mx-auto">
                <Check className="h-10 w-10" />
              </div>
              
              <h3 className="mt-4 text-2xl font-bold text-leafy-800">Challenge Completed!</h3>
              <p className="mt-2 text-leafy-600">
                Congratulations! You've earned 10 points and unlocked the "Reusable Rookie" badge!
              </p>
              
              <div className="mt-4 p-4 bg-leafy-50 rounded-lg">
                <p className="text-sm font-medium text-leafy-700">Environmental Impact:</p>
                <p className="text-sm text-leafy-600">You've saved 1 disposable cup from the landfill!</p>
                <div className="mt-3">
                  <div className="bg-white h-1 rounded-full">
                    <div className="bg-leafy-500 h-1 rounded-full animate-progress" style={{ maxWidth: '15%' }}></div>
                  </div>
                  <p className="text-xs text-right mt-1 text-leafy-600">15% progress to next level</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="eco-button" onClick={() => setSubmitted(false)}>
                  Back to Challenges
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default ChallengeDashboard;
