import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext({
    dark: false,
    setThemeHandler: () => {}
})
const DarkModeProvider = (props) => {
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        const mode = localStorage.getItem('mode');
        if(!mode){
            setTheme(false);
        }
        else{
            if(mode === 'dark'){
                setTheme(true);
            } else {
                setTheme(false);
            }
            document.body.setAttribute('data-theme', mode);
        }
    }, [])
    const changeThemeHandler = () => {
        document.body.setAttribute('data-theme', !theme ? 'dark' : 'light');
        setTheme(prevState => {
            localStorage.setItem('mode', !prevState ? 'dark' : 'light');
            return !prevState
        });
    }
    return(
        <DarkModeContext.Provider value={{
            dark: theme,
            setThemeHandler: changeThemeHandler
        }}>
            {props.children}
        </DarkModeContext.Provider>
    )
}

export default DarkModeProvider;