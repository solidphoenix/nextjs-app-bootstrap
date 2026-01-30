'use client'

import { useEffect, useState } from 'react'
import { getResponses, type SurveyResponse } from '@/lib/database'
import { generateICS, downloadICS } from '@/lib/calendar'
import type { Translation } from '@/translations'

interface ResponsesListProps {
  t: Translation
  refreshTrigger: number
}

export default function ResponsesList({ t, refreshTrigger }: ResponsesListProps) {
  const [responses, setResponses] = useState<SurveyResponse[]>([])

  useEffect(() => {
    setResponses(getResponses())
  }, [refreshTrigger])

  const handleDownloadICS = (response: SurveyResponse) => {
    const icsContent = generateICS(
      response.name,
      response.studyDay,
      response.preferredTime,
      response.topics,
      response.duration
    )
    downloadICS(icsContent, `study-day-${response.name.replace(/\s+/g, '-')}.ics`)
  }

  const getDurationLabel = (duration: string) => {
    switch (duration) {
      case '2h': return t.duration2h
      case '4h': return t.duration4h
      case '6h': return t.duration6h
      case 'full': return t.durationFull
      default: return duration
    }
  }

  const getStudyDayLabel = (day: string) => {
    return day === '2026-02-09' ? t.studyDay1 : t.studyDay2
  }

  if (responses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
        {t.noResponses}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {responses.map((response) => (
        <div
          key={response.id}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-medical-primary">{response.name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(response.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDownloadICS(response)}
              className="bg-medical-secondary text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors text-sm"
            >
              {t.downloadICS}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">{t.studyDay}</p>
              <p className="text-medical-text">{getStudyDayLabel(response.studyDay)}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600">{t.preferredTime}</p>
              <p className="text-medical-text">{response.preferredTime}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600">{t.duration}</p>
              <p className="text-medical-text">{getDurationLabel(response.duration)}</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-600">{t.topics}</p>
              <p className="text-medical-text">{response.topics}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
