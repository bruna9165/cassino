import { Link } from "react-router-dom";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
import { Separator } from "../ui/separator";
import { CircleDollarSign, CircleUserRound, Gamepad2, LogOut, Settings } from "lucide-react";


   
  export function Sidebar() {
    return (
            <Card 
                className="fixed h-screen top-0 left-0 bottom-0 border border-solid border-border border-r-[#45474F] border-t-[#07080D] border-b-[#07080D] border-l-[#07080D] bg-gradient-to-b from-[#07080D] to-[#1D1F2C] w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5"
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            >
                <div className="flex items-center justify-center ">
                    <Typography
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    variant="h5" color="blue-gray">
                        <img className="w-32 h-32" src="../../../public/logo.png" alt="" />
                    </Typography>
                </div>
                <Separator className="mb-4"/>
                <List 
                    className="space-y-2 "
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}>
                        <Link to={"/home"} className="no-underline">
                            <ListItem
                                className="flex items-center cursor-pointer hover:bg-gray-900 text-gray-400 hover:text-white text-lg font-medium transition-colors p-4 px-6 gap-4"  
                                placeholder=""
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}>
                                <ListItemPrefix 
                                placeholder=""
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}>
                                <Gamepad2 className="h-6 w-6" />
                                </ListItemPrefix>
                                Jogos
                            </ListItem>
                        </Link>
                    <Link to="/transacoes" className="no-underline">
                        <ListItem
                            className="flex items-center cursor-pointer hover:bg-gray-900 text-gray-400 hover:text-white text-lg font-medium transition-colors p-4 px-6 gap-4"  
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}>
                            <ListItemPrefix placeholder=""
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}>
                            <CircleDollarSign className="h-6 w-6" />
                            </ListItemPrefix>
                            Saldo e Transações
                        </ListItem>
                    </Link>
                    <Link to={'/perfil'} className="no-underline">
                        <ListItem
                            className="flex items-center cursor-pointer hover:bg-gray-900 text-gray-400 hover:text-white text-lg font-medium transition-colors p-4 px-6 gap-4"
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}>
                            <ListItemPrefix placeholder=""
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}>
                            <CircleUserRound className="h-6 w-6" />
                            </ListItemPrefix>
                            Perfil
                        </ListItem>
                    </Link>
                    <Link to={"/configuraçoes"} className="no-underline">
                        <ListItem
                            className="flex items-center cursor-pointer hover:bg-gray-900 text-gray-400 hover:text-white text-lg font-medium transition-colors p-4 px-6 gap-4"  
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}>
                            <ListItemPrefix 
                                placeholder=""
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}
                            >
                                <Settings className="h-6 w-6" />
                            </ListItemPrefix>
                            Configurações
                        </ListItem>
                    </Link>
                    <Link to={'/'} className="no-underline">
                        <ListItem 
                            className="flex items-center cursor-pointer hover:bg-gray-900 text-gray-400 hover:text-white text-lg font-medium transition-colors p-4 px-6 gap-4"
                            placeholder=""
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                            >
                            <ListItemPrefix 
                                placeholder=""
                                onPointerEnterCapture={() => {}}
                                onPointerLeaveCapture={() => {}}
                            >
                                <LogOut className="h-6 w-6" />
                            </ListItemPrefix>
                            Sair
                        </ListItem>
                    </Link>
                </List>
            </Card>
    );
  }