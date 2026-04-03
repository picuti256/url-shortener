'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { CopyIcon, EyeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Url = {
	shortUrl: string;
	longUrl: string;
	visits: number;
};

export default function UrlList() {
	const [urls, setUrls] = useState<Url[]>([]);
	const shortenerUrl = (code: string) =>
		`${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

	const fetchUrls = async () => {
		try {
			const response = await fetch('/api/urls');
			const data = await response.json();
			setUrls(data);
		} catch (e) {
			console.error('Error fetching URLs', e);
		}
	};

	useEffect(() => {
		fetchUrls();
	}, []);

	return (
		<div className="">
			<h2 className="text-2xl font-bond mb-2">Recent URLs</h2>
			<ul className="space-y-2">
				{urls.map((url) => (
					<li
						key={url.shortUrl}
						className="flex items-center gap-2 justify-between"
					>
						<Link
							href={`/${url.shortUrl}`}
							target="_blank"
							className="text-blue-500"
						>
							{shortenerUrl(url.shortUrl)}
						</Link>
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								className="text-muted-foreground hover:bg-muted cursor-pointer"
							>
								<CopyIcon className="w-4 h-4" />
								<span className="sr-only">Copy URL</span>
							</Button>
							<span className="flex items-center gap-2">
								<EyeIcon className="h-4 w-4 " />
								{url.visits} views
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
