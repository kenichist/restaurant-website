import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Category } from '@/models/Menu';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    const category = await Category.findById(id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: category });
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
    
    const category = await Category.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: category });
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
    
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
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
