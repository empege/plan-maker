import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

interface CreateUserRequest {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const { email, password }: CreateUserRequest = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password, // Make sure this is a password!
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Greška pri kreiranju korisnika' }, { status: 500 });
  }
}