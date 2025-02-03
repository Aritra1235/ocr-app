import { PageHeader } from "@/components/page-header"

export default function PrivacyPolicy() {
    const sections = [
        {
            title: "What I Actually Store",
            content: (
                <>
                    When you use my OCR tool: I keep the text results (it's for a future addition/to combat malice), your browser's basic info (like what device you're using), and your IP. I never store your original images - they get shredded immediately after processing. The filename you upload is kept but not linked to you personally. Nothing stored can be linked to you personally.
                </>
            ),
        },
        {
            title: "Why I Keep Anything",
            content: (
                <>
                    I only store this stuff to: 1) Fix bugs when something breaks 2) See if people are actually using the tool 3) Block abusive/illegal users. That's it. There's no tracking, no ads, no creepy profiling, no feeding you valuable data to train AI. I'm just a dev trying to keep the lights on and improve the service.
                </>
            ),
        },
        {
            title: "Your Data Timeline",
            content: (
                <>
                    Here's exactly when stuff disappears: <br />
                    - Your uploaded image: gone in &lt;1 second after OCR finishes <br />
                    - Extracted text: auto-deleted after 7 days <br />
                    - Technical logs (IP, browser info): wiped every 30 days. I can't recover your data after deletion - it's gone for good.
                </>
            ),
        },
        {
            title: "Third-Party Reality Check",
            content: (
                <>
                    Right now the tool runs on Vercel/Render's servers and the database in atlas. While I don't intentionally share data with them, their infrastructure might see traffic like any hosting provider. I'm working to self-host everything soon. Check their privacy policies if you're paranoid (I would be).
                </>
            ),
        },
        {
            title: "Code Transparency",
            content: (
                <>
                    All code is open source at{" "}
                    <a  href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="underline">
                        GitHub
                    </a>
                    . What you see there is exactly what's running live. Feel free to check I'm not hiding anything - the database schema and deletion scripts are all visible.
                </>
            ),
        },
        {
            title: "No Legal BS Promises",
            content: (
                <>
                    I'm not a mega-corp - this is a free tool. While I use standard security practices (HTTPS, rate limiting), don't OCR your nuclear launch codes. I'll never sell your data, but I can't control alien hackers or government warrants.
                </>
            ),
        },
        {
            title: "Your Controls",
            content: (
                <>
                    Want your data gone faster? Email me at{" "}
                    <a href="mailto:contact@aritra.ovh" className="underline">contact@aritra.ovh</a>{" "}
                    with your IP address and approximate usage time - I'll manually scrub it. No accounts = no tracking, but also means I can't auto-delete per user.
                </>
            ),
        },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header at the top */}
            <div className="container mx-auto p-4">
                <PageHeader title="Privacy Policy" description="" />
            </div>

            {/* Centered content */}
            <div className="flex-1 flex items-center justify-center">
                <div className="mx-auto max-w-[800px] space-y-12">
                    {sections.map((section, index) => (
                        <section key={index} className="space-y-3">
                            <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
                            <p className="text-muted-foreground">{section.content}</p>
                        </section>
                    ))}
                </div>
            </div>
        </div>

    )
}
