import { useEffect, useState } from "react";

const useMedia = (query) => {
    const [match, setMatch] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        // query must be '(max-width: ...px)'
        const handler = event => setMatch(media.matches);
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, [match, query]);

    return match;
}

export default useMedia;

