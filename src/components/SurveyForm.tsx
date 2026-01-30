'use client'

import { useState } from 'react'
import { addResponse } from '@/lib/database'
import { generateICS, downloadICS, getGoogleCalendarLink } from '@/lib/calendar'
import type { Translation } from '@/translations'

interface SurveyFormProps {
  t: Translation
  onSuccess: () => void
}

export default function SurveyForm({ t, onSuccess }: SurveyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    studyDay: '2026-02-09' as '2026-02-09' | '2026-02-10',
    preferredTime: '',
    topics: '',
    duration: '4h' as '2h' | '4h' | '6h' | 'full',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      // Add response to local storage
      addResponse(formData)
      
      setMessage({ type: 'success', text: t.success })
      
      // Reset form
      setFormData({
        name: '',
        studyDay: '2026-02-09',
        preferredTime: '',
        topics: '',
        duration: '4h',
      })
      
      // Notify parent component
      setTimeout(() => {
        onSuccess()
      }, 1000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setMessage({ type: 'error', text: t.error })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddToCalendar = () => {
    if (!formData.name || !formData.preferredTime) {
      alert('Please fill in your name and preferred time first')
      return
    }

    const icsContent = generateICS(
      formData.name,
      formData.studyDay,
      formData.preferredTime,
      formData.topics,
      formData.duration
    )
    
    downloadICS(icsContent, `study-day-${formData.studyDay}.ics`)
  }

  const handleGoogleCalendar = () => {
    if (!formData.name || !formData.preferredTime) {
      alert('Please fill in your name and preferred time first')
      return
    }

    const link = getGoogleCalendarLink(
      formData.name,
      formData.studyDay,
      formData.preferredTime,
      formData.topics
    )
    
    window.open(link, '_blank')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-8">
      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-medical-accent/10 text-medical-accent'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-medical-text mb-2">
          {t.name}
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-primary focus:border-transparent"
          placeholder={t.namePlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-medical-text mb-2">
          {t.studyDay}
        </label>
        <div className="space-y-2">
          <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-medical-light transition-colors">
            <input
              type="radio"
              name="studyDay"
              value="2026-02-09"
              checked={formData.studyDay === '2026-02-09'}
              onChange={(e) => setFormData({ ...formData, studyDay: e.target.value as '2026-02-09' })}
              className="mr-3 h-4 w-4 text-medical-primary"
            />
            <span>{t.studyDay1}</span>
          </label>
          <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-medical-light transition-colors">
            <input
              type="radio"
              name="studyDay"
              value="2026-02-10"
              checked={formData.studyDay === '2026-02-10'}
              onChange={(e) => setFormData({ ...formData, studyDay: e.target.value as '2026-02-10' })}
              className="mr-3 h-4 w-4 text-medical-primary"
            />
            <span>{t.studyDay2}</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="preferredTime" className="block text-sm font-medium text-medical-text mb-2">
          {t.preferredTime}
        </label>
        <input
          type="text"
          id="preferredTime"
          required
          value={formData.preferredTime}
          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-primary focus:border-transparent"
          placeholder={t.timePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="topics" className="block text-sm font-medium text-medical-text mb-2">
          {t.topics}
        </label>
        <textarea
          id="topics"
          required
          rows={4}
          value={formData.topics}
          onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-primary focus:border-transparent"
          placeholder={t.topicsPlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-medical-text mb-2">
          {t.duration}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: '2h', label: t.duration2h },
            { value: '4h', label: t.duration4h },
            { value: '6h', label: t.duration6h },
            { value: 'full', label: t.durationFull },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-medical-light transition-colors"
            >
              <input
                type="radio"
                name="duration"
                value={option.value}
                checked={formData.duration === option.value}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value as typeof formData.duration })}
                className="mr-3 h-4 w-4 text-medical-primary"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 min-w-[200px] bg-medical-primary text-white py-3 px-6 rounded-md hover:bg-medical-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? t.submitting : t.submit}
        </button>
        
        <button
          type="button"
          onClick={handleAddToCalendar}
          className="flex-1 min-w-[200px] bg-medical-secondary text-white py-3 px-6 rounded-md hover:bg-cyan-600 transition-colors font-medium"
        >
          {t.downloadICS}
        </button>
      </div>
      
      <button
        type="button"
        onClick={handleGoogleCalendar}
        className="w-full bg-medical-accent text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors font-medium"
      >
        {t.addToCalendar} (Google)
      </button>
    </form>
  )
}
