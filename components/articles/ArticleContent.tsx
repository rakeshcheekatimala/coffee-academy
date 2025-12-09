'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, User, ArrowLeft, BookOpen, Tag } from 'lucide-react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { ArticleCard } from './ArticleCard';
import { trackArticleView, trackCTAClick } from '@/lib/utils/analytics';
import { useEffect } from 'react';

interface ArticleContentProps {
  article: Article;
  relatedArticles?: Article[];
}

const categoryColors: Record<Article['category'], string> = {
  basics: 'bg-emerald-100 text-emerald-800',
  brewing: 'bg-blue-100 text-blue-800',
  roasting: 'bg-orange-100 text-orange-800',
  equipment: 'bg-purple-100 text-purple-800',
  culture: 'bg-pink-100 text-pink-800',
  science: 'bg-cyan-100 text-cyan-800',
};

const categoryLabels: Record<Article['category'], string> = {
  basics: 'Coffee Basics',
  brewing: 'Brewing',
  roasting: 'Roasting',
  equipment: 'Equipment',
  culture: 'Culture',
  science: 'Science',
};

// Simple markdown-like parser for rendering content
function parseContent(content: string): React.ReactNode {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      const ListTag = listType === 'ol' ? 'ol' : 'ul';
      elements.push(
        <ListTag key={elements.length} className={listType === 'ol' ? 'list-decimal list-inside space-y-2 my-4' : 'list-disc list-inside space-y-2 my-4'}>
          {currentList.map((item, i) => (
            <li key={i} className="text-coffee-medium/80">{parseInlineMarkdown(item)}</li>
          ))}
        </ListTag>
      );
      currentList = [];
      listType = null;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={elements.length} className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-amber-200">
                {tableHeaders.map((header, i) => (
                  <th key={i} className="text-left p-3 font-semibold text-coffee-dark bg-amber-50">
                    {header.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className="border-b border-amber-100 hover:bg-amber-50/50">
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 text-coffee-medium/80">
                      {parseInlineMarkdown(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      tableHeaders = [];
      inTable = false;
    }
  };

  const parseInlineMarkdown = (text: string): React.ReactNode => {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Inline code
    text = text.replace(/`(.+?)`/g, '<code class="bg-amber-100 px-1.5 py-0.5 rounded text-sm font-mono text-amber-800">$1</code>');
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) {
      flushList();
      continue;
    }

    // Table detection
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHeaders = trimmedLine.slice(1, -1).split('|').map(h => h.trim());
      } else if (trimmedLine.includes('---')) {
        // Skip separator row
        continue;
      } else {
        tableRows.push(trimmedLine.slice(1, -1).split('|').map(c => c.trim()));
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (trimmedLine.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={elements.length} className="text-3xl font-bold text-coffee-dark mt-8 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          {trimmedLine.slice(2)}
        </h1>
      );
      continue;
    }
    if (trimmedLine.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold text-coffee-dark mt-8 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          {trimmedLine.slice(3)}
        </h2>
      );
      continue;
    }
    if (trimmedLine.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold text-coffee-dark mt-6 mb-2">
          {trimmedLine.slice(4)}
        </h3>
      );
      continue;
    }

    // Unordered list
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(trimmedLine.slice(2));
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmedLine)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(trimmedLine.replace(/^\d+\.\s/, ''));
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={elements.length} className="text-coffee-medium/80 leading-relaxed my-4">
        {parseInlineMarkdown(trimmedLine)}
      </p>
    );
  }

  flushList();
  flushTable();

  return elements;
}

export function ArticleContent({ article, relatedArticles = [] }: ArticleContentProps) {
  useEffect(() => {
    trackArticleView(article.slug, article.title);
  }, [article.slug, article.title]);

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/articles">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </Button>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Badge className={categoryColors[article.category]}>
            {categoryLabels[article.category]}
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime} min read
          </span>
        </div>

        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-dark mb-6 leading-tight"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {article.title}
        </h1>

        <p className="text-xl text-coffee-medium/70 mb-6">{article.excerpt}</p>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {article.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </motion.header>

      <Separator className="my-8" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="prose-coffee"
      >
        {parseContent(article.content)}
      </motion.div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t"
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                Related Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {relatedArticles.map((related, index) => (
                  <ArticleCard key={related.id} article={related} index={index} variant="compact" />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50">
          <CardContent className="py-8">
            <h3 className="text-xl font-bold text-coffee-dark mb-2">
              Ready to put this knowledge to use?
            </h3>
            <p className="text-coffee-medium/70 mb-6">
              Explore our recipes and find your perfect brew.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-amber-600 hover:bg-amber-500">
                <Link 
                  href="/wizard"
                  onClick={() => trackCTAClick('Take the Coffee Quiz', 'article_bottom', '/wizard')}
                >
                  Take the Coffee Quiz
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link 
                  href="/recipes"
                  onClick={() => trackCTAClick('Browse Recipes', 'article_bottom', '/recipes')}
                >
                  Browse Recipes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </article>
  );
}

