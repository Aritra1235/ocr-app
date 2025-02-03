import { PageHeader } from "@/components/page-header"
//import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function APIInfo() {
    return (
        <div className="flex flex-col">
            <div className="container mx-auto p-4">
                <PageHeader title="API Information" description="An api to extract text from images and documents, WORK IN PROGRESS" />
            </div>

            <div className="flex-1 flex items-center justify-center">

                <div className="mx-auto max-w-[800px] space-y-12">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight">Work In Progress</h2>
                        <p className="text-muted-foreground">
                            Yeah mate ik, I too have no idea why I already created this page this early on. Well anyways it's just going to be the api if I ever end up finishing it
                        </p>
                    </section>
                </div>

                {/*
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
                */}
            </div>
        </div>
    )
}

