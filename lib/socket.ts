import { Server as NetServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { NextApiResponse } from 'next'

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer
    }
  }
}

export const initSocket = (res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('Client connected')

      socket.on('join-session', (sessionId: string) => {
        socket.join(sessionId)
      })

      socket.on('leave-session', (sessionId: string) => {
        socket.leave(sessionId)
      })

      socket.on('exercise-complete', (data: { sessionId: string, exerciseId: string, score: number }) => {
        io.to(data.sessionId).emit('exercise-update', data)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }
  return res.socket.server.io
} 