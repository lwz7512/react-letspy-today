import React from 'react'; 
import { FaPatreon, FaPaypal } from 'react-icons/fa';


const DonationPage = () => {

    return (
        <div className="donation mt-8 sm:mt-4 p-2 ">
            <div className="grid bg-white">
                <div className="col panel">
                    <h1 className="header-title text-gray-900">Show My Love</h1>
                    <div className="text-slogan p-5 mt-0 md:mt-5">
                        <p className="text-2xl text-indigo-800">
                            Very appreciated for your love! 
                            Each of donation will make this project better and beneficial to everyone!
                        </p>
                    </div>
                    <div className="button-groups pl-8 md:pl-5 py-3 mt-0 md:mt-2">
                        <a className="mr-3 button red" href="/">
                            <FaPatreon size="16px" />
                            <span className="ml-2">Patreon</span>
                        </a>
                        <a className="mr-3 button orange text-blue-900" href="/">
                            <FaPaypal size="18px" />
                            <span className="ml-2">Paypal</span>
                        </a>
                    </div>
                    <div className="col donation-bg"></div>
                </div>
                <div className="col panel">
                    <div className="donation-desc p-3 md:p-5">
                        <h3 className="text-2xl">
                            What you'll get if you make a donation to this project?
                        </h3>
                        <ul className="no-bullets pt-3">
                            <li className="flex">
                                <span className="text-6xl pr-3">🥉</span>
                                <p className="txt">
                                    <span className="px-2 border-left-3 border-green-500 surface-200">1$</span>  --  
                                    You'll be rewarded a `Python` beginner cheatsheet + 100 Python examples source code!
                                </p>
                            </li>
                            <li className="flex">
                                <span className="text-6xl pr-3">🥈</span>
                                <p className="txt">
                                    <span className="px-2 border-left-3 border-green-500 surface-200">3$</span>  --  
                                    You'll be rewarded a `Python` + `PhaserJS` combo cheatsheet + 100 Python examples source code!
                                </p>
                            </li>
                            <li className="flex">
                                <span className="text-6xl pr-3">🥇</span>
                                <p className="txt">
                                    <span className="px-2 border-left-3 border-green-500 surface-200">5$</span>  --  
                                    You'll be rewarded a `Python` + `PhaserJS` + `9 Games Pass Codes` combo cheatsheet!
                                </p>
                            </li>
                            <li className="flex">
                                <span className="text-6xl pr-3">🎖️</span>
                                <p className="txt">
                                    <span className="px-2 border-left-3 border-green-500 surface-200">10$</span>  --  
                                    You'll be rewarded a previous combo cheatsheet + `9 Games Making workflow and Source code explanation`!
                                </p>
                            </li>
                        </ul>
                        <p className="p-5 text-lg">Note: remember to leave a message or email after you made a donation!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonationPage