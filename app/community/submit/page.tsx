'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecipeSubmissionForm, RecipeFormData } from '@/components/community/RecipeSubmissionForm';
import { addUserBrew, addUserRecipe, getCurrentUser, setCurrentUser } from '@/lib/content/userContent';
import { motion } from 'framer-motion';
import { Camera, BookOpen, User, Check, X, Plus } from 'lucide-react';
import { trackBrewSubmission, trackRecipeSubmission } from '@/lib/utils/analytics';

function SubmitPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get('type') || 'brew';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentUser, setCurrentUserState] = useState(getCurrentUser());
  const [showUserForm, setShowUserForm] = useState(!currentUser);
  const [submitted, setSubmitted] = useState(false);
  
  // Brew form state
  const [brewForm, setBrewForm] = useState({
    title: '',
    description: '',
    recipeId: '',
    equipmentUsed: [''],
    tasteNotes: [''],
    rating: 5,
  });

  // User form state
  const [userForm, setUserForm] = useState({
    username: '',
    displayName: '',
    bio: '',
  });

  const handleCreateUser = () => {
    if (userForm.username && userForm.displayName) {
      const user = setCurrentUser({
        username: userForm.username,
        displayName: userForm.displayName,
        bio: userForm.bio,
      });
      setCurrentUserState(user);
      setShowUserForm(false);
    }
  };

  const handleBrewSubmit = () => {
    if (!currentUser) return;
    
    const cleanedEquipment = brewForm.equipmentUsed.filter(e => e.trim());
    const cleanedNotes = brewForm.tasteNotes.filter(n => n.trim());
    
    addUserBrew({
      userId: currentUser.id,
      userName: currentUser.displayName,
      userAvatar: currentUser.avatar,
      title: brewForm.title,
      description: brewForm.description,
      photos: [],
      recipeId: brewForm.recipeId || undefined,
      equipmentUsed: cleanedEquipment,
      tasteNotes: cleanedNotes,
      rating: brewForm.rating,
    });
    
    trackBrewSubmission(brewForm.recipeId || undefined);
    setSubmitted(true);
    setTimeout(() => router.push('/community/brews'), 2000);
  };

  const handleRecipeSubmit = (data: RecipeFormData) => {
    if (!currentUser) return;
    
    addUserRecipe({
      userId: currentUser.id,
      userName: currentUser.displayName,
      userAvatar: currentUser.avatar,
      title: data.title,
      description: data.description,
      category: data.category,
      difficulty: data.difficulty,
      time: data.time,
      servings: data.servings,
      coffeeAmount: data.coffeeAmount,
      waterAmount: data.waterAmount,
      waterTemp: data.waterTemp,
      brewTime: data.time,
      grindSize: data.grindSize,
      ingredients: data.ingredients,
      tools: data.tools,
      steps: data.steps.map((s, i) => ({
        step: i + 1,
        instruction: s.instruction,
        duration: s.duration,
        temperature: s.temperature,
      })),
      tips: data.tips,
      photos: [],
      tasteNotes: data.tasteNotes,
    });
    
    trackRecipeSubmission(data.category, data.difficulty);
    setSubmitted(true);
    setTimeout(() => router.push('/community/recipes'), 2000);
  };

  const updateBrewField = (field: string, value: string | number | string[]) => {
    setBrewForm(prev => ({ ...prev, [field]: value }));
  };

  const addBrewEquipment = () => {
    updateBrewField('equipmentUsed', [...brewForm.equipmentUsed, '']);
  };

  const removeBrewEquipment = (index: number) => {
    updateBrewField('equipmentUsed', brewForm.equipmentUsed.filter((_, i) => i !== index));
  };

  const updateBrewEquipment = (index: number, value: string) => {
    const updated = [...brewForm.equipmentUsed];
    updated[index] = value;
    updateBrewField('equipmentUsed', updated);
  };

  const addTasteNote = () => {
    updateBrewField('tasteNotes', [...brewForm.tasteNotes, '']);
  };

  const removeTasteNote = (index: number) => {
    updateBrewField('tasteNotes', brewForm.tasteNotes.filter((_, i) => i !== index));
  };

  const updateTasteNote = (index: number, value: string) => {
    const updated = [...brewForm.tasteNotes];
    updated[index] = value;
    updateBrewField('tasteNotes', updated);
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Hero title="Thank You!" description="Your submission has been received." />
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-coffee-dark mb-2">Successfully Submitted!</h2>
            <p className="text-coffee-medium/70 mb-4">
              {activeTab === 'brew'
                ? 'Your brew has been shared with the community.'
                : 'Your recipe is now available for others to try.'}
            </p>
            <p className="text-sm text-muted-foreground">Redirecting you back to the gallery...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showUserForm) {
    return (
      <div className="min-h-screen">
        <Hero
          title="Create Your Profile"
          description="Set up a quick profile to share your brews and recipes."
        />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-amber-600" />
              </div>
              <CardTitle>Welcome to the Community!</CardTitle>
              <CardDescription>
                Create a profile to start sharing your coffee journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  placeholder="e.g., coffeelover42"
                  value={userForm.username}
                  onChange={(e) => setUserForm(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name *</Label>
                <Input
                  id="displayName"
                  placeholder="e.g., Sarah Chen"
                  value={userForm.displayName}
                  onChange={(e) => setUserForm(prev => ({ ...prev, displayName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio (optional)</Label>
                <textarea
                  id="bio"
                  placeholder="Tell us about your coffee journey..."
                  value={userForm.bio}
                  onChange={(e) => setUserForm(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full min-h-[80px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <Button
                onClick={handleCreateUser}
                disabled={!userForm.username || !userForm.displayName}
                className="w-full bg-amber-600 hover:bg-amber-500"
              >
                Create Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero
        title="Share with the Community"
        description="Share your brews, recipes, and coffee experiences."
      />

      <div className="container mx-auto px-4 py-16">
        {/* User info */}
        {currentUser && (
          <div className="flex items-center gap-3 mb-8 p-4 bg-amber-50 rounded-lg max-w-2xl mx-auto">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-semibold">
              {currentUser.displayName.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{currentUser.displayName}</p>
              <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
            </div>
            <Badge variant="outline">Posting as</Badge>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-2xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="brew" className="gap-2">
              <Camera className="w-4 h-4" />
              Share a Brew
            </TabsTrigger>
            <TabsTrigger value="recipe" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Submit Recipe
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brew">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Brew</CardTitle>
                <CardDescription>
                  Tell us about your latest coffee experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="brew-title">Title *</Label>
                  <Input
                    id="brew-title"
                    placeholder="e.g., Morning V60 with Ethiopian beans"
                    value={brewForm.title}
                    onChange={(e) => updateBrewField('title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brew-description">Description *</Label>
                  <textarea
                    id="brew-description"
                    placeholder="Describe your brew, the process, and how it turned out..."
                    value={brewForm.description}
                    onChange={(e) => updateBrewField('description', e.target.value)}
                    className="w-full min-h-[120px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipe-link">Based on Recipe (optional)</Label>
                  <Input
                    id="recipe-link"
                    placeholder="e.g., v60-pour-over"
                    value={brewForm.recipeId}
                    onChange={(e) => updateBrewField('recipeId', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Link to an existing recipe if applicable
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Equipment Used</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={addBrewEquipment}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  {brewForm.equipmentUsed.map((equipment, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., V60, Gooseneck kettle"
                        value={equipment}
                        onChange={(e) => updateBrewEquipment(index, e.target.value)}
                      />
                      {brewForm.equipmentUsed.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBrewEquipment(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Tasting Notes</Label>
                    <Button type="button" variant="ghost" size="sm" onClick={addTasteNote}>
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                  {brewForm.tasteNotes.map((note, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., Fruity, Chocolate, Smooth"
                        value={note}
                        onChange={(e) => updateTasteNote(index, e.target.value)}
                      />
                      {brewForm.tasteNotes.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTasteNote(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Your Rating</Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateBrewField('rating', star)}
                        className="text-2xl transition-colors"
                      >
                        {star <= brewForm.rating ? '★' : '☆'}
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {brewForm.rating}/5
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push('/community')}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-amber-600 hover:bg-amber-500"
                    disabled={!brewForm.title || !brewForm.description}
                    onClick={handleBrewSubmit}
                  >
                    Share Brew
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipe">
            <RecipeSubmissionForm
              onSubmit={handleRecipeSubmit}
              onCancel={() => router.push('/community')}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function SubmitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SubmitPageContent />
    </Suspense>
  );
}

