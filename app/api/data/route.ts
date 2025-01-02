import { auth, currentUser } from '@clerk/nextjs/server'

export async function GET() {
    const { userId } = await auth();
    const user = await currentUser();

}