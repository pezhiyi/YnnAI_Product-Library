import { NextResponse } from 'next/server';
import { getStoredUrls } from '../../../../utils/urlStorage';

export async function GET(request) {
  try {
    const urlMapping = await getStoredUrls();
    return NextResponse.json(urlMapping);
  } catch (error) {
    console.error('获取URL映射失败:', error);
    return NextResponse.json({ error: '获取URL映射失败' }, { status: 500 });
  }
} 