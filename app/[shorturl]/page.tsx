import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface RedirectPageProps {
	params: Promise<{ shorturl: string }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
	const { shorturl } = await params;

	const url = await prisma.url.findUnique({ where: { shortUrl: shorturl } });

	if (!url) {
		return <div className="">404 - URL not found</div>;
	}

	await prisma.url.update({
		where: { shortUrl: shorturl },
		data: { visits: { increment: 1 } },
	});

	
	redirect(url.longUrl);
}
