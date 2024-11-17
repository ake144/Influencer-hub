'use client'

import { useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"

const ApplyForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [socialLink, setSocialLink] = useState('')
    const [pitch, setPitch] = useState('')
    
    const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log('Application submitted:', { name, email, socialLink, pitch })
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
            id="name" 
            placeholder="Your full name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
            id="email" 
            type="email" 
            placeholder="Your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="socialLink">Social Media Link</Label>
            <Input 
            id="socialLink" 
            placeholder="Your main social media profile URL" 
            value={socialLink}
            onChange={(e) => setSocialLink(e.target.value)}
            required
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="pitch">Why are you a good fit for this campaign?</Label>
            <Textarea 
            id="pitch" 
            placeholder="Tell us why you'd be great for this campaign" 
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            required
            />
        </div>
        <button type="submit" className="w-full bg-primary-500 text-white rounded-md py-2">Apply</button>
        <Button type="submit" onClick={handleSubmit}>Submit Application</Button>
        </form>
    )
    }

export default ApplyForm