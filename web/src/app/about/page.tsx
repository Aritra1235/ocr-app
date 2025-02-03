import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function AboutMe() {
    return (
        <div className="container relative">
            <PageHeader title="About Me" description="OCR Enthusiast & Software Developer" />
            <div className="mx-auto max-w-[800px] space-y-12">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <Image
                        src="/placeholder.svg"
                        alt="Profile picture"
                        width={300}
                        height={300}
                        className="rounded-full shadow-lg"
                    />
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight">John Doe</h2>
                        <p className="text-muted-foreground">
                            Hello! I'm John, a passionate software developer with a keen interest in Optical Character Recognition
                            (OCR) technology. With over 10 years of experience in the field, I've worked on various OCR projects and
                            have developed a deep understanding of the challenges and opportunities in this space.
                        </p>
                        <p className="text-muted-foreground">
                            My journey in OCR began during my graduate studies, where I focused on improving accuracy rates for
                            handwritten text recognition. Since then, I've been dedicated to making OCR technology more accessible and
                            user-friendly for everyone.
                        </p>
                        <p className="text-muted-foreground">
                            When I'm not coding or experimenting with new OCR algorithms, you can find me hiking in the mountains or
                            reading science fiction novels. I'm always excited to connect with fellow tech enthusiasts and discuss the
                            latest developments in OCR and AI.
                        </p>
                    </div>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Connect with me:</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-primary hover:text-primary/80">
                                <Linkedin className="h-6 w-6" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="#" className="text-primary hover:text-primary/80">
                                <Twitter className="h-6 w-6" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="text-primary hover:text-primary/80">
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

