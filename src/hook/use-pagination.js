import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
const usePagination = (currentPage, perPage, totalDocuments) => {
    const [curPage, setCurPage] = useState(currentPage);
    const history = useHistory();
    const goToPrevPage = () => {
        if(curPage === 1){
            return;
        }
        setCurPage(prevState => {
            history.push(`?page=${prevState - 1}`)
        })
    }
    
    const totalPagination = useMemo(() => {
        return Math.ceil(totalDocuments / perPage);
    }, [totalDocuments, perPage])
    const goToNextPage = () => {
        const totalPagi = totalPagination;
        if(currentPage === totalPagi){
            return;
        }
        setCurPage(prevState => {
            history.push(`?page=${prevState + 1}`);
        })
    }

    const renderPagination = useMemo(() => {
        const totalPagi = totalPagination;
        const arrayPagination = new Array(totalPagi);
        const fillArray = arrayPagination.fill().map((_, index) => index + 1);
        if(totalPagi < 3){
            return fillArray;
        }
        if(curPage === 1 || curPage === 2){
            return fillArray.slice(0, 3);
        }
        if(curPage === totalPagi){
            return fillArray.slice(totalPagi - 3, totalPagi);
        }
        return fillArray.slice(curPage - 2, curPage + 1)
        // page 4, total = 22 => [1, 2, 3, 4, 5, 6]
        // index = 3 -> render index = 2 va index = 4
    }, [totalPagination, curPage])

    return {
        goToNextPage: goToNextPage,
        goToPrevPage: goToPrevPage,
        totalPagination: totalPagination,
        renderPagination: renderPagination,
        hasNextPage: curPage < totalPagination,
        hasPrevPage: curPage > 1,
        curPage: curPage
    }
}

export default usePagination;