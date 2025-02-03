import { PageHeader } from "@/components/page-header"

export default function PrivacyPolicy() {
    return (
        <div className="container relative">
            <PageHeader
                title="Privacy Policy"
                description="We value your privacy and are committed to protecting your personal information."
            />
            <div className="mx-auto max-w-[800px] space-y-12">
                {[
                    {
                        title: "Information We Collect",
                        content:
                            "We collect information you provide directly to us, such as when you create an account, use our OCR service, or contact us for support.",
                    },
                    {
                        title: "How We Use Your Information",
                        content:
                            "We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our company and our users.",
                    },
                    {
                        title: "Sharing of Information",
                        content:
                            "We do not share personal information with companies, organizations, or individuals outside of our company except in the following cases: with your consent, for legal reasons, or to protect rights, property, or safety.",
                    },
                    {
                        title: "Data Security",
                        content:
                            "We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.",
                    },
                    {
                        title: "Changes to This Policy",
                        content:
                            "We may change this privacy policy from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.",
                    },
                ].map((section, index) => (
                    <section key={index} className="space-y-3">
                        <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
                        <p className="text-muted-foreground">{section.content}</p>
                    </section>
                ))}
            </div>
        </div>
    )
}

