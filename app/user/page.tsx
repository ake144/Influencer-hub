'use client'

import { useState } from 'react'
import { Instagram, Youtube, Twitter, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function InfluencerProfile() {
  const [activeTab, setActiveTab] = useState('posts')

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <header className="py-6 px-4 md:px-6 lg:px-8">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">Influencer Name</h1>
          <Button variant="outline">Hire Me</Button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <section className="grid md:grid-cols-3 gap-8 items-start">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Influencer Name"
                  className="rounded-full w-24 h-24 object-cover"
                />
                <div>
                  <CardTitle className="text-2xl">Influencer Name</CardTitle>
                  <CardDescription>@influencer_handle</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Passionate content creator specializing in lifestyle, travel, and tech. With over 5 years of experience,
                I've collaborated with top brands to create engaging content that resonates with my audience.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Youtube className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt>Total Followers:</dt>
                  <dd className="font-semibold">1.2M</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Avg. Engagement Rate:</dt>
                  <dd className="font-semibold">5.7%</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Content Created:</dt>
                  <dd className="font-semibold">500+</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Content Categories</h2>
          <div className="flex flex-wrap gap-2">
            {['Lifestyle', 'Travel', 'Tech', 'Fashion', 'Food'].map((category) => (
              <span key={category} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {category}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="posts">Recent Posts</TabsTrigger>
              <TabsTrigger value="collaborations">Past Collaborations</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {[1, 2, 3, 4, 5, 6].map((post) => (
                  <Card key={post}>
                    <img
                      src={`/placeholder.svg?height=200&width=300&text=Post+${post}`}
                      alt={`Post ${post}`}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Post Title {post}</h3>
                      <p className="text-sm text-muted-foreground">
                        A brief description of the post content goes here...
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="collaborations">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {['Brand A', 'Brand B', 'Brand C', 'Brand D'].map((brand) => (
                  <Card key={brand}>
                    <CardHeader>
                      <CardTitle>{brand}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Collaborated on a successful campaign that reached over 500k users and increased engagement by 25%.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Contact Me</CardTitle>
              <CardDescription>Interested in working together? Send me a message!</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Your Email" type="email" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Your Message" />
                <Button type="submit">
                  <Mail className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="mt-16 py-6 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2023 Influencer Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}