import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex item-center justify-center h-full pt-20 pr-20'>
            <SignUp afterSignOutUrl='/'/>

        </div>
    )
}
