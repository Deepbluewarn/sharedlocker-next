'use client'

import { AuthenticationForm } from "@/components/auth/AuthenticationForm";

export default function SignIn() {
    
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '16px'
        }}>
            <AuthenticationForm />
        </div>
        
    )
}
