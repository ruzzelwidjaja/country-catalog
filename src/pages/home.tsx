import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {



    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center h-screen">
            <div style={{ position: 'fixed', top: '1rem', right: '1rem' }}>
                <ModeToggle />
            </div>
            <h1 className={` text-7xl text-primary mb-8 text-center`}>Country Search</h1>

        </main>
    )
}