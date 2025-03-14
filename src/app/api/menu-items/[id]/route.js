import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { MenuItem } from '@/models/Menu';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    const menuItem = await MenuItem.findById(id).populate('category');
    
    if (!menuItem) {
      return NextResponse.json(
        { success: false, message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: menuItem });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    await connectToDatabase();
    
    const menuItem = await MenuItem.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).populate('category');
    
    if (!menuItem) {
      return NextResponse.json(
        { success: false, message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: menuItem });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    const menuItem = await MenuItem.findByIdAndDelete(id);
    
    if (!menuItem) {
      return NextResponse.json(
        { success: false, message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
