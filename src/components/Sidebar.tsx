import React from "react";
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

export function Sidebar() {
    // const [open, setOpen] = React.useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        if (isDrawerOpen) {
            setIsDrawerOpen(false)
        }
        else {
            setIsDrawerOpen(true)
        }
    }
    const navigate = useNavigate();

    return (<div
        className={`transition-all duration-300 bg-gray-900 text-white ${isDrawerOpen ? "w-64" : "w-18"
            }`}
    >
        <div className="flex justify-center p-2">
            <IconButton className="flex w-12 h-12 justify-items-center justify-center p-3 outline-0"
                variant="solid"

                onClick={toggleDrawer}>
                {isDrawerOpen ?
                    (<XMarkIcon className="flex w-8 h-8 outline-0" />) :
                    (<Bars3Icon className="flex w-8 h-8 outline-0" />)

                }
            </IconButton>
        </div>
        <div className="">
            <List className="flex-col p-0">
                <ListItem onClick={() => navigate("/profile")}>
                    {isDrawerOpen ?
                        (<Card variant="ghost" className="flex w-full align-middle h-14 flex-row hover:bg-gray-950 p-3 bg-transparent" >
                            <ListItemStart className="h-8 w-8">
                                <UserCircleIcon color="white" />
                            </ListItemStart>
                            <Typography className=" text-lg" color="secondary">
                                <strong>Profil Guru</strong>
                            </Typography>
                        </Card>) :
                        (<ListItemStart className="h-12 w-12 hover:bg-gray-950 rounded-sm">
                            <UserCircleIcon color="white" />
                        </ListItemStart>)
                    }
                </ListItem>
                <hr className="p-3 my-2 m-4 border-gray-700"></hr>
                <ListItem onClick={() => navigate('/')}>
                    {isDrawerOpen ?
                        (<Card variant="ghost" className="flex w-full align-middle h-14 flex-row hover:bg-gray-950 p-3 bg-transparent" >
                            <ListItemStart className="h-8 w-8">
                                <HomeIcon color="white" />
                            </ListItemStart>
                            <Typography className="text-lg" color="secondary" >
                                <strong>Dashboard</strong>
                            </Typography>
                        </Card>) :
                        (<ListItemStart className="h-12 w-12 hover:bg-gray-950 rounded-sm">
                            <HomeIcon color="white" />
                        </ListItemStart>)
                    }
                </ListItem>
                <ListItem onClick={() => navigate('/report-cards')}>
                    {isDrawerOpen ?
                        (<Card variant="ghost" className="flex w-full align-middle h-14 flex-row hover:bg-gray-950 p-3 bg-transparent" >
                            <ListItemStart className="h-8 w-8">
                                <BookOpenIcon color="white" />
                            </ListItemStart>
                            <Typography className="text-lg" color='secondary'>
                                <strong>Rapot</strong>
                            </Typography>
                        </Card>) :
                        (<ListItemStart className="h-12 w-12 hover:bg-gray-950 rounded-sm">
                            <BookOpenIcon color="white" />
                        </ListItemStart>)
                    }
                </ListItem>
                {/* 
                <ListItem>
                    {isDrawerOpen ?
                        (<Card className="w-full align-middle h-14 flex-row hover:bg-blue-700 pl-3 pt-2" color="transparent">
                            <ListItemStart className="h-8 w-8 justify-center">
                                <AcademicCapIcon color="white" />
                            </ListItemStart>
                            <Typography className="p-2" color="white">
                                <h3 >Pelajaran & CP</h3>
                            </Typography>
                        </Card>) :
                        (<ListItemStart className="h-12 w-12 hover:bg-blue-700 rounded-sm">
                            <AcademicCapIcon color="white" />
                        </ListItemStart>)
                    }
                </ListItem>

                <ListItem>
                    {isDrawerOpen ?
                        (<Card className="w-full align-middle h-14 flex-row hover:bg-blue-700 pl-3 pt-2" color="transparent">
                            <ListItemStart className="h-8 w-8 justify-center">
                                <RocketLaunchIcon color="white" />
                            </ListItemStart>
                            <Typography className="p-2" color="white">
                                <h3 >Ektrakulikuler</h3>
                            </Typography>
                        </Card>) :
                        (<ListItemStart className="h-12 w-12 hover:bg-blue-700 rounded-sm">
                            <RocketLaunchIcon color="white" />
                        </ListItemStart>)
                    }
                </ListItem> */}

            </List>
        </div>
    </div>
    );
}

export default Sidebar;