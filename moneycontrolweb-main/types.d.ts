
interface Category {
    id: number,
    name: string,
    icon: string
}

interface Transaction {
    id: number,
    description: string,
    amount: number,
    date: string,
    type: "EXPENSE" | "INCOME",
    category: Category
}