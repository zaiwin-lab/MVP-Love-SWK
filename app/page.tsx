import StickyNav from '@/components/StickyNav'
import Hero from '@/components/Hero'
import LiveCounter from '@/components/LiveCounter'
import GlobalMap from '@/components/GlobalMap'
import SubmissionFormSection from '@/components/SubmissionFormSection'
import MessageWall from '@/components/MessageWall'
import Leaderboard from '@/components/Leaderboard'
import WordCloud from '@/components/WordCloud'
import CommunityPromise from '@/components/CommunityPromise'

export default function Home() {
  return (
    <>
      <StickyNav />
      <main>
        <Hero />
        <LiveCounter />
        <GlobalMap />
        <SubmissionFormSection />
        <MessageWall />
        <Leaderboard />
        <WordCloud />
        <CommunityPromise />
      </main>
    </>
  )
}
