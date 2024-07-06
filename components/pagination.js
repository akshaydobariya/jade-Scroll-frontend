import { Pagination } from "@mui/material";
import { usePathname } from "next/navigation";

export default function PaginationControlled({ setPage, page, last_page }) {
    const path = usePathname()
    const handlePaginationChange = (event, value) => {
        setPage(value)
        if (!path.includes('detail') && !path.includes('chapter')) {
            if(typeof window !== 'undefined'){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })}
        }
    }

    return (
        <div className="my-3 mb-5">
            <Pagination className="dark:bg-gray-400 dark:rounded-md" count={last_page} page={page} onChange={handlePaginationChange} />
        </div>
    )
}