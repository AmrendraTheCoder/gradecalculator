'use client';

import GradeForm from '../../../components/GradeComponentForm';
import { Button } from '../../../components/ui/button';
import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function ProtectedContent() {
    const { isLoaded, user, isSignedIn } = useUser();
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    // Set `showAuthPrompt` after checking if the user is not signed in
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            setShowAuthPrompt(true);
        }
    }, [isLoaded, isSignedIn]);

    // If not loaded yet, show loading message
    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {isSignedIn ? (
                <div className="flex flex-col justify-center gap-x-2 items-center container mx-auto">
                    <div className="flex items-center justify-center bg-white pb-1.5 rounded-xl max-w-lg w-full">
                        {/* Profile Section */}
                        <div className="flex flex-col items-center mb-2">
                            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Welcome, {user?.firstName || user?.username}!
                            </h2>

                        </div>

                        
                    </div>
                    {/* Grade Form Section */}
                    <div className="w-full">
                        <GradeForm />
                    </div>
                </div>
            ) : showAuthPrompt ? (
                <div className="flex flex-col items-center justify-center h-[720px]">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">You are not signed in</h2>
                    <p className="text-lg text-gray-600 mb-6">Please sign in or sign up to access this page.</p>
                    <div className="flex space-x-4">
                        <SignInButton>
                                <Button className='text-white font-medium' > Login </Button>
                        </SignInButton>
                        <SignUpButton>
                                <Button className='text-white font-medium'> Sign-Up </Button>
                        </SignUpButton>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

// <>
//     <Link href='/sign-in'>
//         <Button className='text-white font-medium' > Login </Button>
//     </Link>
//     <Link href='/sign-up'>
//         <Button className='text-white font-medium'> Sign-Up </Button>
//     </Link>
// </>