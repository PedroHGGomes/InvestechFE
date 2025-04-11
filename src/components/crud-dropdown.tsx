import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Pencil, Trash } from "lucide-react"


export default function CrudDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Pencil />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash />
                    Apagar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}