import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Australian Web Awards Leaderboard',
  description:
    'All-time winners of the Australian Web Awards - celebrating digital excellence since 2005',
}

export default function AwardsLayout({ children }) {
  return <div className="divide-y divide-gray-200 dark:divide-gray-700">{children}</div>
}
