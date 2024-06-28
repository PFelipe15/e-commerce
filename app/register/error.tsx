'use client' // Error components must be Client Components
 
import ErrorCard from '@/components/layout/error-card'
  
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
 
 
  return (
     <ErrorCard errorText={error.message} onReset={reset}/>
  )
}