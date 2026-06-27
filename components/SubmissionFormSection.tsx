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
        background: 'var(--surface-green)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >

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
