import { Card, Input, Button } from "@material-tailwind/react";
import logo from '../assets/logo.png';
import { useUser } from '../context/userContext';
import { useState } from 'react';
import { loginUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const { setUser } = useUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simulate a login process
        loginUser(username, password).then(data => {
            if (data.error) {
                alert(data.error);
            }
            else {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirect to the home page or dashboard
                navigate('/');
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
                        placeholder="NIP"
                        className="bg-white text-black"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        className="text-black bg-white"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Login Button */}
                <Button
                    className=" w-full mt-6 bg-white text-blue-900 font-bold"
                    onClick={handleLogin}
                >
                    LOGIN
                </Button>
                <Button
                    className=" w-full mt-6 bg-white text-blue-900 font-bold"
                    onClick={() => navigate('/register')}
                >
                    Register
                </Button>
            </Card>
        </div>
    );
}
