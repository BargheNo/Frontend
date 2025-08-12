interface Blog {
	id: number;
	className?: string;
	coverImage: string;
	title: string;
	description: string;
	author: { firstName: string; lastName: string };
	createdAt: string;
	likeCount: number;
	status: string;
	corporation?: { name: string };
}
