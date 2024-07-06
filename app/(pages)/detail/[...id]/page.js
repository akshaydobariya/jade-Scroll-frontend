import AppConfig from "@/appConfig"
import Home from "./Home"

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const baseUrl = AppConfig.apiUrl

    const id = params.id

    const ids = `id=${params.id}&chapterSort=${"DESC"}`
    let product = await fetch(`${baseUrl}public/get-novel?id=${id}&chapterSort="DESC"`, { cache: 'no-store' }).then((res) => res.json())
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.data?.title,
        description: product?.data?.description,
        openGraph: {
            description: product?.data?.description,
            images: '../../../../public/assets/icon/logoLightMode.png'
        }
    }
}

function BookDetail() {
    return (
        <div>
            <Home />
        </div>
    )
}

export default BookDetail