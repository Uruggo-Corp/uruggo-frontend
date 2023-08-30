import { Prisma } from '@prisma/client';

const listingWithRelations = Prisma.validator<Prisma.ListingArgs>()({
	include: {
		images: true,
		agent: true
	}
});

export type ListingWithImages = Prisma.ListingGetPayload<typeof listingWithRelations>;
