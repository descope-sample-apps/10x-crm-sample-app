import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileCode, BookOpen, Plug, Database, Users, DollarSign, Lock, Info } from "lucide-react"
import Image from "next/image"
import { styles } from "@/app/styles"

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <main className="flex-1">
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                10x CRM with Descope Inbound Apps
              </h1>
              <p className={styles.heroDescription}>
                A demonstration of how to turn your application into an OAuth identity provider.
              </p>
              <div className={`mt-2 ${styles.ctaButtons}`}>
                <Link
                  href="https://github.com/descope-sample-apps/10x-crm-sample-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className={styles.ctaButtonPrimary}
                  >
                    <div className={styles.githubButtonContent}>
                      <div className={styles.githubIcon}>
                        <Image src="/github-mark-white.svg" alt="GitHub" fill />
                      </div>
                      <span>GitHub Repo</span>
                    </div>
                  </Button>
                </Link>
                <Link
                  href="/how-it-works"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className={styles.ctaButtonPrimary}
                  >
                    <div className={styles.githubButtonContent}>
                      <span>How It Works</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className={styles.mainSection}>
          <div className={styles.contentContainer}>
            <div className={styles.mainGrid}>
              {/* Left Column with What is an Inbound App and Resources */}
              <div className={styles.leftColumn}>
                {/* What is an Inbound App Card */}
                <Card className={styles.card}>
                  <div className={styles.cardAccent}></div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>About 10x CRM</h2>
                    <p className={styles.cardDescription}>
                      This is a sample application to showcase how you can turn your app into an OAuth identity provider while leaving the heavy-lifting of authentication, scopes and permissions, and token management to us.
                    </p>
                  </div>
                </Card>

                {/* Resources & Tools Card */}
                <Card className={styles.card}>
                  <div className={styles.cardAccent}></div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>
                      Resources & Tools
                    </h3>
                    <p className={styles.cardDescription}>
                      Explore these resources to learn more about Descope's Inbound Apps and how to integrate them into
                      your own applications.
                    </p>

                    <div className={styles.resourceGrid}>
                      <Link
                        href="https://www.postman.com/descope-devrel/agentic-auth-hub/collection/sk20i9u/10x-crm?action=share"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className={styles.resourceButton}
                        >
                          <div className={styles.resourceIconContainer}>
                            <FileCode className={styles.resourceIcon} />
                          </div>
                          <span className={styles.resourceTitle}>Postman Collection</span>
                          <span className={styles.resourceSubtitle}>Test the APIs with Auth</span>
                        </Button>
                      </Link>

                      <Link href="https://connectedagent.app/" target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          className={styles.resourceButton}
                        >
                          <div className={styles.resourceIconContainer}>
                            <Plug className={styles.resourceIcon} />
                          </div>
                          <span className={styles.resourceTitle}>Connected Agent</span>
                          <span className={styles.resourceSubtitle}>AI Agent connecting to 10x CRM</span>
                        </Button>
                      </Link>

                      <Link href="/dashboard">
                        <Button
                          variant="outline"
                          className={styles.resourceButton}
                        >
                          <div className={styles.resourceIconContainer}>
                            <Database className={styles.resourceIcon} />
                          </div>
                          <span className={styles.resourceTitle}>10x CRM</span>
                          <span className={styles.resourceSubtitle}>See where the data comes from</span>
                        </Button>
                      </Link>

                      <Link href="https://docs.descope.com/inbound-apps" target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          className={styles.resourceButton}
                        >
                          <div className={styles.resourceIconContainer}>
                            <BookOpen className={styles.resourceIcon} />
                          </div>
                          <span className={styles.resourceTitle}>Documentation</span>
                          <span className={styles.resourceSubtitle}>Inbound Apps Documentation</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>

              {/* APIs & OAuth Scopes Column */}
              <div className="flex flex-col">
                <Card className={styles.card}>
                  <div className={styles.cardAccent}></div>
                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>APIs & OAuth Scopes</h2>
                    <p className={styles.cardDescription}>
                      The 10x CRM exposes RESTful APIs protected by OAuth 2.0 scopes. Third-party applications can
                      request specific permissions to access different parts of the CRM.
                    </p>

                    {/* Scope explanation */}
                    <div className={styles.infoBox}>
                      <Info className={styles.infoIcon} />
                      <p className={styles.infoText}>
                        <span className="font-medium">OAuth Scopes</span> define the specific permissions that a
                        third-party application can request. Each API endpoint requires one or more scopes for access.
                      </p>
                    </div>

                    <div className="space-y-4 md:space-y-5">
                      <Card className={styles.apiCard}>
                        <CardHeader className={styles.apiHeader}>
                          <CardTitle className={styles.apiTitle}>
                            <Users className={styles.apiIcon} />
                            Contacts API
                          </CardTitle>
                        </CardHeader>
                        <CardContent className={styles.apiContent}>
                          <div className="space-y-3">
                            <div className={styles.apiEndpoint}>
                              <div className={styles.apiEndpointContent}>
                                <div>
                                  <div className={styles.apiMethod}>GET /contacts</div>
                                  <div className={styles.apiDescription}>List all contacts</div>
                                </div>
                                <div className={styles.scopeContainer}>
                                  <div className={styles.primaryScope}>
                                    <Lock className={styles.scopeIcon} />
                                    <span className={styles.scopeText}>contacts:read</span>
                                  </div>
                                  <div className={styles.optionalScope}>
                                    <Lock className={styles.optionalScopeIcon} />
                                    <span className={styles.optionalScopeText}>Optional: deals:read</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.apiEndpoint}>
                              <div className={styles.apiEndpointContent}>
                                <div>
                                  <div className={styles.apiMethod}>GET /contacts/&#123;id&#125;</div>
                                  <div className={styles.apiDescription}>Get a contact by id</div>
                                </div>
                                <div className={styles.scopeContainer}>
                                  <div className={styles.primaryScope}>
                                    <Lock className={styles.scopeIcon} />
                                    <span className={styles.scopeText}>contacts:read</span>
                                  </div>
                                  <div className={styles.optionalScope}>
                                    <Lock className={styles.optionalScopeIcon} />
                                    <span className={styles.optionalScopeText}>Optional: deals:read</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className={styles.apiCard}>
                        <CardHeader className={styles.apiHeader}>
                          <CardTitle className={styles.apiTitle}>
                            <DollarSign className={styles.apiIcon} />
                            Deals API
                          </CardTitle>
                        </CardHeader>
                        <CardContent className={styles.apiContent}>
                          <div className="space-y-3">
                            <div className={styles.apiEndpoint}>
                              <div className={styles.apiEndpointContent}>
                                <div>
                                  <div className={styles.apiMethod}>GET /deals</div>
                                  <div className={styles.apiDescription}>List all deals</div>
                                </div>
                                <div className={styles.scopeContainer}>
                                  <div className={styles.primaryScope}>
                                    <Lock className={styles.scopeIcon} />
                                    <span className={styles.scopeText}>deals:read</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.apiEndpoint}>
                              <div className={styles.apiEndpointContent}>
                                <div>
                                  <div className={styles.apiMethod}>GET /deals/&#123;id&#125;</div>
                                  <div className={styles.apiDescription}>Get a deal by id</div>
                                </div>
                                <div className={styles.scopeContainer}>
                                  <div className={styles.primaryScope}>
                                    <Lock className={styles.scopeIcon} />
                                    <span className={styles.scopeText}>deals:read</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Integrate Your Own Inbound App?</h2>
              <p className={styles.ctaDescription}>
                Get started with Descope today and transform your application into a secure OAuth provider.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="https://www.descope.com/use-cases/ai?utm_source=inbound-apps-demo&utm_medium=referral&utm_campaign=inbound-apps-demo" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" className={styles.ctaButtonSignUp}>
                    Sign Up for Descope
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
