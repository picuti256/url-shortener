import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { url } = await req.json();

	const shortUrl = nanoid(8);

	const shortenedUrl = await prisma.url.create({
		data: {
			longUrl: url,
			shortUrl,
		},
	});

	return NextResponse.json({ shortUrl: shortenedUrl.shortUrl });
}
