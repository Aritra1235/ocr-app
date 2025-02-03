import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function APIInfo() {
    return (
        <div className="container relative">
            <PageHeader
                title="API Information"
                description="Integrate our powerful OCR capabilities into your applications with ease."
            />
            <div className="mx-auto max-w-[800px] space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                    <p className="text-muted-foreground">
                        Our OCR API provides powerful optical character recognition capabilities. You can easily integrate our API
                        into your applications to extract text from images and documents.
                    </p>
                </section>
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Authentication</h2>
                    <p className="text-muted-foreground">
                        To use our API, you need to authenticate your requests using an API key. You can obtain an API key by
                        registering for an account on our platform.
                    </p>
                </section>
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Endpoints</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            { title: "OCR Processing", endpoint: "/api/v1/ocr", description: "Submit an image for OCR processing" },
                            { title: "Job Status", endpoint: "/api/v1/status", description: "Check the status of a submitted job" },
                            {
                                title: "Results Retrieval",
                                endpoint: "/api/v1/results",
                                description: "Retrieve the results of a completed OCR job",
                            },
                        ].map((item, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.endpoint}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Rate Limits</h2>
                    <p className="text-muted-foreground">
                        Our API has rate limits to ensure fair usage. Free tier users are limited to 100 requests per day, while
                        paid tiers have higher limits based on the subscription plan.
                    </p>
                </section>
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">Documentation</h2>
                    <p className="text-muted-foreground">
                        For detailed API documentation, including request/response formats and example code, please visit our{" "}
                        <a href="#" className="font-medium text-primary underline underline-offset-4">
                            API Documentation
                        </a>{" "}
                        page.
                    </p>
                </section>
            </div>
        </div>
    )
}

