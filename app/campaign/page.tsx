'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users } from 'lucide-react'
import { Navbar } from '@/components/navbar'

// Mock data for available campaigns
const campaigns = [
  {
    id: '1',
    title: 'Summer Fashion Collection Launch',
    brand: 'StyleCo',
    brandLogo: '/placeholder.svg?height=40&width=40',
    category: 'Fashion',
    budget: 10000,
    applicants: 75,
    deadline: '2024-06-15',
  },
  {
    id: '2',
    title: 'Healthy Lifestyle Challenge',
    brand: 'FitnessPro',
    brandLogo: '/placeholder.svg?height=40&width=40',
    category: 'Health & Fitness',
    budget: 8000,
    applicants: 62,
    deadline: '2024-06-30',
  },
  {
    id: '3',
    title: 'Tech Gadget Review Series',
    brand: 'TechWorld',
    brandLogo: '/placeholder.svg?height=40&width=40',
    category: 'Technology',
    budget: 15000,
    applicants: 103,
    deadline: '2024-07-10',
  },
  {
    id: '4',
    title: 'Eco-Friendly Product Showcase',
    brand: 'GreenLiving',
    brandLogo: '/placeholder.svg?height=40&width=40',
    category: 'Lifestyle',
    budget: 7500,
    applicants: 48,
    deadline: '2024-07-05',
  },
  {
    id: '5',
    title: 'Gourmet Cooking Challenge',
    brand: 'ChefMaster',
    brandLogo: '/placeholder.svg?height=40&width=40',
    category: 'Food & Beverage',
    budget: 12000,
    applicants: 89,
    deadline: '2024-06-25',
  },
]

export default function CampaignList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === '' || campaign.category === categoryFilter)
  )

  return (
    <div className="container mx-auto px-4 py-8">

        <Navbar  />
      <h1 className="text-3xl font-bold mb-6 my-6">Available Campaigns</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-1/2"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="sm:w-1/2">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Lifestyle">Lifestyle</SelectItem>
            <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCampaigns.map(campaign => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={campaign.brandLogo} alt={campaign.brand} />
                  <AvatarFallback>{campaign.brand[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                  <CardDescription>{campaign.brand}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <Badge>{campaign.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  {campaign.applicants} applicants
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                  Budget: ${campaign.budget.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  Deadline: {campaign.deadline}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/campaign/${campaign.id}`} passHref className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No campaigns found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}