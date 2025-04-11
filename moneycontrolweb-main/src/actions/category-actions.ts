import { icons } from "lucide-react"
import { redirect } from "next/navigation"

const API_URL = "http://localhost:8080/categories"

export async function getCategories() {
    const response = await fetch(API_URL)
    return await response.json()
}

export async function createCategory(initialState: any, formData: FormData) {


    const data = {
        name: formData.get("name"),
        icon: formData.get("icon")
    }

    console.log(data)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(API_URL, options)

    // return early
    if (!response.ok){
        const errors = await response.json()
        return {
            values: {
                name: formData.get("name"),
                icon: formData.get("icon")
            },
            errors: {
                name: errors.find(e => e.field === "name")?.message,
                icon: errors.find(e => e.field === "icon")?.message
            }
        }
    }

    redirect("/categories")
}


