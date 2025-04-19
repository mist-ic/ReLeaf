
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gift, Star, Leaf, Tag, Clock, ShoppingBag, Award } from 'lucide-react';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  
  // Dummy user data
  const userData = {
    points: 875,
  };
  
  // Dummy rewards data
  const partnerRewards = [
    {
      id: 1,
      title: "15% Off at EcoGear",
      description: "Get 15% off your next purchase of sustainable outdoor equipment.",
      pointCost: 200,
      partner: "EcoGear",
      category: "shopping",
      expiry: "May 15, 2025",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Free Plant with $20 Purchase",
      description: "Receive a free plant when you spend $20 or more at GreenThumb Garden Center.",
      pointCost: 150,
      partner: "GreenThumb Garden Center",
      category: "shopping",
      expiry: "Apr 30, 2025",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Buy One Get One Free Smoothie",
      description: "Enjoy a free smoothie when you purchase one at Green Blends Juice Bar.",
      pointCost: 120,
      partner: "Green Blends",
      category: "food",
      expiry: "May 5, 2025",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "30% Off Reusable Products",
      description: "Save 30% on any reusable products at Zero Waste Store.",
      pointCost: 250,
      partner: "Zero Waste Store",
      category: "shopping",
      expiry: "May 20, 2025",
      image: "/placeholder.svg"
    }
  ];
  
  const donationRewards = [
    {
      id: 1,
      title: "Plant a Tree",
      description: "Donate your points to plant a tree through the Forest Restoration Project.",
      pointCost: 100,
      organization: "Forest Restoration Project",
      impact: "1 tree planted",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Clean 5 lbs of Ocean Plastic",
      description: "Help remove plastic waste from the oceans with Ocean Cleanup Initiative.",
      pointCost: 150,
      organization: "Ocean Cleanup Initiative",
      impact: "5 lbs of plastic removed",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Protect 10 sq ft of Rainforest",
      description: "Your points will help purchase and protect endangered rainforest land.",
      pointCost: 200,
      organization: "Rainforest Trust",
      impact: "10 sq ft protected",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Provide Clean Water",
      description: "Help provide clean water to communities in need.",
      pointCost: 250,
      organization: "Clean Water Fund",
      impact: "Clean water for 1 person for a month",
      image: "/placeholder.svg"
    }
  ];
  
  const exclusiveItems = [
    {
      id: 1,
      title: "ReLeaf Branded Water Bottle",
      description: "A stylish, insulated stainless steel water bottle with the ReLeaf logo.",
      pointCost: 350,
      shipping: "Free",
      availability: "In stock",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Eco-Warrior T-Shirt",
      description: "100% organic cotton t-shirt featuring exclusive ReLeaf designs.",
      pointCost: 300,
      shipping: "Free",
      availability: "In stock",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Bamboo Utensil Set",
      description: "Portable bamboo utensil set with carrying case.",
      pointCost: 250,
      shipping: "Free",
      availability: "Limited stock",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Zero Waste Starter Kit",
      description: "Everything you need to start your zero waste journey.",
      pointCost: 500,
      shipping: "Free",
      availability: "Pre-order",
      image: "/placeholder.svg"
    }
  ];
  
  const userBadges = [
    {
      id: 1,
      title: "Reusable Rookie",
      description: "Use a reusable item 5 times instead of disposable alternatives.",
      acquired: true,
      date: "Mar 12, 2025",
      icon: "🥤"
    },
    {
      id: 2,
      title: "Water Saver",
      description: "Complete 3 water-saving challenges.",
      acquired: true,
      date: "Mar 15, 2025",
      icon: "💧"
    },
    {
      id: 3,
      title: "Green Thumb",
      description: "Plant your first plant or start a garden.",
      acquired: true,
      date: "Mar 21, 2025",
      icon: "🌱"
    },
    {
      id: 4,
      title: "Pedal Power",
      description: "Choose biking over driving 5 times.",
      acquired: true,
      date: "Mar 25, 2025",
      icon: "🚲"
    },
    {
      id: 5,
      title: "Digital Declutterer",
      description: "Clean up your digital space to save energy.",
      acquired: true,
      date: "Apr 02, 2025",
      icon: "📱"
    },
    {
      id: 6,
      title: "Zero Waste Warrior",
      description: "Complete a full week without creating trash.",
      acquired: false,
      progress: 60,
      icon: "♻️"
    },
    {
      id: 7,
      title: "Community Hero",
      description: "Participate in 3 community clean-up events.",
      acquired: false,
      progress: 33,
      icon: "🌍"
    },
    {
      id: 8,
      title: "Plastic-Free Pioneer",
      description: "Go without single-use plastic for 2 weeks.",
      acquired: false,
      progress: 25,
      icon: "🚫"
    }
  ];
  
  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-leafy-800">Rewards & Achievements</h2>
            <p className="mt-4 text-lg text-leafy-600 max-w-2xl mx-auto">
              Turn your eco-friendly actions into real-world rewards! Redeem your points for discounts, donate to causes, or earn exclusive items.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-leafy-500 text-white p-3 rounded-full mr-4">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-leafy-600">Your Points Balance</p>
                <p className="text-2xl font-bold text-leafy-800">{userData.points}</p>
              </div>
            </div>
            <div>
              <Button className="eco-button">
                Earn More Points
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="marketplace" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-white mb-6 p-1 rounded-lg mx-auto w-full md:w-fit">
              <TabsTrigger value="marketplace">Rewards Marketplace</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="exclusive">Exclusive Items</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>
            
            {/* Partner Rewards Tab */}
            <TabsContent value="marketplace" className="animate-grow origin-top">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {partnerRewards.map((reward) => (
                      <Card key={reward.id} className="overflow-hidden">
                        <div className="h-32 bg-leafy-100 relative">
                          <img 
                            src={reward.image} 
                            alt={reward.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-white text-leafy-700">
                              {reward.category === 'shopping' ? 'Shopping' : 'Food & Drink'}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{reward.title}</CardTitle>
                          <CardDescription className="text-sm">{reward.partner}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-leafy-600 mb-4">
                            {reward.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-leafy-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>Expires: {reward.expiry}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Leaf className="h-4 w-4 text-leafy-600 mr-1" />
                            <span className="font-medium">{reward.pointCost} points</span>
                          </div>
                          <Button 
                            variant="outline" 
                            className={userData.points >= reward.pointCost ? "text-leafy-700 border-leafy-300 hover:bg-leafy-50" : "text-gray-400 border-gray-200 cursor-not-allowed"}
                            disabled={userData.points < reward.pointCost}
                          >
                            Redeem
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">How It Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3">
                        <div className="bg-leafy-100 text-leafy-700 h-8 w-8 rounded-full flex items-center justify-center shrink-0">1</div>
                        <div>
                          <p className="font-medium text-leafy-800">Complete Challenges</p>
                          <p className="text-sm text-leafy-600">Earn points by completing eco-friendly challenges</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-leafy-100 text-leafy-700 h-8 w-8 rounded-full flex items-center justify-center shrink-0">2</div>
                        <div>
                          <p className="font-medium text-leafy-800">Browse Rewards</p>
                          <p className="text-sm text-leafy-600">Find rewards from our partners that interest you</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-leafy-100 text-leafy-700 h-8 w-8 rounded-full flex items-center justify-center shrink-0">3</div>
                        <div>
                          <p className="font-medium text-leafy-800">Redeem Points</p>
                          <p className="text-sm text-leafy-600">Exchange your points for your chosen reward</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-leafy-100 text-leafy-700 h-8 w-8 rounded-full flex items-center justify-center shrink-0">4</div>
                        <div>
                          <p className="font-medium text-leafy-800">Enjoy Your Reward</p>
                          <p className="text-sm text-leafy-600">Receive your reward code or item and enjoy!</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Featured Partners</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-white">EcoGear</Badge>
                        <Badge variant="outline" className="bg-white">Green Blends</Badge>
                        <Badge variant="outline" className="bg-white">Zero Waste Store</Badge>
                        <Badge variant="outline" className="bg-white">GreenThumb Garden</Badge>
                        <Badge variant="outline" className="bg-white">Eco Cafe</Badge>
                        <Badge variant="outline" className="bg-white">Sustainable Style</Badge>
                        <Badge variant="outline" className="bg-white">+ 12 more</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Donations Tab */}
            <TabsContent value="donations" className="animate-grow origin-top">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {donationRewards.map((donation) => (
                      <Card key={donation.id} className="overflow-hidden">
                        <div className="h-32 bg-leafy-100 relative">
                          <img 
                            src={donation.image} 
                            alt={donation.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{donation.title}</CardTitle>
                          <CardDescription className="text-sm">{donation.organization}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-leafy-600 mb-4">
                            {donation.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-leafy-600">
                            <div className="flex items-center gap-1">
                              <Leaf className="h-3 w-3" />
                              <span>Impact: {donation.impact}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Leaf className="h-4 w-4 text-leafy-600 mr-1" />
                            <span className="font-medium">{donation.pointCost} points</span>
                          </div>
                          <Button 
                            variant="outline" 
                            className={userData.points >= donation.pointCost ? "text-leafy-700 border-leafy-300 hover:bg-leafy-50" : "text-gray-400 border-gray-200 cursor-not-allowed"}
                            disabled={userData.points < donation.pointCost}
                          >
                            Donate
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-leafy-50 rounded-lg p-4">
                        <div className="text-center mb-4">
                          <span className="text-4xl font-bold text-leafy-800">2</span>
                          <p className="text-leafy-600">Trees planted</p>
                        </div>
                        <div className="text-center mb-4">
                          <span className="text-4xl font-bold text-leafy-800">15</span>
                          <p className="text-leafy-600">lbs of ocean plastic removed</p>
                        </div>
                        <div className="text-center mb-4">
                          <span className="text-4xl font-bold text-leafy-800">20</span>
                          <p className="text-leafy-600">sq ft of rainforest protected</p>
                        </div>
                        <Button className="w-full eco-button mt-2">
                          View Impact Certificate
                        </Button>
                      </div>
                      <div className="text-xs text-center text-leafy-600">
                        Your donations through ReLeaf are making a real difference! Thank you for your contribution to a greener planet.
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Donation Partners</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Forest Restoration Project</p>
                            <p className="text-xs text-leafy-600">Planting trees worldwide</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Ocean Cleanup Initiative</p>
                            <p className="text-xs text-leafy-600">Removing plastic from oceans</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Rainforest Trust</p>
                            <p className="text-xs text-leafy-600">Protecting endangered habitats</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Clean Water Fund</p>
                            <p className="text-xs text-leafy-600">Providing clean water access</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Exclusive Items Tab */}
            <TabsContent value="exclusive" className="animate-grow origin-top">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {exclusiveItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="h-32 bg-leafy-100 relative">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className={
                              item.availability === "In stock" 
                                ? "bg-green-100 text-green-800" 
                                : item.availability === "Limited stock" 
                                  ? "bg-amber-100 text-amber-800" 
                                  : "bg-blue-100 text-blue-800"
                            }>
                              {item.availability}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription className="text-sm">Exclusive ReLeaf Product</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-leafy-600 mb-4">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-leafy-600">
                            <div className="flex items-center gap-1">
                              <ShoppingBag className="h-3 w-3" />
                              <span>Shipping: {item.shipping}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Leaf className="h-4 w-4 text-leafy-600 mr-1" />
                            <span className="font-medium">{item.pointCost} points</span>
                          </div>
                          <Button 
                            variant="outline" 
                            className={userData.points >= item.pointCost ? "text-leafy-700 border-leafy-300 hover:bg-leafy-50" : "text-gray-400 border-gray-200 cursor-not-allowed"}
                            disabled={userData.points < item.pointCost}
                          >
                            Redeem
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">About Exclusive Items</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-leafy-600">
                        Our exclusive items are specially designed for ReLeaf members. These sustainable products help you continue your eco-friendly lifestyle while showing off your ReLeaf membership.
                      </p>
                      <div className="space-y-3 mt-4">
                        <div className="flex gap-3">
                          <Tag className="h-5 w-5 text-leafy-600" />
                          <p className="text-sm text-leafy-600">All products are made with sustainable materials</p>
                        </div>
                        <div className="flex gap-3">
                          <Tag className="h-5 w-5 text-leafy-600" />
                          <p className="text-sm text-leafy-600">Carbon-neutral shipping on all items</p>
                        </div>
                        <div className="flex gap-3">
                          <Tag className="h-5 w-5 text-leafy-600" />
                          <p className="text-sm text-leafy-600">Minimal, plastic-free packaging</p>
                        </div>
                        <div className="flex gap-3">
                          <Tag className="h-5 w-5 text-leafy-600" />
                          <p className="text-sm text-leafy-600">New exclusive items added monthly</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recently Redeemed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">@greenwarrior</p>
                            <p className="text-xs text-leafy-600">ReLeaf Branded Water Bottle</p>
                          </div>
                          <div className="text-xs text-leafy-500">2h ago</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">@ecofriend</p>
                            <p className="text-xs text-leafy-600">Bamboo Utensil Set</p>
                          </div>
                          <div className="text-xs text-leafy-500">5h ago</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">@planetlover</p>
                            <p className="text-xs text-leafy-600">Eco-Warrior T-Shirt</p>
                          </div>
                          <div className="text-xs text-leafy-500">1d ago</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Badges Tab */}
            <TabsContent value="badges" className="animate-grow origin-top">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userBadges.map((badge) => (
                  <Card key={badge.id} className={`border ${badge.acquired ? 'border-amber-200' : 'border-gray-200'} overflow-hidden`}>
                    <div className={`h-20 flex items-center justify-center ${badge.acquired ? 'bg-amber-50' : 'bg-gray-50'}`}>
                      <div className="text-4xl">
                        {badge.icon}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className={`text-lg ${badge.acquired ? 'text-leafy-800' : 'text-gray-500'}`}>
                        {badge.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-sm ${badge.acquired ? 'text-leafy-600' : 'text-gray-400'} mb-4`}>
                        {badge.description}
                      </p>
                      {badge.acquired ? (
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-500" />
                          <span className="text-xs text-leafy-600">Earned on {badge.date}</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between mb-1 text-xs">
                            <span className="text-gray-500">Progress</span>
                            <span className="text-gray-500">{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-1" />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full text-xs"
                        disabled={!badge.acquired}
                      >
                        {badge.acquired ? "Share Achievement" : "Challenge In Progress"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rewards;
