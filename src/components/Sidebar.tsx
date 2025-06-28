import React, { useState } from "react";
import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemStart,
    Card,
} from "@material-tailwind/react";
import {
    Bars3Icon,
    BookOpenIcon,
    HomeIcon,
    UserCircleIcon,
    XMarkIcon,
} from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

interface MenuItem {
    id: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    route: string;
    color: string;
}

export function Sidebar(): React.ReactElement {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<string>("dashboard");

    const toggleDrawer = (): void => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const navigate = useNavigate();

    const menuItems: MenuItem[] = [
        {
            id: "profile",
            icon: UserCircleIcon,
            label: "Profil Guru",
            route: "/profile",
            color: "from-purple-500 to-pink-500"
        },
        {
            id: "dashboard",
            icon: HomeIcon,
            label: "Dashboard",
            route: "/",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: "report-cards",
            icon: BookOpenIcon,
            label: "Rapot",
            route: "/report-cards",
            color: "from-green-500 to-emerald-500"
        }
    ];

    const handleNavigation = (item: MenuItem): void => {
        setActiveItem(item.id);
        navigate(item.route);
    };

    return (
        <div
            className={`
                relative h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
                text-white shadow-2xl border-r border-slate-700/50 transition-all duration-500 ease-in-out
                ${isDrawerOpen ? "w-72" : "w-20"}
            `}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent"></div>
            </div>

            {/* Header with Toggle Button */}
            <div className="relative flex justify-center items-center p-4 border-b border-slate-700/30">
                <IconButton 
                    className={`
                        relative flex items-center justify-center p-3 
                        bg-gradient-to-br from-slate-700 to-slate-600
                        hover:from-slate-600 hover:to-slate-500
                        shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                        border border-slate-600/50
                        ${isDrawerOpen ? 'w-14 h-14' : 'w-12 h-12'}
                    `}
                    variant="solid"
                    onClick={toggleDrawer}
                >
                    <div className="relative">
                        {isDrawerOpen ? (
                            <XMarkIcon className="w-6 h-6 text-white transition-transform duration-300" />
                        ) : (
                            <Bars3Icon className="w-6 h-6 text-white transition-transform duration-300" />
                        )}
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </IconButton>

                {/* App Title - only show when expanded */}
                {isDrawerOpen && (
                    <div 
                        className={`
                            ml-4 transition-all duration-500 ease-out delay-200
                            ${isDrawerOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}
                        `}
                    >
                        <Typography variant="h6" className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Kelompok2
                        </Typography>
                        <Typography variant="small" className="text-slate-400 text-xs">
                            Teacher Dashboard
                        </Typography>
                    </div>
                )}
            </div>

            {/* Navigation Menu */}
            <div className="relative mt-6 px-3">
                <List className="flex flex-col gap-2 p-0">
                    {menuItems.map((item: MenuItem, index: number) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.id;
                        
                        return (
                            <div key={item.id} className="relative">
                                <ListItem 
                                    onClick={() => handleNavigation(item)}
                                    className={`
                                        p-0 cursor-pointer group transition-all duration-300 ease-in-out
                                        ${index > 0 ? 'mt-1' : ''}
                                    `}
                                >
                                    {isDrawerOpen ? (
                                        <Card 
                                            className={`
                                                w-full h-14 flex items-center px-4 py-3
                                                bg-gradient-to-r border border-transparent hover:border-slate-600/50
                                                transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg
                                                ${isActive 
                                                    ? `bg-gradient-to-r ${item.color} shadow-lg shadow-slate-500/25` 
                                                    : 'from-slate-800/50 to-slate-700/50 hover:from-slate-700/70 hover:to-slate-600/70'
                                                }
                                            `}
                                            variant="ghost"
                                        >
                                            <ListItemStart className="h-8 w-8 mr-3">
                                                <div 
                                                    className={`
                                                        p-1.5 rounded-lg transition-all duration-300
                                                        ${isActive ? 'bg-white/20' : 'bg-slate-600/50 group-hover:bg-slate-500/70'}
                                                    `}
                                                >
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                            </ListItemStart>
                                            <Typography 
                                                className={`
                                                    text-base font-semibold transition-all duration-300
                                                    ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                                                `}
                                            >
                                                {item.label}
                                            </Typography>
                                            
                                            {/* Active indicator */}
                                            {isActive && (
                                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full shadow-lg"></div>
                                            )}
                                        </Card>
                                    ) : (
                                        <div 
                                            className={`
                                                relative w-14 h-14 flex items-center justify-center
                                                rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-110
                                                ${isActive 
                                                    ? `bg-gradient-to-br ${item.color} shadow-lg shadow-slate-500/25` 
                                                    : 'bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700/50 hover:border-slate-600'
                                                }
                                            `}
                                        >
                                            <Icon className="w-6 h-6 text-white" />
                                            
                                            {/* Tooltip */}
                                            <div 
                                                className={`
                                                    absolute left-full ml-4 px-3 py-2 
                                                    bg-slate-800 text-white text-sm font-medium
                                                    rounded-lg shadow-xl border border-slate-600
                                                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                                    transition-all duration-200 ease-in-out
                                                    whitespace-nowrap z-50 pointer-events-none
                                                    before:content-[''] before:absolute before:right-full before:top-1/2 
                                                    before:transform before:-translate-y-1/2 before:border-4 
                                                    before:border-transparent before:border-r-slate-800
                                                `}
                                            >
                                                {item.label}
                                            </div>
                                            
                                            {/* Active indicator for collapsed state */}
                                            {isActive && (
                                                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full shadow-lg"></div>
                                            )}
                                        </div>
                                    )}
                                </ListItem>
                                
                                {/* Separator after profile */}
                                {item.id === 'profile' && (
                                    <div 
                                        className={`
                                            my-4 transition-all duration-300
                                            ${isDrawerOpen ? 'mx-4' : 'mx-2'}
                                        `}
                                    >
                                        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </List>
            </div>

            {/* Footer - only show when expanded */}
            {isDrawerOpen && (
                <div 
                    className={`
                        absolute bottom-4 left-4 right-4 transition-all duration-500 ease-out delay-200
                        ${isDrawerOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}
                    `}
                >
                    <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <Typography variant="small" className="text-slate-400 text-center text-xs">
                            © 2024 Kelompok2 v1.0
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;