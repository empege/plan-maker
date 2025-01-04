# Plan Maker ☑️

### Plan Maker is a website where you can create small _projects_ to track your tasks, and see other peoples progress on theirs.

Code can be viewed and reused ([GitHub](https://github.com/empege/plan-maker)). You can also see **tasks.md** file to see how I planned each step and what I learned while creating this web app.

To have it working locally, other than cloning, doing npm install and having the necessary setup ready (like node etc), you have to setup a base, SMTP and your .env file. I used MySQL and Prisma for the base and personal cPanel email, as I never learned this before so it was a nice opportunity.

Locally or live, you can signup, login, reset password (email will be sent to you), create projects, edit project header, add items to projects like title, subtitle, checkbox etc, or you can edit any element by clicking on it!

Only password is encrypted, as anything else related to projects creation is visible to others anyways, so that info is not encrypted. But, you can see this in the code itself.

#### Created by [Ivan Mitov](https://www.ivanmitov.com) for the purpose of learning Next.js (app router)

### Below is the usual Next.js README.md 👇

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
