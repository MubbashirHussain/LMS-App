import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import { AppBar, IconButton, Typography } from '@mui/material';


type RouteType = {
    route: string,
    Navigate?: string,
    text: string,
    Icon: React.ReactElement,
    RouteComponent: React.ReactElement,
}[]

type NavListType = {
    NavList: {
        Heading?: string,
        Components: RouteType
    }[],
    BottomNav?: RouteType,
}


type NavConfig = {
    MainBgColor?: string,
    HeaderBgColor?: string,
    HeaderFontColor?: string,
    DrawerFontColor?: string,
    DrawerBgColor?: string,
    ListHoverColor?: string,
    ListFontColor?: string,
    ListIconsColor?: string,
    HeaderHeight?: string | number,
    DrawerWidth?: string | number,
    NavListClassName?: string,
    BottomListClassName?: string,
    LogoStyle?: React.CSSProperties,
    LogoParentStyle?: React.CSSProperties,
}


type Props = {
    window?: () => Window;
    NavListArray: NavListType,
    CompPathName: string,
    Logo: React.ReactElement | string,
    SmLogo?: React.ReactElement | string,
    NavConfig?: NavConfig,
    ExtraRoutes?: {
        route: string,
        RouteComponent: React.ReactElement
    }[]
}


// let NavListArray = {
//     NavList: [
//         {
//             Heading: "Dekh lo abhi",
//             Components: [
//                 { route: "NewQuiz", text: "Add New Qiuz", Icon: <MenuIcon />, RouteComponent: <QuizAppAdmin /> },
//             ]
//         },
//         []
//     ],
//     BottomNav: [
//         { route: "Logout", text: "Logout", Icon: <MenuIcon />, RouteComponent: <QuizAppAdmin /> },
//     ]
// }

