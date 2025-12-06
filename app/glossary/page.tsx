'use client';

import { useState, useMemo } from 'react';
import { Hero } from '@/components/shared/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllGlossaryTerms, getGlossaryCategories } from '@/lib/content/glossary';
import { motion } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';

export default function GlossaryPage() {
  const allTerms = getAllGlossaryTerms();
  const categories = getGlossaryCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTerms = useMemo(() => {
    return allTerms.filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, allTerms]);

  return (
    <div className="min-h-screen">
      <Hero
        title="Coffee Glossary"
        description="Learn the language of coffee. Search and explore coffee terms, definitions, and examples."
      />

      <div className="container mx-auto px-4 py-16">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Found {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
        </div>

        {/* Terms Grid */}
        {filteredTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTerms.map((term, index) => (
              <motion.div
                key={term.term}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full hover-glow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl">{term.term}</CardTitle>
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {term.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-base">
                      {term.definition}
                    </CardDescription>
                    {term.example && (
                      <div className="pt-3 border-t">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Example: </span>
                          {term.example}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                No terms found. Try adjusting your search or filter.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

