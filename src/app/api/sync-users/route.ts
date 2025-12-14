import { NextResponse } from 'next/server';
import { initializeUsers } from '@/lib/storage';
import { User } from '@/types/auth';

export async function POST(request: Request) {
  try {
    const { users } = await request.json();
    
    if (Array.isArray(users)) {
      initializeUsers(users as User[]);
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
