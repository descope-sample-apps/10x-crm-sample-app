import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Info } from "lucide-react"
import Image from "next/image"
import { styles } from "@/app/styles"

export default function InboundAppsPage() {

    return (
        <div className={styles.mainContainer}>
            <main className="flex-1">
                {/* Header Section */}
                <section className={styles.heroSection}>
                    <div className={styles.heroContainer}>
                        <div className={styles.heroContent}>
                            <Link href="/" className="self-start mb-2">
                                <Button variant="ghost" size="sm" className="gap-1 text-[#8cafae] hover:text-[#4e5f5f] dark:hover:text-[#9fbfbf]">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Home
                                </Button>
                            </Link>
                            <h1 className={styles.heroTitle}>10x CRM Inbound App Setup</h1>
                            <p className={styles.heroDescription}>
                                A walkthrough of how we implemented Descope's Inbound Apps feature in 10x CRM
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className={styles.mainSection}>
                    <div className={styles.contentContainer}>
                        {/* What are Inbound Apps Section */}
                        <div className={`${styles.infoBox} -mt-4`}>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <h2 className={styles.cardTitle}>Why use Inbound Apps?</h2>
                                </div>
                                <p className={styles.infoText}>
                                    With Inbound Apps, AI agents and third-party applications can securely access 10x CRM data with
                                    proper authentication and authorization.
                                </p>
                                <div>
                                    <Link
                                        href="https://docs.descope.com/inbound-apps"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs md:text-sm font-medium inline-flex items-center text-[#8cafae] hover:text-[#4e5f5f] dark:hover:text-[#9fbfbf]"
                                    >
                                        Learn more about Inbound Apps
                                        <ArrowRight className="ml-1 h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Step 1 */}
                        <div className="mb-6">
                            <div className="flex items-start gap-2 mb-2">
                                <div
                                    className="flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold mt-1 bg-[#8cafae] dark:bg-[#4e5f5f]"
                                >
                                    1
                                </div>
                                <h3 className={styles.cardTitle}>Creating the 10x CRM Inbound App</h3>
                            </div>
                            <p className={styles.cardDescription}>
                                We started by creating a new inbound app in the{" "}
                                <Link
                                    href="https://app.descope.com/apps/inbound"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#8cafae] hover:text-[#4e5f5f] dark:hover:text-[#9fbfbf]"
                                >
                                    Descope Console
                                </Link>
                                .
                            </p>
                            <Card className={styles.card}>
                                <div className={styles.cardAccent}></div>
                                <CardContent className={styles.cardContent}>
                                    <div className="relative w-full rounded-lg flex items-center justify-center overflow-hidden bg-gray-900">
                                        <Image
                                            src="/creating_inbound_app.webp"
                                            alt="Descope Console showing the creation of a 10x CRM Inbound App with name and description fields"
                                            width={1000}
                                            height={500}
                                            className="w-full object-contain"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Step 2 */}
                        <div className="mb-6">
                            <div className="flex items-start gap-2 mb-2">
                                <div
                                    className="flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold mt-1 bg-[#8cafae] dark:bg-[#4e5f5f]"
                                >
                                    2
                                </div>
                                <h3 className={styles.cardTitle}>Defining CRM-Specific OAuth Scopes</h3>
                            </div>
                            <p className={styles.cardDescription}>
                                For our 10x CRM, we defined granular scopes to control access to different parts of the application. We
                                created
                                <code className={styles.primaryScope}>
                                    <span className={styles.scopeText}>contacts:read</span>
                                </code> and
                                <code className={styles.primaryScope}>
                                    <span className={styles.scopeText}>deals:read</span>
                                </code> scopes, with clear
                                descriptions of what they allow.
                            </p>
                            <Card className={styles.card}>
                                <div className={styles.cardAccent}></div>
                                <CardContent className={styles.cardContent}>
                                    <div className="relative w-full rounded-lg flex items-center justify-center overflow-hidden bg-gray-900">
                                        <Image
                                            src="/descope_scopes_config.webp"
                                            alt="Descope Console showing OAuth scopes configuration for CRM permissions"
                                            width={900}
                                            height={450}
                                            className="w-full object-contain"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Step 3 */}
                        <div className="mb-6">
                            <div className="flex items-start gap-2 mb-2">
                                <div
                                    className="flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold mt-1 bg-[#8cafae] dark:bg-[#4e5f5f]"
                                >
                                    3
                                </div>
                                <h3 className={styles.cardTitle}>Designing the 10x CRM Consent Flow</h3>
                            </div>
                            <p className={styles.cardDescription}>
                                We designed a user-friendly consent flow that clearly explains to users what permissions they're
                                granting to third-party applications. The flow first checks if the user is logged in, then presents a
                                consent screen that describes the scopes the application is requesting access to.
                            </p>
                            <Card className={styles.card}>
                                <div className={styles.cardAccent}></div>
                                <CardContent className={styles.cardContent}>
                                    <div className="relative w-full rounded-lg flex items-center justify-center overflow-hidden bg-gray-900">
                                        <Image
                                            src="/consent.webp"
                                            alt="Descope Console showing OAuth consent flow configuration with authentication and authorization steps"
                                            width={1000}
                                            height={400}
                                            className="w-full object-contain"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Implementation in the CRM App */}
                        <Card className={`${styles.card} mb-12`}>
                            <div className={styles.cardAccent}></div>
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className={styles.cardTitle}>How We Protected the 10x CRM API Endpoints</CardTitle>
                            </CardHeader>
                            <CardContent className={styles.oauthCardContent}>
                                <p className={styles.oauthDescription}>
                                    After setting up our Inbound App in the Descope Console, we implemented the necessary code in our 10x CRM
                                    application to validate tokens and enforce scope-based permissions:
                                </p>
                                <div className={styles.oauthSection}>
                                    <div className={styles.oauthItem}>
                                        <CheckCircle2 className={`${styles.oauthIcon} text-[#8cafae] dark:text-[#4e5f5f]`} />
                                        <div className={styles.oauthItemContent}>
                                            <h3 className={styles.oauthItemTitle}>OAuth Middleware for CRM API Protection</h3>
                                            <p className={styles.oauthItemText}>
                                                We implemented a custom OAuth middleware that validates JWT tokens issued by Descope, extracts
                                                the scopes, and ensures that API requests have the necessary permissions.
                                            </p>
                                            <div className={styles.oauthCodeBlock}>
                                                <pre className={styles.oauthCode}>
                                                    <code>{`// OAuth middleware for 10x CRM API protection
import { NextRequest, NextResponse } from "next/server"
import descopeSdk from '@descope/node-sdk'

export function withOAuth(handler, requiredScopes = []) {
  return async function (req: NextRequest) {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 })
    }

    try {
      const validationResponse = await sdk.validateSession(token)
      const scopes = (validationResponse.token.scope as string).split(' ')

      if (requiredScopes.some(scope => !scopes.includes(scope))) {
        return NextResponse.json({
          error: 'Insufficient permissions',
          requiredScopes
        }, { status: 403 })
      }

      return handler(req, { scopes })
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  }
}`}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.oauthItem}>
                                        <CheckCircle2 className={`${styles.oauthIcon} text-[#8cafae] dark:text-[#4e5f5f]`} />
                                        <div className={styles.oauthItemContent}>
                                            <h3 className={styles.oauthItemTitle}>Protected CRM API Routes</h3>
                                            <p className={styles.oauthItemText}>
                                                We applied the OAuth middleware to our CRM API routes, ensuring that each endpoint requires the
                                                appropriate scopes. For example, the contacts API requires the "contacts:read" scope for GET
                                                requests.
                                            </p>
                                            <div className={styles.oauthCodeBlock}>
                                                <pre className={styles.oauthCode}>
                                                    <code>{`// Example protected CRM API route
export const GET = withOAuth(
  async (req, context) => {
    // Your API logic here
    return NextResponse.json({ data: "Your response" })
  },
  ["contacts:read"]
)`}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Call to Action */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaContainer}>
                        <div className={styles.ctaContent}>
                            <h2 className={styles.ctaTitle}>Ready to Secure Your APIs?</h2>
                            <p className={styles.ctaDescription}>
                                Follow our implementation guide to create your own secure, OAuth-enabled CRM application with Descope.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link href="https://docs.descope.com/inbound-apps" target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" className={styles.ctaButtonSignUp}>
                                        Read the Documentation
                                        <ExternalLink className={styles.ctaArrow} />
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button size="lg" className={styles.ctaButtonSignUp}>
                                        Explore the 10x CRM Demo
                                        <ArrowRight className={styles.ctaArrow} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
