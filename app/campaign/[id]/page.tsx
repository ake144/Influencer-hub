
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, Users, Clock, BarChart } from 'lucide-react'
import ApplyForm from '@/components/applyForm'
import { Navbar } from "@/components/navbar"

// Mock campaign data
const campaignData = {
  id: '1',
  title: 'Summer Fashion Collection Launch',
  brand: 'StyleCo',
  brandLogo: '/placeholder.svg?height=50&width=50',
  description: "We're looking for fashion-forward influencers to showcase our new summer collection. Your unique style and engaged audience will help us reach fashion enthusiasts across the platform",
  requirements: [
    'Minimum 10,000 followers',
    'Fashion or lifestyle focus',
    'High engagement rate (>3%)',
    'Ability to create both photo and video content'
  ],
  budget: {
    total: 10000,
    perPost: 500
  },
  timeline: {
    applicationDeadline: '2024-06-15',
    campaignStart: '2024-07-01',
    campaignEnd: '2024-07-31'
  },
  metrics: {
    totalReach: 500000,
    engagementRate: 4.2,
    applicants: 75
  }
}

export default async function CampaignPage({ 
  
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const slug = (await params).id


  
 

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={campaignData.brandLogo} alt={campaignData.brand} />
              <AvatarFallback>{campaignData.brand[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{campaignData.title}</h1>
              <p className="text-muted-foreground">by {campaignData.brand}</p>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{campaignData.description}</p>
              <div>
                <h3 className="font-semibold mb-2">Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {campaignData.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Total Reach</span>
                </div>
                <span className="font-semibold">{campaignData.metrics.totalReach.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <span>Engagement Rate</span>
                </div>
                <span className="font-semibold">{campaignData.metrics.engagementRate}%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Applicants</span>
                  <span className="font-semibold">{campaignData.metrics.applicants}</span>
                </div>
                <Progress value={33} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Total Budget</span>
                </div>
                <span className="font-semibold">${campaignData.budget.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Per Post</span>
                </div>
                <span className="font-semibold">${campaignData.budget.perPost}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Application Deadline</span>
                </div>
                <span className="font-semibold">{campaignData.timeline.applicationDeadline}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Campaign Duration</span>
                </div>
                <span className="font-semibold">
                  {campaignData.timeline.campaignStart} - {campaignData.timeline.campaignEnd}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Apply for This Campaign</CardTitle>
              <CardDescription>Fill out the form below to submit your application</CardDescription>
            </CardHeader>
            <CardContent>
                   <ApplyForm />
            </CardContent>
            <CardFooter>

            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}