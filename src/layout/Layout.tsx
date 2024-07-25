import React, { useCallback, useState } from "react"
import StarWarsLogoImg from "../assets/star-wars-yellow.svg"
import "./styles/themes.scss"
import "./styles/common.scss"
import "./Layout.scss"

interface LayoutProps {
    children?: React.ReactNode
}

function Layout({children}: LayoutProps) {
    const [themeMode, setThemeMode] = useState('dark');
    const toggleDarkTheme = useCallback(() => {
        setThemeMode((prevTheme) => prevTheme === 'light' ? 'dark' : 'light')
    }, [])

    return (
        <div className={`layoutMain theme theme-${themeMode}`}>
            <div className="layoutHeader">
                <img className='layoutLogo' src={StarWarsLogoImg} />
                <h1>Search Application</h1>
                <div className="layoutToolbar">
                    <button onClick={toggleDarkTheme} className="asLink">
                        {themeMode === 'light' ? 'Join' : 'Leave'} the dark side
                    </button>
                </div>
            </div>
            <div className="layoutContent">
                {children}
            </div>
        </div>
    )
}

export default Layout
