'use client'

import { useState, useEffect } from 'react'
import { AwardWinner } from '@/data/awardsWinners'
import CategoryFilter from './CategoryFilter'
import { motion, AnimatePresence } from 'framer-motion'

interface AwardsClientProps {
  years: number[]
  categories: string[]
  awardWinners: AwardWinner[]
}

export default function AwardsClient({ years, categories, awardWinners }: AwardsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<AwardWinner[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    // Reset search when changing category
    setSearchQuery('')
    setIsSearching(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === '') {
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Simple search through all relevant fields
    const filtered = awardWinners.filter(winner => {
      const lowerQuery = query.toLowerCase()
      return (
        winner.company.toLowerCase().includes(lowerQuery) ||
        (winner.agency?.toLowerCase().includes(lowerQuery)) ||
        winner.project.toLowerCase().includes(lowerQuery) ||
        winner.category.toLowerCase().includes(lowerQuery) ||
        (winner.description?.toLowerCase().includes(lowerQuery))
      )
    })

    setSearchResults(filtered)
  }

  // Determine which winners to display based on filters
  const filteredWinners = isSearching
    ? searchResults
    : (selectedCategory === 'all'
        ? awardWinners
        : awardWinners.filter(winner => winner.category === selectedCategory))

  const filteredYears = [...new Set(filteredWinners.map(winner => winner.year))].sort((a, b) => b - a)

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-all">
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-2/3">
            <CategoryFilter
              categories={categories}
              onFilterChange={handleCategoryChange}
              awardWinners={awardWinners}
            />
          </div>
          <div className="w-full md:w-1/3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects, companies..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setIsSearching(false)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-full p-1"
                  aria-label="Clear search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedCategory !== 'all' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-lg shadow border border-blue-200 dark:border-blue-800 flex items-center"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">
                  Showing awards in the &quot;{selectedCategory}&quot; category.
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  {filteredWinners.length} entries found across {filteredYears.length} years.
                </p>
              </div>
            </motion.div>
          )}

          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200 rounded-lg shadow border border-green-200 dark:border-green-800 flex items-center"
            >
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">
                  Search results for &quot;{searchQuery}&quot;
                </p>
                <p className="text-sm text-green-600 dark:text-green-300">
                  {searchResults.length} entries found across {filteredYears.length} years.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filteredWinners.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-10 text-center"
        >
          <div className="inline-block p-8 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md">
            <div className="mb-4 bg-gray-200 dark:bg-gray-700 p-4 rounded-full inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No results found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setIsSearching(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Reset filters
            </button>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          {/* Winners by Year */}
          {filteredYears.map(year => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="py-10"
              id={`year-${year}`}
            >
              <div className="mb-8 relative">
                <div className="absolute w-full h-0.5 bg-gray-200 dark:bg-gray-700 top-1/2 transform -translate-y-1/2 z-0"></div>
                <div className="flex items-center relative z-10">
                  <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 text-white shadow-lg mr-4 transform hover:scale-105 transition-transform duration-300">
                    <span className="text-3xl font-bold">{year}</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                      {year} {selectedCategory !== 'all' && !isSearching ? `${selectedCategory} ` : ''}Winners
                      {isSearching && <span className="ml-2 text-lg font-medium text-gray-500 dark:text-gray-400">
                        ({filteredWinners.filter(w => w.year === year).length})
                      </span>}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{filteredWinners.filter(w => w.year === year).length} entries</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-900 p-1">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          Rank
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center">
                          {selectedCategory === 'all' && !isSearching ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              Category
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              Company
                            </>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center">
                          {selectedCategory === 'all' && !isSearching ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              Company
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Agency
                            </>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        <div className="flex items-center">
                          {selectedCategory === 'all' && !isSearching ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Agency
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Project
                            </>
                          )}
                        </div>
                      </th>
                      {(selectedCategory === 'all' && !isSearching) && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Project
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWinners
                      .filter(winner => winner.year === year)
                      .sort((a, b) =>
                        selectedCategory === 'all' && !isSearching
                          ? a.category.localeCompare(b.category) || a.rank - b.rank
                          : a.rank - b.rank
                      )
                      .map((winner, index) => (
                        <motion.tr
                          key={`${winner.category}-${winner.project}-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors cursor-pointer group border-l-4 ${
                            winner.rank === 1
                              ? 'border-yellow-500 dark:border-yellow-700'
                              : winner.rank === 2
                                ? 'border-gray-400 dark:border-gray-600'
                                : winner.rank === 3
                                  ? 'border-amber-600 dark:border-amber-800'
                                  : 'border-transparent'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {winner.rank === 1 ? (
                              <span className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-white dark:from-yellow-600 dark:to-yellow-800 border-2 border-yellow-300 dark:border-yellow-600 shadow-md group-hover:shadow-lg group-hover:scale-105 transform transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                1st Place
                              </span>
                            ) : winner.rank === 2 ? (
                              <span className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r from-gray-300 to-gray-500 text-white dark:from-gray-600 dark:to-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-md group-hover:shadow-lg group-hover:scale-105 transform transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                2nd Place
                              </span>
                            ) : winner.rank === 3 ? (
                              <span className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white dark:from-amber-600 dark:to-amber-800 border-2 border-amber-300 dark:border-amber-600 shadow-md group-hover:shadow-lg group-hover:scale-105 transform transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                3rd Place
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Finalist
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {selectedCategory === 'all' && !isSearching ? (
                              <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-lg shadow-sm group-hover:bg-blue-100 dark:group-hover:bg-blue-800 transition-colors duration-200">
                                {winner.category}
                              </span>
                            ) : (
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{winner.company}</div>
                                {winner.rank <= 3 && (
                                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Winner of {winner.category}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {selectedCategory === 'all' && !isSearching ? (
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{winner.company}</div>
                              </div>
                            ) : (
                              <div>
                                {winner.agency ? (
                                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{winner.agency}</div>
                                ) : (
                                  <div className="text-gray-400 dark:text-gray-600 italic">No agency listed</div>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {selectedCategory === 'all' && !isSearching ? (
                              winner.agency ? (
                                <div className="font-medium text-gray-800 dark:text-gray-200">{winner.agency}</div>
                              ) : (
                                <div className="text-gray-400 dark:text-gray-600 italic">No agency listed</div>
                              )
                            ) : (
                              <div className="space-y-2">
                                {winner.url ? (
                                  <a
                                    href={winner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center group-hover:underline"
                                  >
                                    {winner.project}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                                ) : (
                                  <span className="font-medium text-gray-800 dark:text-gray-200">{winner.project}</span>
                                )}
                                {winner.description && (
                                  <div className="relative">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md pr-5 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                                      {winner.description.length > 120 ?
                                        `${winner.description.substring(0, 120)}...` :
                                        winner.description}
                                    </p>
                                    {winner.description.length > 120 && (
                                      <span className="absolute right-0 top-0 text-blue-500 dark:text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                          {(selectedCategory === 'all' && !isSearching) && (
                            <td className="px-6 py-4">
                              <div className="space-y-2">
                                {winner.url ? (
                                  <a
                                    href={winner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center group-hover:underline"
                                  >
                                    {winner.project}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                                ) : (
                                  <span className="font-medium text-gray-800 dark:text-gray-200">{winner.project}</span>
                                )}
                                {winner.description && (
                                  <div className="relative">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md pr-5 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                                      {winner.description.length > 120 ?
                                        `${winner.description.substring(0, 120)}...` :
                                        winner.description}
                                    </p>
                                    {winner.description.length > 120 && (
                                      <span className="absolute right-0 top-0 text-blue-500 dark:text-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                          )}
                        </motion.tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {/* Back to top button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </>
  )
}