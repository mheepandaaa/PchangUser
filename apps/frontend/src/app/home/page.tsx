import { fetchMenus } from "@services/data";
import HomeContent from "./(components)/HomeContent";

export default async function HomePage() {
    const data = await fetchMenus()
    return(<HomeContent menus={data}/>)
}