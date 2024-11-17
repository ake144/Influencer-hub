'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bell, DollarSign, Users, Briefcase, MessageSquare, PieChart, Settings, User } from 'lucide-react'
import Link from 'next/link'

// Dummy data for demonstration
const influencerData = {
  name: "Alex Chen",
  avatar: "/placeholder.svg?height=50&width=50",
  earnings: 5280,
  followers: 25000,
  engagementRate: 3.2,
  activeProposals: 3,
  recentCampaigns: [
    { id: 1, brand: "TechGadget", status: "In Progress", earnings: 800 },
    { id: 2, brand: "FitLife", status: "Completed", earnings: 1200 },
    { id: 3, brand: "EcoFriendly", status: "Pending Approval", earnings: 0 },
  ],
  messages: [
    { id: 1, from: "TechGadget", preview: "Hey Alex, we loved your last post!" },
    { id: 2, from: "FitLife", preview: "Can we schedule a call to discuss the next campaign?" },
  ]
}

const businessData = {
  name: "InnovateTech",
  avatar: "/placeholder.svg?height=50&width=50",
  activeCampaigns: 2,
  totalReach: 150000,
  budget: 10000,
  engagementRate: 4.5,
  ongoingCampaigns: [
    { id: 1, influencer: "Alex Chen", status: "In Progress", reach: 25000, engagement: 3.2 },
    { id: 2, influencer: "Sarah Lee", status: "Scheduled", reach: 40000, engagement: 4.8 },
  ],
  topInfluencers: [
    { id: 1, name: "Alex Chen", followers: 25000, engagementRate: 3.2 },
    { id: 2, name: "Sarah Lee", followers: 40000, engagementRate: 4.8 },
    { id: 3, name: "John Doe", followers: 35000, engagementRate: 3.9 },
  ]
}

export default function Dashboard() {
  const [userType, setUserType] = useState<'influencer' | 'business'>('influencer')

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Link href='/user/profile'  >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>
      <Tabs defaultValue={userType} onValueChange={(value) => setUserType(value as 'influencer' | 'business')}>
        <TabsList>
          <TabsTrigger value="influencer">Influencer View</TabsTrigger>
          <TabsTrigger value="business">Business View</TabsTrigger>
        </TabsList>
        <TabsContent value="influencer" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${influencerData.earnings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{influencerData.followers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{influencerData.engagementRate}%</div>
                <p className="text-xs text-muted-foreground">+0.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{influencerData.activeProposals}</div>
                <p className="text-xs text-muted-foreground">2 new this week</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {influencerData.recentCampaigns.map(campaign => (
                    <div key={campaign.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt={campaign.brand} />
                        <AvatarFallback>{campaign.brand[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{campaign.brand}</p>
                        <p className="text-sm text-muted-foreground">
                          {campaign.status}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {campaign.earnings > 0 ? `$${campaign.earnings}` : '-'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                  You have {influencerData.messages.length} unread messages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {influencerData.messages.map(message => (
                    <div key={message.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt={message.from} />
                        <AvatarFallback>{message.from[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{message.from}</p>
                        <p className="text-sm text-muted-foreground">
                          {message.preview}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="business" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessData.activeCampaigns}</div>
                <p className="text-xs text-muted-foreground">2 scheduled to start next week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessData.totalReach.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${businessData.budget.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+5.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Engagement Rate</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessData.engagementRate}%</div>
                <p className="text-xs text-muted-foreground">+0.5% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Ongoing Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {businessData.ongoingCampaigns.map(campaign => (
                    <div key={campaign.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt={campaign.influencer} />
                        <AvatarFallback>{campaign.influencer[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{campaign.influencer}</p>
                        <p className="text-sm text-muted-foreground">
                          {campaign.status}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {campaign.reach.toLocaleString()} reach
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Performing Influencers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {businessData.topInfluencers.map(influencer => (
                    <div key={influencer.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" alt={influencer.name} />
                        <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{influencer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {influencer.followers.toLocaleString()} followers
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {influencer.engagementRate}% engagement
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}