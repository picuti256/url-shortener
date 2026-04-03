'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ShortenerForm() {
	const [url, setUrl] = useState<string>('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(url);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mb-4"
		>
			<div className="space-y-4">
				<Input
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="h-12"
					type="url"
					placeholder="Enter the URL you want to shortener"
					required
				/>
				<Button
					className="w-full p-2 hover:bg-black/80 cursor-pointer"
					type="submit"
				>
					Shorten URL
				</Button>
			</div>
		</form>
	);
}
