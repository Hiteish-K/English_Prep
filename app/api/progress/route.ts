import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }
    
    const progress = await prisma.progress.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            nativeLanguage: true
          }
        }
      }
    })
    
    if (!progress) {
      return NextResponse.json({ error: 'Progress not found' }, { status: 404 })
    }
    
    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching progress' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId, skillType, score, points } = await req.json()
    
    const progress = await prisma.progress.findUnique({
      where: { userId }
    })
    
    if (!progress) {
      return NextResponse.json({ error: 'Progress not found' }, { status: 404 })
    }
    
    const updateData: any = {
      lastPracticeDate: new Date(),
      totalPoints: progress.totalPoints + (points || 0)
    }
    
    // Update specific skill score
    if (skillType && score) {
      updateData[`${skillType}Score`] = score
    }
    
    // Update streak if last practice was yesterday
    const lastPractice = progress.lastPracticeDate
    if (lastPractice) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (lastPractice.toDateString() === yesterday.toDateString()) {
        updateData.streak = progress.streak + 1
      }
    } else {
      updateData.streak = 1
    }
    
    const updatedProgress = await prisma.progress.update({
      where: { userId },
      data: updateData
    })
    
    return NextResponse.json(updatedProgress)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating progress' }, { status: 500 })
  }
} 