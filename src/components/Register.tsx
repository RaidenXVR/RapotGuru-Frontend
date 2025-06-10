import { Card, Input, Button, Typography } from "@material-tailwind/react";
import logo from '../assets/logo.png';
import { useUser } from '../context/userContext';
import { useState } from 'react';
import { registerUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {


    const [nip, setNip] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        // Simulate a register process
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        registerUser(nip, name, password).then(data => {
            if (data.error) {
                alert(data.error);
            }
            else {

                // Redirect to login page after successful registration
                alert('Registration successful! Please login.');
                navigate('/login');
            }
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#464e6b] relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute w-[120%] h-[120%] bg-[#353c52] justify-center items-center rounded-full -top-1/2 left-1/2 transform -translate-x-1/2 blur-[100px] opacity-50 z-0" />

            <Card className="w-full max-w-sm p-8 z-10 bg-[#2d324a]"
                variant="ghost"
                style={{ backdropFilter: 'blur(10px)' }}
            >
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src={logo}
                        alt="Tut Wuri Handayani"
                        className="w-32 h-32 object-contain"
                    />
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Name"
                        className="bg-white text-black"
                        onChange={(e) => setName(e.target.value)} />
                    <Input
                        placeholder="NIP"
                        className="bg-white text-black"
                        onChange={(e) => setNip(e.target.value)}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        className="text-black bg-white"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        className="text-black bg-white"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* Register Button */}
                <Button
                    className=" w-full mt-6 bg-white text-blue-900 font-bold"
                    onClick={handleRegister}
                >
                    Register
                </Button>

            </Card>
        </div>
    );
}
