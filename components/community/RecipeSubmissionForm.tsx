'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, X, Coffee, Upload, ChevronRight, ChevronLeft } from 'lucide-react';
import { GrindSize } from '@/lib/types';

interface RecipeSubmissionFormProps {
  onSubmit: (data: RecipeFormData) => void;
  onCancel: () => void;
}

export interface RecipeFormData {
  title: string;
  description: string;
  category: 'hot' | 'cold';
  difficulty: 'easy' | 'medium' | 'hard';
  time: string;
  servings: number;
  coffeeAmount: string;
  waterAmount: string;
  waterTemp: string;
  grindSize: GrindSize;
  ingredients: Array<{ name: string; amount: string; unit: string }>;
  tools: string[];
  steps: Array<{ instruction: string; duration?: string; temperature?: string }>;
  tips: string[];
  tasteNotes: string;
}

const grindSizes: GrindSize[] = [
  'extra-fine',
  'fine',
  'medium-fine',
  'medium',
  'medium-coarse',
  'coarse',
  'extra-coarse',
];

export function RecipeSubmissionForm({ onSubmit, onCancel }: RecipeSubmissionFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    category: 'hot',
    difficulty: 'easy',
    time: '',
    servings: 1,
    coffeeAmount: '',
    waterAmount: '',
    waterTemp: '',
    grindSize: 'medium',
    ingredients: [{ name: '', amount: '', unit: 'g' }],
    tools: [''],
    steps: [{ instruction: '' }],
    tips: [''],
    tasteNotes: '',
  });

  const updateField = <K extends keyof RecipeFormData>(field: K, value: RecipeFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    updateField('ingredients', [...formData.ingredients, { name: '', amount: '', unit: 'g' }]);
  };

  const removeIngredient = (index: number) => {
    updateField(
      'ingredients',
      formData.ingredients.filter((_, i) => i !== index)
    );
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const updated = [...formData.ingredients];
    updated[index] = { ...updated[index], [field]: value };
    updateField('ingredients', updated);
  };

  const addTool = () => {
    updateField('tools', [...formData.tools, '']);
  };

  const removeTool = (index: number) => {
    updateField(
      'tools',
      formData.tools.filter((_, i) => i !== index)
    );
  };

  const updateTool = (index: number, value: string) => {
    const updated = [...formData.tools];
    updated[index] = value;
    updateField('tools', updated);
  };

  const addStep = () => {
    updateField('steps', [...formData.steps, { instruction: '' }]);
  };

  const removeStep = (index: number) => {
    updateField(
      'steps',
      formData.steps.filter((_, i) => i !== index)
    );
  };

  const updateStep = (index: number, field: string, value: string) => {
    const updated = [...formData.steps];
    updated[index] = { ...updated[index], [field]: value };
    updateField('steps', updated);
  };

  const addTip = () => {
    updateField('tips', [...formData.tips, '']);
  };

  const removeTip = (index: number) => {
    updateField(
      'tips',
      formData.tips.filter((_, i) => i !== index)
    );
  };

  const updateTip = (index: number, value: string) => {
    const updated = [...formData.tips];
    updated[index] = value;
    updateField('tips', updated);
  };

  const handleSubmit = () => {
    // Clean up empty entries
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter((i) => i.name.trim()),
      tools: formData.tools.filter((t) => t.trim()),
      steps: formData.steps.filter((s) => s.instruction.trim()),
      tips: formData.tips.filter((t) => t.trim()),
    };
    onSubmit(cleanedData);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.title.trim() && formData.description.trim();
      case 2:
        return (
          formData.coffeeAmount.trim() &&
          formData.waterAmount.trim() &&
          formData.ingredients.some((i) => i.name.trim())
        );
      case 3:
        return formData.steps.some((s) => s.instruction.trim());
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Coffee className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <CardTitle>Share Your Recipe</CardTitle>
            <CardDescription>Step {step} of {totalSteps}</CardDescription>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </CardHeader>

      <CardContent>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Morning Pour-Over Perfection"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  placeholder="Describe your recipe and what makes it special..."
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v: 'hot' | 'cold') => updateField('category', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(v: 'easy' | 'medium' | 'hard') => updateField('difficulty', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Total Time</Label>
                  <Input
                    id="time"
                    placeholder="e.g., 5 minutes"
                    value={formData.time}
                    onChange={(e) => updateField('time', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    min={1}
                    value={formData.servings}
                    onChange={(e) => updateField('servings', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Ingredients & Equipment */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coffee">Coffee Amount *</Label>
                  <Input
                    id="coffee"
                    placeholder="e.g., 20g"
                    value={formData.coffeeAmount}
                    onChange={(e) => updateField('coffeeAmount', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="water">Water Amount *</Label>
                  <Input
                    id="water"
                    placeholder="e.g., 300ml"
                    value={formData.waterAmount}
                    onChange={(e) => updateField('waterAmount', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temp">Water Temp</Label>
                  <Input
                    id="temp"
                    placeholder="e.g., 200°F"
                    value={formData.waterTemp}
                    onChange={(e) => updateField('waterTemp', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Grind Size</Label>
                <Select
                  value={formData.grindSize}
                  onValueChange={(v: GrindSize) => updateField('grindSize', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {grindSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size.charAt(0).toUpperCase() + size.slice(1).replace('-', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Additional Ingredients</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addIngredient}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      placeholder="Ingredient"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Amount"
                      value={ingredient.amount}
                      onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                      className="w-20"
                    />
                    <Input
                      placeholder="Unit"
                      value={ingredient.unit}
                      onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                      className="w-16"
                    />
                    {formData.ingredients.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Equipment Needed</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addTool}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                {formData.tools.map((tool, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="e.g., V60 dripper"
                      value={tool}
                      onChange={(e) => updateTool(index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.tools.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTool(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Steps */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Brewing Steps *</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addStep}>
                    <Plus className="w-4 h-4 mr-1" /> Add Step
                  </Button>
                </div>
                {formData.steps.map((recipeStep, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-amber-100 text-amber-800 mt-1">{index + 1}</Badge>
                      <div className="flex-1 space-y-3">
                        <textarea
                          placeholder="Describe this step..."
                          value={recipeStep.instruction}
                          onChange={(e) => updateStep(index, 'instruction', e.target.value)}
                          className="w-full min-h-[80px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Duration (optional)"
                            value={recipeStep.duration || ''}
                            onChange={(e) => updateStep(index, 'duration', e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder="Temperature (optional)"
                            value={recipeStep.temperature || ''}
                            onChange={(e) => updateStep(index, 'temperature', e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      {formData.steps.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStep(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Tips & Finish */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Pro Tips (optional)</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addTip}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                {formData.tips.map((tip, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Share a helpful tip..."
                      value={tip}
                      onChange={(e) => updateTip(index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.tips.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTip(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Tasting Notes</Label>
                <Input
                  id="notes"
                  placeholder="e.g., Bright, fruity, with a smooth finish"
                  value={formData.tasteNotes}
                  onChange={(e) => updateField('tasteNotes', e.target.value)}
                />
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-800 mb-2">Add Photos (Coming Soon)</h4>
                <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 mx-auto text-amber-400 mb-2" />
                  <p className="text-sm text-amber-600">
                    Photo upload will be available in a future update
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-4 border-t">
          <div>
            {step > 1 && (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            {step < totalSteps ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="bg-amber-600 hover:bg-amber-500"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="bg-amber-600 hover:bg-amber-500"
              >
                Submit Recipe
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

