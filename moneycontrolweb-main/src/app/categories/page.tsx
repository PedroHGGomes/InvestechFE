import { getCategories } from "@/actions/category-actions";
import CategoryItem from "@/components/category-item";
import NavBar from "@/components/nav-bar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CircleAlert, Plus } from "lucide-react";
import Link from "next/link";

export default async function CategoriesPage() {
    const data: Array<Category> = await getCategories()

    return (
        <>
            <NavBar active="categorias" />

            <main className="flex justify-center items-center">
                <div className="bg-slate-900 min-w-2/3 p-6 rounded m-6">

                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg font-bold" >Carteiras</h2>

                        <Button asChild>
                            <Link href="/categories/form">
                                <Plus />
                                Nova Carteira
                            </Link>
                        </Button>
                    </div>


                    {(data.length == 0) ?
                        <Alert>
                            <CircleAlert />
                            <AlertDescription>
                                Nenhuma carteira cadastrada
                            </AlertDescription>
                        </Alert>
                        : ""
                    }

                    {data.map(category => <CategoryItem key={category.id} category={category} />)}

                </div>
            </main>
        </>
    )
}