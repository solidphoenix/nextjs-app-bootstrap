// Database utilities for storing survey responses
// For GitHub Pages, we'll use localStorage as a simple database

export interface SurveyResponse {
  id: string
  name: string
  studyDay: '2026-02-09' | '2026-02-10'
  preferredTime: string
  topics: string
  duration: '2h' | '4h' | '6h' | 'full'
  timestamp: string
}

const STORAGE_KEY = 'survey_responses'

export function getResponses(): SurveyResponse[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading responses:', error)
    return []
  }
}

export function addResponse(response: Omit<SurveyResponse, 'id' | 'timestamp'>): SurveyResponse {
  const newResponse: SurveyResponse = {
    ...response,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
    timestamp: new Date().toISOString(),
  }
  
  const responses = getResponses()
  responses.push(newResponse)
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses))
  } catch (error) {
    console.error('Error saving response:', error)
    throw new Error('Failed to save response')
  }
  
  return newResponse
}

export function clearResponses(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
