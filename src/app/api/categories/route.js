import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Category } from '@/models/Menu';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    const category = await Category.create(body);
    return NextResponse.json(
      { success: true, data: category },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
