
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { user_id, password } = await req.json();
  const res = await prisma.user.findUnique({
    where: {
      user_id
    }
  });
      
      if(res?.password==password){

        return NextResponse.json(res);
      }
  return NextResponse.json("NG");
}

export async function POST(req: NextRequest) {
  const { user_id, password } = await req.json();
  const res = await prisma.user.create({
    data: {
      user_id,
      password
    }
  });
  return NextResponse.json(res);
}