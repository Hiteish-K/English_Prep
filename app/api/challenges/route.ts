import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const type = searchParams.get('type')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }
    
    const where: any = { userId }
    if (type) {
      where.type = type
    }
    
    const challenges = await prisma.challenge.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(challenges)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching challenges' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId, type, content } = await req.json()
    
    const challenge = await prisma.challenge.create({
      data: {
        userId,
        type,
        content
      }
    })
    
    return NextResponse.json(challenge)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating challenge' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, completed, score, feedback } = await req.json()
    
    const challenge = await prisma.challenge.update({
      where: { id },
      data: {
        completed,
        score,
        feedback,
        completedAt: completed ? new Date() : null
      }
    })
    
    return NextResponse.json(challenge)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating challenge' }, { status: 500 })
  }
} 