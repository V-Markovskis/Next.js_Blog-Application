This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Brief description

This application serves as a platform for creating and managing posts. It is designed with administrators in mind, providing them with the ability to create, delete, and update posts as well as comments. Regular users can engage with the platform by reading existing posts, ensuring a dynamic and interactive experience for all visitors. This Next.js application integrates with GitHub for authentication, offering a secure and streamlined user experience.

## Getting Started

1. Visit the official Docker website to download Docker for your operating system: [Docker Official Website](https://www.docker.com/get-started).
2. Inside the `seed-data.js` file, you will find the following section containing the username and password:

```javascript
// Example of username and password in seed-data.js
const username = "your_username_here";
const password = "your_password_here";
```
3. To utilize GitHub authentication, you'll need to configure your application with the following parameters ([GitHub Configuration](https://next-auth.js.org/providers/github)):
```
export const authOptions = {
  // ...other configurations
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  // ...other configurations
};
```


4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. Create and start containers [Docker Compose Up](https://docs.docker.com/engine/reference/commandline/compose_up/) or use command in terminal `docker-compose up --build`

7. Use [http://localhost:8081](http://localhost:8081) for Database UI


### Admin Permissions

Admin user have the ability to:

1. Delete and Update posts
2. Delete and Update comments

### User Permissions

Regular users have the ability to:

1. Read existing posts
2. Add comments



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

