import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as bcrypt from "bcryptjs";

const DEMO_USERS = [
  { email: "admin@school.edu", password: "admin123", name: "Admin", role: "ADMIN" },
];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check institution
    const institution = await db.institution.findUnique({ where: { slug: "bd-gps" } });
    
    // Check user
    const user = await db.user.findUnique({ 
      where: { email },
      include: { institution: true }
    });

    return NextResponse.json({
      received: { email, password },
      institution: institution ? { id: institution.id, slug: institution.slug, name: institution.name } : null,
      user: user ? { 
        id: user.id, 
        email: user.email, 
        role: user.role, 
        hasPassword: !!user.password,
        institutionSlug: user.institution?.slug 
      } : null,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
