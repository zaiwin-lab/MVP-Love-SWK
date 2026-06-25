'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SubmissionForm from './SubmissionForm'
import ThankYou from './ThankYou'

export default function SubmissionFormSection() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null)

  return (
    <section
      id="submission-form"
      className="section-pad"
      style={{
        background: '#0c0c18',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background atmosphere */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(232,25,44,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {submitted && submittedData ? (
            <ThankYou
              key="thankyou"
              data={submittedData}
              onReset={() => { setSubmitted(false); setSubmittedData(null) }}
            />
          ) : (
            <SubmissionForm
              key="form"
              onSuccess={(data) => { setSubmittedData(data); setSubmitted(true) }}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
