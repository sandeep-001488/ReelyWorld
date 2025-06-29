import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    const {data:session}=useSession()
    const handleLogout=async()=>{
       try {
        await signOut();
       } catch (error) {
        
       }
    }
  return (
    <div>
      <button onClick={handleLogout}>Signout</button>
      {session ? (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </>
      ) : (
        <div>Welcome here</div>
      )}
    </div>
  );
}

export default Header