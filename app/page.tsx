'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Users, BarChart, DollarSign, Megaphone } from 'lucide-react'
import Link from 'next/link';
import { Navbar } from '@/components/navbar'

export default function LandingPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar  />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  Connect Brands with Micro-Influencers
                </h1>
                <p className={`mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 transition-all duration-500 delay-100 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  Empower your marketing campaigns with authentic voices. Find the perfect micro-influencers for your brand.
                </p>
              </div>
              <div className={`space-x-4 transition-all duration-500 delay-200 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
               <Link  href='/campaign'>
                    <Button>Get Started</Button>
               </Link>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Key Features</h2>
            <Tabs defaultValue="businesses" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="businesses">For Businesses</TabsTrigger>
                <TabsTrigger value="influencers">For Influencers</TabsTrigger>
              </TabsList>
              <TabsContent value="businesses">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <Users className="h-6 w-6 text-blue-500" />
                      <h3 className="text-xl font-bold">Find the Perfect Match</h3>
                    </div>
                    <p>Discover micro-influencers that align perfectly with your brand values and target audience.</p>
                    <div className="flex items-center space-x-4">
                      <BarChart className="h-6 w-6 text-green-500" />
                      <h3 className="text-xl font-bold">Campaign Analytics</h3>
                    </div>
                    <p>Track the performance of your campaigns with detailed analytics and insights.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="influencers">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <DollarSign className="h-6 w-6 text-yellow-500" />
                      <h3 className="text-xl font-bold">Monetize Your Influence</h3>
                    </div>
                    <p>Connect with brands that value your unique voice and audience. Turn your passion into profit.</p>
                    <div className="flex items-center space-x-4">
                      <CheckCircle className="h-6 w-6 text-purple-500" />
                      <h3 className="text-xl font-bold">Verified Opportunities</h3>
                    </div>
                    <p>Work with vetted brands on campaigns that match your style and values.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section id="for-businesses" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">For Businesses</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Harness the power of authentic voices to amplify your brand message. Our platform connects you with
                  micro-influencers who can reach your target audience effectively.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Access a diverse pool of micro-influencers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Create and manage targeted campaigns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Measure ROI with detailed analytics</span>
                  </li>
                </ul>
                <Button>Start Your Campaign</Button>
              </div>
              <div className="lg:order-first">
                <img
                  alt="Business dashboard"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="/placeholder.svg?height=310&width=550"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="for-influencers" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">For Influencers</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Turn your passion into a profession. Our platform helps you connect with brands that value your unique voice
                  and audience, allowing you to monetize your influence authentically.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Find campaigns that match your niche</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Collaborate with reputable brands</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Grow your influence and earnings</span>
                  </li>
                </ul>
                <Button>Join as an Influencer</Button>
              </div>
              <div>
                <img
                  alt="Influencer profile"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="/placeholder.svg?height=310&width=550"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              What Our Users Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    "This platform has revolutionized our influencer marketing strategy. We've seen a 200% increase in
                    engagement since we started using it."
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      alt="Avatar"
                      className="rounded-full"
                      height="40"
                      src="/placeholder.svg?height=40&width=40"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                    <div>
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director, TechCo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    "As a micro-influencer, this app has opened up so many opportunities for me. I'm now able to work with
                    brands I truly believe in."
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      alt="Avatar"
                      className="rounded-full"
                      height="40"
                      src="/placeholder.svg?height=40&width=40"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                    <div>
                      <p className="text-sm font-medium">Alex Chen</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Lifestyle Influencer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-500 dark:text-gray-400">
                    "The analytics provided by this platform have been invaluable. We can now measure the true impact of our
                    influencer campaigns."
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      alt="Avatar"
                      className="rounded-full"
                      height="40"
                      src="/placeholder.svg?height=40&width=40"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                    <div>
                      <p className="text-sm font-medium">Emily Rodriguez</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">CEO, BeautyBrand</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Marketing?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our platform today and start connecting with the right influencers or brands for your next campaign.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Sign Up Now</Button>
                <Button variant="outline">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Micro Influencer Hub. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}