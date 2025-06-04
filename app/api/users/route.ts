import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, name, nativeLanguage } = await req.json()
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        nativeLanguage,
        progress: {
          create: {}
        }
      },
      include: {
        progress: true
      }
    })
    
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        progress: true,
        challenges: true
      }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 })
  }
} 