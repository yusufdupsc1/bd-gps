import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import * as bcrypt from "bcryptjs";

export const runtime = "nodejs";

const DEMO_USERS = [
  { email: "admin@school.edu", password: "admin123", name: "Admin", role: "ADMIN" },
  { email: "principal@school.edu", password: "principal123", name: "Principal", role: "PRINCIPAL" },
  { email: "teacher@school.edu", password: "teacher123", name: "Teacher", role: "TEACHER" },
  { email: "student@school.edu", password: "student123", name: "Student", role: "STUDENT" },
  { email: "parent@school.edu", password: "parent123", name: "Parent", role: "PARENT" },
];

async function setupDemoUser(email: string, password: string, name: string, role: string) {
  // Ensure institution exists
  let institution = await db.institution.findUnique({ where: { slug: "bd-gps" } });
  
  if (!institution) {
    institution = await db.institution.create({
      data: {
        slug: "bd-gps",
        name: "BD-GPS Demo School",
        email: "admin@school.edu",
        city: "Dhaka",
        country: "BD",
        timezone: "Asia/Dhaka",
        currency: "BDT",
        isActive: true,
      },
    });
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 12);
  
  // Create or update user
  let user = await db.user.findUnique({ where: { email } });
  
  if (!user) {
    user = await db.user.create({
      data: {
        email,
        name,
        password: hashed,
        role,
        isActive: true,
        approvalStatus: "APPROVED",
        emailVerified: new Date(),
        institutionId: institution.id,
      },
    });
  }

  return { ...user, institution: { name: institution.name, slug: institution.slug } };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
  providers: [
    Credentials({
      id: "credentials",
      name: "Login",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        // Find demo user
        const demoUser = DEMO_USERS.find(u => u.email.toLowerCase() === email);
        
        if (!demoUser) {
          return null;
        }

        // Verify password
        if (demoUser.password !== password) {
          return null;
        }

        // Setup user in database
        try {
          const user = await setupDemoUser(demoUser.email, demoUser.password, demoUser.name, demoUser.role);
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            institutionId: user.institutionId,
            institutionName: user.institution.name,
            institutionSlug: user.institution.slug,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.institutionId = (user as any).institutionId;
        token.institutionName = (user as any).institutionName;
        token.institutionSlug = (user as any).institutionSlug;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub as string;
        (session.user as any).role = token.role as string;
        (session.user as any).institutionId = token.institutionId as string;
        (session.user as any).institutionName = token.institutionName as string;
        (session.user as any).institutionSlug = token.institutionSlug as string;
      }
      return session;
    },
  },
});
