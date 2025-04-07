import { useLocation } from "react-router-dom";
import { Home, Info } from 'lucide-react'

export default function () {
    const path = useLocation().pathname;
    return (
        <div className="absolute top-10 right-10 z-10 text-white [&_a:hover]:text-green-500">
            <div className="">
                {
                    path === "/" ?
                        <a href="/about">
                            <span>
                                <Info />
                            </span>
                        </a>
                        : path === "/about" ?
                            <a href="/">
                                <span>
                                    <Home />
                                </span>
                            </a>
                            : <div className="flex gap-4">
                                <a href="/">
                                    <span>
                                        <Home />
                                    </span>
                                </a>
                                <a href="/about">
                                    <span>
                                        <Info />
                                    </span>
                                </a>
                            </div>
                }
            </div>
        </div>
    );
}