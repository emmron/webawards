'use client'

import { useState, useEffect } from 'react'
import { AwardWinner } from '@/data/awardsWinners'

interface CategoryFilterProps {
  categories: string[]
  onFilterChange: (category: string) => void
  awardWinners?: AwardWinner[]
}

export default function CategoryFilter({ categories, onFilterChange, awardWinners = [] }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [showAll, setShowAll] = useState(false)
  const [displayCategories, setDisplayCategories] = useState<string[]>([])

  // Calculate category counts
  useEffect(() => {
    const counts: Record<string, number> = { all: awardWinners.length };
    categories.forEach(category => {
      counts[category] = awardWinners.filter(winner => winner.category === category).length;
    });
    setCategoryCounts(counts);

    // Show only top 10 categories initially
    const sorted = [...categories].sort((a, b) =>
      (counts[b] || 0) - (counts[a] || 0)
    );
    setDisplayCategories(sorted.slice(0, 10));
  }, [categories, awardWinners]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onFilterChange(category)
  }

  return (
    <div className="py-4 mb-2">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filter by Category:</h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          {showAll ? 'Show Less' : `Show All (${categories.length})`}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`group px-3 py-2 rounded-lg text-sm font-medium transition flex items-center ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white dark:bg-blue-700 shadow-md'
              : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <span>All Categories</span>
          <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
            selectedCategory === 'all'
              ? 'bg-white text-blue-700 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-100'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {categoryCounts.all || 0}
          </span>
        </button>

        {(showAll ? categories : displayCategories).map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`group px-3 py-2 rounded-lg text-sm font-medium transition flex items-center ${
              selectedCategory === category
                ? 'bg-blue-600 text-white dark:bg-blue-700 shadow-md'
                : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <span>{category}</span>
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
              selectedCategory === category
                ? 'bg-white text-blue-700 dark:bg-blue-200 dark:text-blue-800 group-hover:bg-blue-100'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {categoryCounts[category] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}