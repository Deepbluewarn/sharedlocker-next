'use client' // Error components must be Client Components
 
import { Button, Group } from '@mantine/core'
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>관리자 페이지 오류가 발생했어요!</h2>
      <p>{error.digest}</p>
      <Group>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          돌아가기
        </Button>
        <Button component={Link} href='/'>
          메인 페이지
        </Button>
      </Group>
      
    </div>
  )
}