// Calendar utilities for generating .ics files

export function generateICS(
  name: string,
  studyDay: '2026-02-09' | '2026-02-10',
  preferredTime: string,
  topics: string,
  duration: string
): string {
  const startDate = studyDay.replace(/-/g, '')
  const startTime = preferredTime.split('-')[0]?.trim().replace(':', '') || '0900'
  
  // Calculate end time based on duration
  let hours = 8 // default full day
  if (duration === '2h') hours = 2
  else if (duration === '4h') hours = 4
  else if (duration === '6h') hours = 6
  
  const startHour = parseInt(startTime.substring(0, 2))
  const endHour = startHour + hours
  const endTime = endHour.toString().padStart(2, '0') + startTime.substring(2)
  
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Study Day Survey//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${startDate}T${startTime}00
DTEND:${startDate}T${endTime}00
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
UID:${Date.now()}@studysurvey.com
SUMMARY:Study Day - ${name}
DESCRIPTION:Topics: ${topics}\\nDuration: ${duration}\\nPreferred Time: ${preferredTime}
LOCATION:Study Location
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
  
  return icsContent
}

export function downloadICS(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

export function getGoogleCalendarLink(
  name: string,
  studyDay: string,
  preferredTime: string,
  topics: string
): string {
  const date = studyDay.replace(/-/g, '')
  const time = preferredTime.split('-')[0]?.trim().replace(':', '') || '0900'
  const title = encodeURIComponent(`Study Day - ${name}`)
  const details = encodeURIComponent(`Topics: ${topics}\nPreferred Time: ${preferredTime}`)
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}T${time}00/${date}T180000&details=${details}`
}
