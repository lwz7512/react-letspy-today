import React from 'react'; 
import { FaPaypal } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'
import { isAuthenticated } from '../helper/withAuth'
import buyMeCoffeeIcon from '../assets/icon/buyme_a_coffee.svg'


const DonationPage = () => {

    const history = useHistory()

    const URLs = {
        py_secret: '/cheatsheet/python_beginner_cheatsheet',
        py_100: 'https://github.com/lwz7512/pytraining4yue',
        py_more: 'https://github.com/x4nth055/pythoncode-tutorials',
        ph_secret: '/cheatsheet/phaserjs_beginner_cheatsheet',
        letspy_source: 'https://github.com/lwz7512/react-letspy-today/tree/master/src/games',
        letspy_disclose: '/disclosure',
        letspy_pass: '/cheatsheet/letspy_game_pass_code',
    }

    const checkToOpen = event => {
        // login if no authenticated
        if (!isAuthenticated()) {
            event.preventDefault()
            history.push('/profile')
        }
    }

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
                    <div className="pl-8 md:pl-5 py-3 mt-0 md:mt-2">
                        <a className="mr-3 button bg-blue-600 text-blue-900" 
                            href="https://paypal.me/rainbowcodinglab?country.x=CA&locale.x=en_US"
                            target="_blank"
                            rel="noreferrer">
                            <FaPaypal size="18px" />
                            <span className="ml-2 text-white">Paypal Donation to Rainbow Coding Lab</span>
                        </a>
                    </div>
                    <div className="pl-8 md:pl-5 py-3 mt-0 md:mt-2 flex">
                        <span className="text-2xl line-height-4 pr-3">or</span>
                        <a className="mr-3 inline-block " 
                            href="https://www.buymeacoffee.com/lwz7512"
                            target="_blank"
                            rel="noreferrer">
                            <img src={buyMeCoffeeIcon} alt="buy me coffee" className="w-11rem" />
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
                                    You're eligible to get 
                                    <a href={URLs.py_secret} onClick={checkToOpen}> Python beginner cheatsheet </a> 
                                    + <a href={URLs.py_100} onClick={checkToOpen}>
                                        100 Python examples source code
                                      </a> and <a href={URLs.py_more} onClick={checkToOpen}> more!</a>
                                </p>
                            </li>
                            <li className="flex">
                                <span className="text-6xl pr-3">🥈</span>
                                <p className="txt">
                                    <span className="px-2 border-left-3 border-green-500 surface-200">3$</span>  --  
                                    You're eligible to get the previous rewards 
                                    + <a href={URLs.ph_secret} onClick={checkToOpen}>PhaserJS cheatsheet</a> combo 
                                    + 100 Python examples source code!
                                </p>
                            </li>
                            <li className="flex">
                                <span className="text-6xl pr-3">🥇</span>
                                <p className="txt">
                                    <span className="px-2 border-left-3 border-green-500 surface-200">5$</span>  --  
                                    You're eligible to get the previous rewards
                                    + <a href={URLs.letspy_pass} onClick={checkToOpen}>9 Games Pass Codes </a>
                                    + <a href={URLs.letspy_source} onClick={checkToOpen} >Javascript source code</a> combo!
                                </p>
                            </li>
                            <li className="flex">
                                <span className="text-6xl pr-3">🎖️</span>
                                <p className="txt">
                                    <span className="px-2 border-left-3 border-green-500 surface-200">10$</span>  --  
                                    You're eligible to get the previous rewards
                                    + <a href={URLs.letspy_disclose} onClick={checkToOpen}>
                                        9 Games Making workflow and Source code explanation
                                    </a>!
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