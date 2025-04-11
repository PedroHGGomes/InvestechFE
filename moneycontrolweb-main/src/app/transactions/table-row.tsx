import Icon from "@/components/icon";
import { TableCell, TableRow } from "@/components/ui/table";

interface TransactionsTableRowProps{
    transaction: Transaction
}

export default function TransactionsTableRow({ transaction }: TransactionsTableRowProps) {
    const isExpense = transaction.type === "EXPENSE"
    const color = isExpense ? "text-red-500" : "text-emerald-500"

    return (
        <TableRow className="border-b-2 border-slate-600">
            <TableCell align="center"><Icon name={transaction.category.icon} /></TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell className="w-1/2">{transaction.description}</TableCell>
            <TableCell className={`text-right ${color}`}>
                {isExpense ? "-" : "+"}
                R$ {transaction.amount}
            </TableCell>
        </TableRow>
    )
}