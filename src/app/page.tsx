'use client'

import { useState } from 'react'
import SurveyForm from '@/components/SurveyForm'
import ResponsesList from '@/components/ResponsesList'
import { translations, type Language } from '@/translations'

export default function Home() {
  const [language, setLanguage] = useState<Language>('en')
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const t = translations[language]

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Language Selector */}
        <div className="mb-6 flex justify-end">
          <div className="bg-white rounded-lg shadow p-2 flex gap-2">
            <span className="text-sm text-gray-600 self-center mr-2">{t.languageLabel}:</span>
            {(['de', 'en', 'ru'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-md transition-colors font-medium text-sm ${
                  language === lang
                    ? 'bg-medical-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-medical-primary mb-3">
            {t.title}
          </h1>
          <p className="text-xl text-medical-text">{t.subtitle}</p>
        </div>

        {/* Survey Form */}
        <div className="mb-12">
          <SurveyForm t={t} onSuccess={handleSuccess} />
        </div>

        {/* Responses List */}
        <div>
          <h2 className="text-3xl font-bold text-medical-primary mb-6">{t.responses}</h2>
          <ResponsesList t={t} refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </main>
  )
}
