import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex item-center justify-center h-full pt-5 p-20'>

            <SignIn afterSignOutUrl='/' />

        </div>
    )

}