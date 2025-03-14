import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { MenuItem } from '@/models/Menu';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Build query
    const query = {};
    if (category) {
      query.category = category;
    }
    
    const menuItems = await MenuItem.find(query)
      .populate('category')
      .sort({ order: 1 });
      
    return NextResponse.json({ success: true, data: menuItems });
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
    
    const menuItem = await MenuItem.create(body);
    return NextResponse.json(
      { success: true, data: menuItem },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
