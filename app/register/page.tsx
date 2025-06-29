"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Register() {
    const [username,setUsername]=useState("")
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 const [error,setError]=useState("")
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password===confirmPassword){
        setError("Your password doesn't match")
    }
    try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({username,email,password})
        });
        if(!res.ok){
            setError("Registration failed")
        }
        const data=res.json();
        router.push("/login")
    } catch (error) {
        
    }
  };

  return <div>Register</div>;
}

export default Register;
