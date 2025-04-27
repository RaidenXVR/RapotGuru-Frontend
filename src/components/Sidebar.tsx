import React from "react";
import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Card,
} from "@material-tailwind/react";
import {
    AcademicCapIcon,
    Bars3Icon,
    BookOpenIcon,
    BuildingLibraryIcon,
    HomeIcon,
    RocketLaunchIcon,
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
        className={`transition-all duration-300 bg-green-600 text-white ${isDrawerOpen ? "w-64" : "w-18"
            }`}
    >
        <div className="flex justify-center p-2">
            <IconButton className="flex w-12 h-12 justify-items-center justify-center p-3"
                variant="text"
                onClick={toggleDrawer}>
                {isDrawerOpen ?
                    (<XMarkIcon className="flex w-8 h-8" />) :
                    (<Bars3Icon className="flex w-8 h-8" />)

                }
            </IconButton>
        </div>
        <div className="">
            <List className="flex-col p-0">

                <ListItem>
                    {isDrawerOpen ?
                        (<Card className="w-full align-middle h-14 flex-row hover:bg-blue-700 pl-3 pt-2" color="transparent">
                            <ListItemPrefix className="h-8 w-8 justify-center">
                                <BuildingLibraryIcon color="white" />
                            </ListItemPrefix>
                            <Typography className="p-2" color="white">
                                <h3 >Profil Sekolah</h3>
                            </Typography>
                        </Card>) :
                        (<ListItemPrefix className="h-12 w-12 hover:bg-blue-700 rounded-sm">
                            <BuildingLibraryIcon color="white" />
                        </ListItemPrefix>)
                    }
                </ListItem>

                <ListItem>
                    {isDrawerOpen ?
                        (<Card className="w-full align-middle h-14 flex-row hover:bg-blue-700 pl-3 pt-2" color="transparent">
                            <ListItemPrefix className="h-8 w-8 justify-center">
                                <UserCircleIcon color="white" />
                            </ListItemPrefix>
                            <Typography className="p-2" color="white">
                                <h3 >Profil Guru</h3>
                            </Typography>
                        </Card>) :
                        (<ListItemPrefix className="h-12 w-12 hover:bg-blue-700 rounded-sm">
                            <UserCircleIcon color="white" />
                        </ListItemPrefix>)
                    }
                </ListItem>
                <hr className="p-3 my-2 m-4 border-green-900"></hr>
                <ListItem>
                    {isDrawerOpen ?
                        (<Card className="w-full align-middle h-14 flex-row hover:bg-blue-700 pl-3 pt-2" color="transparent">
                            <ListItemPrefix className="h-8 w-8">
                                <HomeIcon color="white" />
                            </ListItemPrefix>
                            <Typography className="p-2" color="white">
                                <h3>Dashboard</h3>
                            </Typography>
                        </Card>) :
                        (<ListItemPrefix className="h-12 w-12 hover:bg-blue-700 rounded-sm">
                            <HomeIcon />
                        </ListItemPrefix>)
                    }
                </ListItem>
                <ListItem onClick={() => navigate('/report-cards')}>
                    {isDrawerOpen ?
                        (<Card className="w-full align-middle h-14 flex-row hover:bg-blue-700 pl-3 pt-2" color="transparent">
                            <ListItemPrefix className="h-8 w-8 justify-center">
                                <BookOpenIcon color="white" />
                            </ListItemPrefix>
                            <Typography className="p-2" color="white">
                                <h3 >Rapot</h3>
                            </Typography>
                        </Card>) :
                        (<ListItemPrefix className="h-12 w-12 hover:bg-blue-700 rounded-sm">
                            <BookOpenIcon color="white" />
                        </ListItemPrefix>)
                    }
                </ListItem>
                {/* 
                <ListItem>
                    {isDrawerOpen ?
                        (<Card className="w-full align-middle h-14 flex-row hover:bg-blue-700 pl-3 pt-2" color="transparent">
                            <ListItemPrefix className="h-8 w-8 justify-center">
                                <AcademicCapIcon color="white" />
                            </ListItemPrefix>
                            <Typography className="p-2" color="white">
                                <h3 >Pelajaran & CP</h3>
                            </Typography>
                        </Card>) :
                        (<ListItemPrefix className="h-12 w-12 hover:bg-blue-700 rounded-sm">
                            <AcademicCapIcon color="white" />
                        </ListItemPrefix>)
                    }
                </ListItem>

                <ListItem>
                    {isDrawerOpen ?
                        (<Card className="w-full align-middle h-14 flex-row hover:bg-blue-700 pl-3 pt-2" color="transparent">
                            <ListItemPrefix className="h-8 w-8 justify-center">
                                <RocketLaunchIcon color="white" />
                            </ListItemPrefix>
                            <Typography className="p-2" color="white">
                                <h3 >Ektrakulikuler</h3>
                            </Typography>
                        </Card>) :
                        (<ListItemPrefix className="h-12 w-12 hover:bg-blue-700 rounded-sm">
                            <RocketLaunchIcon color="white" />
                        </ListItemPrefix>)
                    }
                </ListItem> */}

            </List>
        </div>
    </div>
    );
}

export default Sidebar;