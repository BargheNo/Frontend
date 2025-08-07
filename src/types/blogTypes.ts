interface Blog {
	id: number;
	className?: string;
	cover_image: string;
	title: string;
	description: string;
	author: { firstName: string; lastName: string };
	created_at: string;
	like_count: number;
	status: number;
	corporation?: { name: string };
}
