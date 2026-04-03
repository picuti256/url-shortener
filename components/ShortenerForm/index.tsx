'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ShortenerForm() {
	const [url, setUrl] = useState<string>('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/shorten', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error status ${response.status}`);
			}

			await response.json();
			setUrl('');
		} catch (e) {
			console.error('Error shortening URL: ', e);
		} finally {
		}
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
