import Link from "next/link";

interface NavBarProps {
    active: "dashboard" | "movimentações" | "categorias"
}

const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Movimentações", href: "/transactions" },
    { label: "Carteiras", href: "/categories" },
]

export default function NavBar(props: NavBarProps) {
    const { active } = props
    const classActive = "border-b-4 border-primary"

    return (
        <nav className="flex justify-between bg-slate-950 px-6 pt-8">
            <h1 className="text-3xl font-bold">Investech</h1>
            <ul className="flex gap-30">
                {links.map(link =>
                    <li key={link.label} className={active === link.label ? classActive : ""}>
                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                )}

            </ul>
            <img className="size-12 rounded-full self-center" src="https://github.com/PedroHGGomes.png" alt="avatar" />
        </nav>
    )
}