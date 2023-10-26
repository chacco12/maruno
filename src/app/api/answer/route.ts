
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, answer } from '@prisma/client';
import { cookies } from 'next/headers'

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  console.log(">>>>>api/answer/GET")
  const cookieStore = cookies()
  const set_cook  = cookieStore.get('answer_id')
  
  // const { answer_id } = await req.json();
  const res = await prisma.answer.findUnique({
    where: {
      // answer_id:set_cook?.value,
      answer_id:"12345678"
    },
  });
  return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
  console.log(">>>>>api/answer/POST")
  
  const { user_id, title, input, answer, result, status } = await req.json();
  const res = await prisma.answer.create({
    data: {
      user_id,
      title,
      input,
      answer,
      result,
      status,
    }
  });
  return NextResponse.json(res);
}

export async function PUT(req: NextRequest) {
  console.log(">>>>>api/answer/PUT")
  const { answer_id, input, answer, result, status } = await req.json();
  
  
  const res = await prisma.answer.update({
    where:{
      answer_id: "12345678" 
    },
    data: {
      input,
      answer,
      result,
      status
    },
  });
  return NextResponse.json(res);
}