//import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Instagram  } from "lucide-react"

export default function AboutMe() {
    return (
        <div className="flex flex-col">

            <div className="container mx-auto p-4">
                <PageHeader title="About Me" description="" />
            </div>
            <div className="mx-auto max-w-[800px] space-y-12">
                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                    <img
                        src="https://i.ibb.co/B2Xjc4qH/IMG-20170310-060847-Original.jpg"
                        alt="Profile picture"
                        width={300}
                        height={300}
                        className="rounded-full shadow-lg"
                    />
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight">Aritra</h2>
                        <p className="text-muted-foreground">
                            Hello! I'm Aritra, I'm a computer science student.
                        </p>
                        <p className="text-muted-foreground">
                            And that's it
                        </p>
                        <p className="text-muted-foreground">
                            Bye Bye
                        </p>
                    </div>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Connect with me:</h3>
                        <div className="flex space-x-4">
                            <a href="https://linkedin.com/in/aritra-bhattacharya-524157265" className="text-primary hover:text-primary/80">
                                <Linkedin className="h-6 w-6" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="https://www.instagram.com/aritra_ab" className="text-primary hover:text-primary/80">
                                <Instagram  className="h-6 w-6" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://github.com/Aritra1235" className="text-primary hover:text-primary/80">
                                <Github className="h-6 w-6" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

