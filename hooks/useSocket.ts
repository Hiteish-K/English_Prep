import { useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'

export const useSocket = (sessionId?: string) => {
  const socketRef = useRef<Socket>()

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io()

    // Join session if provided
    if (sessionId) {
      socketRef.current.emit('join-session', sessionId)
    }

    // Cleanup on unmount
    return () => {
      if (sessionId) {
        socketRef.current?.emit('leave-session', sessionId)
      }
      socketRef.current?.disconnect()
    }
  }, [sessionId])

  const emitExerciseComplete = (data: { sessionId: string, exerciseId: string, score: number }) => {
    socketRef.current?.emit('exercise-complete', data)
  }

  const onExerciseUpdate = (callback: (data: any) => void) => {
    socketRef.current?.on('exercise-update', callback)
  }

  return {
    emitExerciseComplete,
    onExerciseUpdate
  }
} 