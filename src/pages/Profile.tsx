import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowUp, Award, Leaf, Calendar, Check, Star, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ProfileForm } from '@/components/profile/ProfileForm';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-leafy-500"></div>
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { session, user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [signOutLoading, setSignOutLoading] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      navigate('/login');
    }
  }, [loading, session, navigate]);

  const handleSignOut = async () => {
    setSignOutLoading(true);
    await signOut();
    setSignOutLoading(false);
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-leafy-50/30 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  const dummyData = {
    level: 3,
    points: 875,
    totalPoints: 1000,
    completedChallenges: 23,
    streak: 7,
    joinDate: user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown",
    interests: ["Gardening", "Zero Waste"],
    badges: [
      { id: 1, name: "Reusable Rookie", icon: "🥤", date: "Mar 12, 2025" },
      { id: 2, name: "Water Saver", icon: "💧", date: "Mar 15, 2025" },
    ],
    recentActivity: [
      { id: 1, action: "Completed challenge", challenge: "Reusable Cup Hero", points: 10, date: "Apr 7, 2025" },
    ]
  };

  const displayName = profile.name || user?.email?.split('@')[0] || 'User';
  const displayUsername = user?.email?.split('@')[0] || 'username';
  const displayAvatarFallback = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-leafy-50/30 flex flex-col">
      <Navigation />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-leafy-100">
                <AvatarImage src="/placeholder.svg" alt={displayName} />
                <AvatarFallback className="bg-leafy-200 text-leafy-800 text-3xl">
                  {displayAvatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-leafy-800">{displayName}</h1>
                <p className="text-leafy-600">@{displayUsername}</p>
                {profile.age && <p className="text-sm text-leafy-600">Age: {profile.age}</p>}
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                  {dummyData.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="bg-leafy-50">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={handleSignOut}
                  disabled={signOutLoading}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {signOutLoading ? 'Signing Out...' : 'Sign Out'}
                </Button>
              </div>
              <div className="hidden md:flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-leafy-500" />
                  <span className="font-bold text-lg text-leafy-800">{dummyData.points} pts</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Award className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-leafy-600">Level {dummyData.level} Eco Warrior</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-leafy-600">Progress to Level {dummyData.level + 1}</span>
                <span className="font-medium text-leafy-800">{dummyData.points} / {dummyData.totalPoints}</span>
              </div>
              <Progress value={(dummyData.points / dummyData.totalPoints) * 100} className="h-2" />
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-white mb-6 p-1 rounded-lg mx-auto w-full md:w-fit">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 animate-grow origin-top">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Eco Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-leafy-50 rounded-lg p-4 text-center">
                          <Check className="h-6 w-6 text-leafy-600 mx-auto mb-1" />
                          <div className="font-bold text-xl text-leafy-800">{dummyData.completedChallenges}</div>
                          <div className="text-xs text-leafy-600">Challenges Completed</div>
                        </div>
                        <div className="bg-leafy-50 rounded-lg p-4 text-center">
                          <Award className="h-6 w-6 text-amber-500 mx-auto mb-1" />
                          <div className="font-bold text-xl text-leafy-800">{dummyData.badges.length}</div>
                          <div className="text-xs text-leafy-600">Badges Earned</div>
                        </div>
                        <div className="bg-leafy-50 rounded-lg p-4 text-center">
                          <Calendar className="h-6 w-6 text-leafy-600 mx-auto mb-1" />
                          <div className="font-bold text-xl text-leafy-800">{dummyData.streak}</div>
                          <div className="text-xs text-leafy-600">Day Streak</div>
                        </div>
                        <div className="bg-leafy-50 rounded-lg p-4 text-center">
                          <Leaf className="h-6 w-6 text-leafy-600 mx-auto mb-1" />
                          <div className="font-bold text-xl text-leafy-800">{dummyData.points}</div>
                          <div className="text-xs text-leafy-600">Total Points</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gradient-to-r from-leafy-500 to-leafy-600 text-white rounded-lg p-6 text-center">
                        <div className="font-bold text-3xl mb-2">{dummyData.streak}</div>
                        <div className="text-sm mb-4">Days in a row</div>
                        <div className="flex justify-center">
                          <div className="bg-white/20 rounded-full px-3 py-1 text-xs inline-flex items-center gap-1">
                            <ArrowUp className="h-3 w-3" /> Keep it going!
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dummyData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between py-2 border-b border-leafy-100 last:border-none">
                        <div>
                          <p className="font-medium text-leafy-800">{activity.action}</p>
                          {activity.challenge && (
                            <p className="text-sm text-leafy-600">{activity.challenge}</p>
                          )}
                          <p className="text-xs text-leafy-500">{activity.date}</p>
                        </div>
                        <div className="text-right">
                          {activity.points > 0 && (
                            <div className="flex items-center gap-1 text-sm font-medium text-leafy-700">
                              <span>+{activity.points}</span>
                              <Leaf className="h-4 w-4 text-leafy-500" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="animate-grow origin-top">
              <Card>
                <CardHeader>
                  <CardTitle>Your Earned Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {dummyData.badges.map((badge) => (
                      <div key={badge.id} className="bg-white border border-leafy-100 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                        <div className="bg-leafy-50 h-16 w-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-3">
                          {badge.icon}
                        </div>
                        <div className="font-medium text-leafy-800">{badge.name}</div>
                        <div className="text-xs text-leafy-600 mt-1">Earned on {badge.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="animate-grow origin-top">
              <Card>
                <CardHeader>
                  <CardTitle>Your Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-leafy-50 rounded-lg p-6">
                      <div className="text-center mb-6">
                        <span className="text-4xl font-bold text-leafy-800">156</span>
                        <p className="text-leafy-600">Plastic bottles saved</p>
                      </div>
                      <div className="text-center mb-6">
                        <span className="text-4xl font-bold text-leafy-800">42</span>
                        <p className="text-leafy-600">Gallons of water conserved</p>
                      </div>
                      <div className="text-center">
                        <span className="text-4xl font-bold text-leafy-800">28</span>
                        <p className="text-leafy-600">lbs of CO₂ emissions reduced</p>
                      </div>
                    </div>
                    <div className="text-center text-sm text-leafy-600 italic">
                      These stats represent the estimated impact of your completed challenges.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="animate-grow origin-top">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative ml-6 pb-2">
                      <div className="absolute left-0 top-0 ml-[-14px] h-full w-0.5 bg-leafy-200"></div>

                      {[
                        {
                          date: "April 7, 2025",
                          events: [
                            { time: "09:23 AM", title: "Completed Daily Challenge", desc: "Reusable Cup Hero", points: 10 },
                            { time: "08:15 AM", title: "Started Daily Challenge", desc: "Reusable Cup Hero" }
                          ]
                        },
                        {
                          date: "April 6, 2025",
                          events: [
                            { time: "06:30 PM", title: "Joined Team Challenge", desc: "Plant 100 Trees", points: 5 },
                            { time: "02:45 PM", title: "Earned Badge", desc: "Digital Declutterer", points: 20 },
                            { time: "11:15 AM", title: "Completed Challenge", desc: "Digital Clean-Up" }
                          ]
                        },
                        {
                          date: "April 5, 2025",
                          events: [
                            { time: "08:30 PM", title: "Invited Friend", desc: "@greenwhiz joined using your invite", points: 20 },
                            { time: "04:20 PM", title: "Joined Team", desc: "Urban Gardeners", points: 5 }
                          ]
                        }
                      ].map((day, dayIndex) => (
                        <div key={dayIndex} className="mb-8">
                          <div className="absolute left-0 ml-[-24px] mt-1">
                            <div className="h-5 w-5 rounded-full bg-leafy-500 border-4 border-white"></div>
                          </div>
                          <div className="font-medium text-leafy-800 mb-3">{day.date}</div>
                          
                          {day.events.map((event, eventIndex) => (
                            <div key={eventIndex} className="ml-6 mb-4 last:mb-0">
                              <div className="absolute left-0 ml-[-8px] mt-2">
                                <div className="h-2 w-2 rounded-full bg-leafy-200"></div>
                              </div>
                              <div className="flex justify-between">
                                <div>
                                  <p className="text-leafy-800 font-medium">{event.title}</p>
                                  <p className="text-sm text-leafy-600">{event.desc}</p>
                                  <p className="text-xs text-leafy-500">{event.time}</p>
                                </div>
                                {event.points && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-medium text-leafy-700">+{event.points}</span>
                                    <Leaf className="h-4 w-4 text-leafy-500" />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="animate-grow origin-top">
              <ProfileForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
