import Link from '@/components/Link'
import { awardWinners } from '@/data/awardsWinners'
import AwardsClient from '@/components/AwardsClient'

export default function HomePage() {
  // Get unique years for display - ensure we get ALL years
  const years = [...new Set(awardWinners.map((winner) => winner.year))].sort((a, b) => b - a)

  // Get all categories for filtering
  const categories = [...new Set(awardWinners.map((winner) => winner.category))].sort()

  // Get company stats with years active
  const companyStats = (() => {
    const stats: Record<
      string,
      {
        wins: number
        years: Set<number>
        categories: Set<string>
        firstPlaces: number
      }
    > = {}

    awardWinners.forEach((winner) => {
      if (!stats[winner.company]) {
        stats[winner.company] = {
          wins: 0,
          years: new Set(),
          categories: new Set(),
          firstPlaces: 0,
        }
      }

      stats[winner.company].wins++
      stats[winner.company].years.add(winner.year)
      stats[winner.company].categories.add(winner.category)
      if (winner.rank === 1) stats[winner.company].firstPlaces++
    })

    return Object.entries(stats)
      .map(([company, data]) => ({
        company,
        wins: data.wins,
        yearsActive: Array.from(data.years).sort((a, b) => b - a),
        yearSpan:
          data.years.size > 1
            ? `${Math.min(...data.years)} - ${Math.max(...data.years)}`
            : `${Array.from(data.years)[0]}`,
        categories: Array.from(data.categories),
        firstPlaces: data.firstPlaces,
      }))
      .sort((a, b) => b.wins - a.wins || b.firstPlaces - a.firstPlaces)
      .slice(0, 20)
  })()

  // Get agency stats with years active
  const agencyStats = (() => {
    const stats: Record<
      string,
      {
        wins: number
        years: Set<number>
        categories: Set<string>
        firstPlaces: number
      }
    > = {}

    awardWinners.forEach((winner) => {
      if (!winner.agency) return

      if (!stats[winner.agency]) {
        stats[winner.agency] = {
          wins: 0,
          years: new Set(),
          categories: new Set(),
          firstPlaces: 0,
        }
      }

      stats[winner.agency].wins++
      stats[winner.agency].years.add(winner.year)
      stats[winner.agency].categories.add(winner.category)
      if (winner.rank === 1) stats[winner.agency].firstPlaces++
    })

    return Object.entries(stats)
      .map(([agency, data]) => ({
        agency,
        wins: data.wins,
        yearsActive: Array.from(data.years).sort((a, b) => b - a),
        yearSpan:
          data.years.size > 1
            ? `${Math.min(...data.years)} - ${Math.max(...data.years)}`
            : `${Array.from(data.years)[0]}`,
        categories: Array.from(data.categories),
        firstPlaces: data.firstPlaces,
      }))
      .sort((a, b) => b.wins - a.wins || b.firstPlaces - a.firstPlaces)
      .slice(0, 20)
  })()

  // Get statistics
  const stats = {
    totalWinners: awardWinners.length,
    uniqueCompanies: new Set(awardWinners.map((winner) => winner.company)).size,
    uniqueAgencies: new Set(awardWinners.map((winner) => winner.agency).filter(Boolean)).size,
    yearRange: `${Math.min(...years)} - ${Math.max(...years)}`,
    totalYears: years.length,
  }

  return (
    <div>
      {/* Hero Section with Background Pattern */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-80 dark:from-gray-900 dark:to-blue-900"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>

        <div className="relative space-y-6 px-4 pt-10 pb-12 sm:px-6 md:space-y-8 lg:px-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
              <span className="inline-block transform transition-transform duration-300 hover:scale-105">
                Australian Web Awards
              </span>
            </h1>
            <div className="mx-auto my-4 h-1.5 w-40 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              Celebrating digital excellence in Australian web design since 2005
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <div className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>{years.length} years of excellence</span>
            </div>
            <div className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>{stats.uniqueAgencies} agencies</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats mb-10">
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-5 shadow-md transition-transform hover:scale-105 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
            <div className="mb-2 flex items-center">
              <div className="mr-3 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 dark:text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Winners
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.totalWinners}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Entries across all years
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-5 shadow-md transition-transform hover:scale-105 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
            <div className="mb-2 flex items-center">
              <div className="mr-3 rounded-full bg-green-100 p-2 dark:bg-green-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600 dark:text-green-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Unique Companies
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.uniqueCompanies}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Organizations recognized
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-5 shadow-md transition-transform hover:scale-105 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
            <div className="mb-2 flex items-center">
              <div className="mr-3 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600 dark:text-purple-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Unique Agencies
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.uniqueAgencies}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Design agencies represented
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-5 shadow-md transition-transform hover:scale-105 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
            <div className="mb-2 flex items-center">
              <div className="mr-3 rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-600 dark:text-amber-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Years Covered
              </h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.yearRange}</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {stats.totalYears} years of excellence
            </p>
          </div>
        </div>

        {/* Year Navigation */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 py-4 shadow-md dark:border-gray-700 dark:bg-gray-900">
          <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-gray-100">Jump to Year:</h3>
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <a
                key={year}
                href={`#year-${year}`}
                className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 shadow transition hover:bg-blue-200 hover:shadow-md dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
              >
                {year}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboards Section */}
      <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
        {/* Top Companies */}
        <div className="transform rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-6 flex items-center">
            <div className="mr-3 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 dark:text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Top Winning Companies
            </h2>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      Total Awards
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      1st Places
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      Years Active
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {companyStats.map(({ company, wins, firstPlaces, yearSpan }, index) => (
                    <tr
                      key={company}
                      className={`${
                        index % 2 === 0
                          ? 'bg-white dark:bg-gray-800'
                          : 'bg-blue-50/30 dark:bg-blue-900/10'
                      } group transition-colors duration-150 hover:bg-blue-100 dark:hover:bg-blue-800/30`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index < 3 ? (
                          <span
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                              index === 0
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 ring-4 ring-yellow-200 dark:ring-yellow-800/50'
                                : index === 1
                                  ? 'bg-gradient-to-r from-gray-300 to-gray-500 ring-4 ring-gray-200 dark:ring-gray-700/50'
                                  : 'bg-gradient-to-r from-amber-500 to-amber-700 ring-4 ring-amber-200 dark:ring-amber-800/50'
                            } transform shadow-md transition-transform duration-200 group-hover:scale-110`}
                          >
                            {index === 0 ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                  />
                                </svg>
                              </span>
                            ) : (
                              index + 1
                            )}
                          </span>
                        ) : (
                          <span className="pl-4 font-medium text-gray-900 dark:text-white">
                            #{index + 1}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900 transition-colors duration-150 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                          {company}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {wins} awards across {yearSpan}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded-full bg-green-100 px-3 py-2 text-sm font-semibold text-green-800 shadow-sm transition-all duration-150 group-hover:bg-green-200 group-hover:shadow dark:bg-green-800/70 dark:text-green-100 dark:group-hover:bg-green-700">
                          {wins}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-800 shadow-sm transition-all duration-150 group-hover:bg-yellow-200 group-hover:shadow dark:bg-yellow-800/70 dark:text-yellow-100 dark:group-hover:bg-yellow-700">
                          <div className="relative">
                            <span className="absolute -top-1 -right-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-yellow-600 dark:text-yellow-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            </span>
                            {firstPlaces}
                          </div>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition-colors duration-150 group-hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300 dark:group-hover:bg-indigo-800/50">
                          {yearSpan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Agencies */}
        <div className="transform rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-6 flex items-center">
            <div className="mr-3 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Top Agencies
            </h2>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/40">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      Agency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      Total Awards
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      1st Places
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                      Years Active
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {agencyStats.map(({ agency, wins, firstPlaces, yearSpan }, index) => (
                    <tr
                      key={agency}
                      className={`${
                        index % 2 === 0
                          ? 'bg-white dark:bg-gray-800'
                          : 'bg-purple-50/30 dark:bg-purple-900/10'
                      } group transition-colors duration-150 hover:bg-purple-100 dark:hover:bg-purple-800/30`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index < 3 ? (
                          <span
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                              index === 0
                                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 ring-4 ring-yellow-200 dark:ring-yellow-800/50'
                                : index === 1
                                  ? 'bg-gradient-to-r from-gray-300 to-gray-500 ring-4 ring-gray-200 dark:ring-gray-700/50'
                                  : 'bg-gradient-to-r from-amber-500 to-amber-700 ring-4 ring-amber-200 dark:ring-amber-800/50'
                            } transform shadow-md transition-transform duration-200 group-hover:scale-110`}
                          >
                            {index === 0 ? (
                              <span className="flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                  />
                                </svg>
                              </span>
                            ) : (
                              index + 1
                            )}
                          </span>
                        ) : (
                          <span className="pl-4 font-medium text-gray-900 dark:text-white">
                            #{index + 1}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900 transition-colors duration-150 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300">
                          {agency}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {wins} awards across {yearSpan}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-800 shadow-sm transition-all duration-150 group-hover:bg-blue-200 group-hover:shadow dark:bg-blue-800/70 dark:text-blue-100 dark:group-hover:bg-blue-700">
                          {wins}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-800 shadow-sm transition-all duration-150 group-hover:bg-yellow-200 group-hover:shadow dark:bg-yellow-800/70 dark:text-yellow-100 dark:group-hover:bg-yellow-700">
                          <div className="relative">
                            <span className="absolute -top-1 -right-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-yellow-600 dark:text-yellow-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            </span>
                            {firstPlaces}
                          </div>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition-colors duration-150 group-hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300 dark:group-hover:bg-indigo-800/50">
                          {yearSpan}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Awards List with Category Filter */}
      <div className="awards-section py-8">
        <div className="mb-6 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg dark:border-gray-700 dark:from-gray-900 dark:to-blue-900">
          <div className="mb-4 flex items-center">
            <div className="mr-3 rounded-full bg-indigo-100 p-2 dark:bg-indigo-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 dark:text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Browse Award Winners
            </h2>
          </div>
          <p className="mb-2 ml-11 text-gray-600 dark:text-gray-300">
            Filter and explore all Australian Web Award winners throughout the years.
          </p>
        </div>
        <AwardsClient years={years} categories={categories} awardWinners={awardWinners} />
      </div>

      <div className="mt-10 border-t border-gray-200 py-8 dark:border-gray-800">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Data sourced from the{' '}
            <a
              href="https://webawards.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
            >
              Australian Web Awards
            </a>{' '}
            - celebrating digital excellence since 2005.
          </p>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">
              Last updated: May 2025
            </span>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