export default function ResponsiveDrawer(props: Props) {

    const { window, Logo, NavConfig, SmLogo, CompPathName, NavListArray ,ExtraRoutes } = props;
    let LogoParentStyle = NavConfig?.LogoParentStyle ?? {}
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const Navigate = useNavigate()
    const drawerWidth = NavConfig ? (NavConfig.DrawerWidth ?? 260) : 260;
    const appbarHeight = NavConfig ? (NavConfig.HeaderHeight ?? "60px") : "60px"
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

    // React.useEffect(() => { console.log(NavListArray.NavList[0].Components[0].route) })
    React.useEffect(() => { location.pathname === `${CompPathName}` ? Navigate(`${NavListArray.NavList[0].Components[0].Navigate ?? NavListArray.NavList[0].Components[0].route}`) : null }, [])
    const drawer = (
        <>

            <div className='h-full'>
                <Toolbar className='h-[15%]'>
                    <div style={{ overflow: "hidden", width: "100%", objectFit: "cover", objectPosition: "center", ...LogoParentStyle }} className="d-flex align-items-center justfy-content-center flex-column">
                        {typeof Logo !== "string" ? Logo : <img style={(NavConfig?.LogoStyle)} src={Logo} />}
                    </div>
                </Toolbar>
                <div className='flex flex-col justify-between h-[85%]'>
                    <div className={'overflow-y-scroll over' + NavConfig?.NavListClassName}>
                        {NavListArray.NavList.map((x: any, i: number) => {
                            return <List key={i}>
                                <Divider />
                                {x.Heading && <h1 className="px-3 pt-5 pb-1 text-zinc-500 text-sm font-semibold">{x.Heading}</h1>}
                                {x.Components && x.Components.map((Obj: any, index: number) => (
                                    <NavLink to={`${Obj.Navigate ?? Obj.route}`} key={index} onClick={() => setMobileOpen(false)}>
                                        <ListItem sx={{
                                            "& .css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root:hover": {
                                                color: NavConfig?.ListFontColor ?? "#757575",
                                                background: NavConfig?.ListHoverColor ?? "#0000000a",
                                            }
                                        }}
                                            disablePadding >
                                            <ListItemButton>
                                                <ListItemIcon sx={{
                                                    justifyContent: "center",
                                                    color: NavConfig?.ListIconsColor ?? NavConfig?.ListFontColor ?? "#757575",
                                                }} >

                                                    {Obj.Icon && Obj.Icon}
                                                </ListItemIcon>
                                                <ListItemText primary={Obj.text} sx={{
                                                    color: NavConfig?.ListFontColor ?? NavConfig?.ListIconsColor ?? "#757575",
                                                }} />
                                            </ListItemButton>
                                        </ListItem>
                                    </NavLink>
                                ))}
                            </List>
                        })}
                    </div>
                    <div className={"" + NavConfig?.BottomListClassName}>
                        {<List>
                            <Divider />
                            {NavListArray?.BottomNav?.map((Obj: any, index: number) => (
                                <NavLink to={`${Obj.route}`} key={index}>
                                    <ListItem sx={{
                                        "& .css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root:hover": {
                                            color: NavConfig?.ListFontColor ?? "#757575",
                                            background: NavConfig?.ListHoverColor ?? "#0000000a",
                                        }
                                    }}
                                        disablePadding
                                    // onClick={() => { Navigate(`${Obj.route}`)}}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon sx={{
                                                justifyContent: "center",
                                                color: NavConfig?.ListIconsColor ?? NavConfig?.ListFontColor ?? "#757575",
                                            }} >

                                                {Obj.Icon && Obj.Icon}
                                            </ListItemIcon>
                                            <ListItemText primary={Obj.text} sx={{
                                                color: NavConfig?.ListFontColor ?? NavConfig?.ListIconsColor ?? "#757575",
                                            }} />
                                        </ListItemButton>
                                    </ListItem>
                                </NavLink>
                            ))}
                        </List>}
                    </div>
                </div>
            </div >
        </>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{
            display: 'flex',
            background: NavConfig?.MainBgColor ?? "#F3F2F7",
            flexDiraction: { sm: "column", md: "row" }
        }}>
            <CssBaseline />


            <AppBar
                position="fixed"
                sx={{
                    display: { md: 'none' },
                    color: NavConfig?.HeaderFontColor ?? NavConfig?.DrawerFontColor ?? "#000",
                    background: NavConfig?.HeaderBgColor ?? NavConfig?.DrawerBgColor ?? "#FFF",
                    height: appbarHeight,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">{SmLogo ?? Logo}</Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    "& .MuiDrawer-paper": {
                    },
                    width: { sm: 0, md: drawerWidth },
                    flexShrink: { sm: 0 }
                }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            color: NavConfig?.DrawerFontColor ?? NavConfig?.HeaderFontColor ?? "#000",
                            background: NavConfig?.DrawerBgColor ?? NavConfig?.HeaderBgColor ?? "#FFF",
                            boxSizing: 'border-box', width: drawerWidth
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { sm: 'none', md: 'block', xs: "none" },
                        '& ::-webkit-scrollbar': { width: 0, height: 0 },
                        '& .MuiDrawer-paper': {
                            color: NavConfig?.DrawerFontColor ?? NavConfig?.HeaderFontColor ?? "#000",
                            background: NavConfig?.DrawerBgColor ?? NavConfig?.HeaderBgColor ?? "#FFF",
                            boxSizing: 'border-box', width: drawerWidth
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, p: 3,
                    marginTop: { sm: appbarHeight, xs: appbarHeight, md: 0 },
                    backgound: NavConfig?.MainBgColor ?? "#F3F2F7",
                    minHeight: { md: "100vh", sm: `calc(100vh - ${appbarHeight})`, xs: `calc(100vh - ${appbarHeight})` },
                    width: { sm: 100, md: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                {/* {NavListArray.NavList[1][0].RouteComponent} */}
                {
                    <Routes>
                        {NavListArray.NavList.map((j: any, i: number) => (j.Components && j.Components.map((x: any) => (<Route key={i} path={`${x.route}`} element={x.RouteComponent} />))))}
                        {NavListArray.BottomNav?.map((x: any, i: number) => <Route key={i} path={`${x.route}`} element={x.RouteComponent} />)}
                        {ExtraRoutes?.map((x: any, i: number) => <Route key={i} path={`${x.route}`} element={x.RouteComponent} />)}
                    </Routes>
                }
                <Toolbar />
            </Box>
        </Box>
    );
}
