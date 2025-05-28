import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, use with caution in production)
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        userName: 'alice_smith',
        email: 'alice@example.com',
        role: Role.ADMIN,
      },
      {
        userName: 'bob_johnson',
        email: 'bob@example.com',
        role: Role.USER,
      },
      {
        userName: 'carol_williams',
        email: 'carol@example.com',
        role: Role.USER,
      },
    ],
    skipDuplicates: true, // Prevent duplicates based on unique email
  });

  // Fetch created users to get their IDs
  const createdUsers = await prisma.user.findMany();

  // Seed Posts
  const posts = await prisma.post.createMany({
    data: [
      {
        title: 'My First Blog Post',
        content: 'This is the content of my first post.',
        description: 'An introduction to my blog.',
        category: 'General',
        published: true,
        authorId: createdUsers.find((u) => u.email === 'alice@example.com')!.id,
      },
      {
        title: 'Exploring Prisma',
        content: 'Learning about Prisma ORM and its features.',
        description: 'A deep dive into Prisma.',
        category: 'Technology',
        published: false,
        authorId: createdUsers.find((u) => u.email === 'alice@example.com')!.id,
      },
      {
        title: 'Bob’s Thoughts',
        content: 'Just sharing some random thoughts.',
        description: 'Random musings from Bob.',
        category: 'Personal',
        published: true,
        authorId: createdUsers.find((u) => u.email === 'bob@example.com')!.id,
      },
      {
        title: 'Why I Love Coding',
        content: 'Coding is my passion and here’s why.',
        description: 'Carol’s journey in programming.',
        category: 'Programming',
        published: false,
        authorId: createdUsers.find((u) => u.email === 'carol@example.com')!.id,
      },
    ],
  });

  // Fetch created posts to get their IDs
  const createdPosts = await prisma.post.findMany();

  // Seed Comments
  await prisma.comment.createMany({
    data: [
      {
        content: 'Great post, Alice!',
        authorId: createdUsers.find((u) => u.email === 'bob@example.com')!.id,
        postId: createdPosts.find((p) => p.title === 'My First Blog Post')!.id,
      },
      {
        content: 'Thanks for sharing this!',
        authorId: createdUsers.find((u) => u.email === 'carol@example.com')!.id,
        postId: createdPosts.find((p) => p.title === 'My First Blog Post')!.id,
      },
      {
        content: 'Looking forward to more tech posts.',
        authorId: createdUsers.find((u) => u.email === 'bob@example.com')!.id,
        postId: createdPosts.find((p) => p.title === 'Exploring Prisma')!.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
  console.log(
    `Created ${users.count} users, ${posts.count} posts, and 3 comments.`,
  );
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
