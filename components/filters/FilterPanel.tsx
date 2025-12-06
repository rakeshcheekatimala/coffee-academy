'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  ChevronUp,
  RotateCcw
} from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  multiple?: boolean;
}

interface FilterPanelProps {
  groups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, values: string[]) => void;
  onClearAll: () => void;
  variant?: 'sidebar' | 'dropdown' | 'inline';
}

export function FilterPanel({
  groups,
  activeFilters,
  onFilterChange,
  onClearAll,
  variant = 'sidebar',
}: FilterPanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(groups.map((g) => g.id))
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const handleOptionClick = (groupId: string, value: string, multiple: boolean) => {
    const currentValues = activeFilters[groupId] || [];
    
    if (multiple) {
      if (currentValues.includes(value)) {
        onFilterChange(groupId, currentValues.filter((v) => v !== value));
      } else {
        onFilterChange(groupId, [...currentValues, value]);
      }
    } else {
      if (currentValues.includes(value)) {
        onFilterChange(groupId, []);
      } else {
        onFilterChange(groupId, [value]);
      }
    }
  };

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  const filterContent = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {totalActiveFilters > 0 && (
            <Badge className="bg-amber-100 text-amber-800">
              {totalActiveFilters}
            </Badge>
          )}
        </h3>
        {totalActiveFilters > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-amber-600"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Filter groups */}
      {groups.map((group) => {
        const isExpanded = expandedGroups.has(group.id);
        const activeCount = (activeFilters[group.id] || []).length;

        return (
          <div key={group.id}>
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center justify-between py-2 text-left font-medium hover:text-amber-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                {group.label}
                {activeCount > 0 && (
                  <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                    {activeCount}
                  </Badge>
                )}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="py-2 space-y-1">
                    {group.options.map((option) => {
                      const isActive = (activeFilters[group.id] || []).includes(option.value);

                      return (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleOptionClick(group.id, option.value, group.multiple ?? true)
                          }
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-amber-100 text-amber-800 font-medium'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <span>{option.label}</span>
                          {option.count !== undefined && (
                            <span className="text-xs text-muted-foreground">
                              ({option.count})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Separator className="mt-2" />
          </div>
        );
      })}
    </div>
  );

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {totalActiveFilters > 0 && (
            <Badge className="bg-amber-100 text-amber-800 ml-1">
              {totalActiveFilters}
            </Badge>
          )}
        </Button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 right-0 z-50 w-72 bg-white rounded-lg shadow-lg border p-4"
              >
                {filterContent}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {groups.map((group) => (
          <div key={group.id} className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">{group.label}:</span>
            <div className="flex gap-1">
              {group.options.map((option) => {
                const isActive = (activeFilters[group.id] || []).includes(option.value);

                return (
                  <Button
                    key={option.value}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() =>
                      handleOptionClick(group.id, option.value, group.multiple ?? true)
                    }
                    className={isActive ? 'bg-amber-600 hover:bg-amber-500' : ''}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
        {totalActiveFilters > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
    );
  }

  // Sidebar variant (default)
  return (
    <Card className="sticky top-4">
      <CardContent className="pt-6">{filterContent}</CardContent>
    </Card>
  );
}

// Active filter chips display
interface ActiveFilterChipsProps {
  groups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onRemove: (groupId: string, value: string) => void;
  onClearAll: () => void;
}

export function ActiveFilterChips({
  groups,
  activeFilters,
  onRemove,
  onClearAll,
}: ActiveFilterChipsProps) {
  const chips: { groupId: string; groupLabel: string; value: string; label: string }[] = [];

  groups.forEach((group) => {
    const values = activeFilters[group.id] || [];
    values.forEach((value) => {
      const option = group.options.find((o) => o.value === value);
      if (option) {
        chips.push({
          groupId: group.id,
          groupLabel: group.label,
          value,
          label: option.label,
        });
      }
    });
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {chips.map((chip) => (
        <Badge
          key={`${chip.groupId}-${chip.value}`}
          variant="secondary"
          className="gap-1 pr-1"
        >
          <span className="text-xs text-muted-foreground">{chip.groupLabel}:</span>
          {chip.label}
          <button
            onClick={() => onRemove(chip.groupId, chip.value)}
            className="ml-1 hover:bg-muted rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs">
        Clear all
      </Button>
    </div>
  );
}

