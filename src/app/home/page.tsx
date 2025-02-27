// import { Button } from "@/components/ui/button"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BicepsFlexed, CircleDollarSign, Earth, Info } from "lucide-react";
import Link from "next/link";
import './index.css'

export default function HomePage() {
    const cardData = [
        {
            title: 'Free & Accessible',
            icon: CircleDollarSign,
            description: 'No subscriptions, no hassle—just start practicing right away!'
        },
        {
            title: 'Real-World Scenarios',
            icon: Earth,
            description: 'Tackle problems inspired by actual Front End interview questions.'
        },
        {
            title: 'Beginner to Advanced',
            icon: BicepsFlexed,
            description: 'Challenges for every skill level, from fundamentals to advanced topics.'
        },
    ]
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[50%] flex flex-col justify-center items-center gap-10">
                <div className="w-full flex flex-col justify-center items-start gap-6">
                    <h1 className="font-bold text-6xl">Welcome to WebArena</h1>
                    <h1 className="font-medium text-base w-full">{`WebArena is your go-to platform for acing Front End interviews! Whether you're preparing for React or JavaScript-focused interviews, we've got you covered with a curated collection of practice problems designed to sharpen your skills and boost your confidence.`}</h1>
                </div>
                <div>
                    <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
                    <div className="w-full grid grid-cols-3 gap-4">
                        {
                            cardData.map((entry, index) => (
                                <Card key={`homepage-card-${index}`} className="homepage-card text-gray-700">
                                    <CardTitle>
                                        <div className="flex gap-3 items-center px-6 pt-6 text-xl">
                                            <entry.icon />
                                            <span>{entry.title}</span>
                                        </div>
                                    </CardTitle>
                                    <CardContent>{entry.description}</CardContent>
                                </Card>          
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-4 pt-12 items-center">
                    <div className="flex gap-1 items-center">
                        <h4 className="">No setup or downloads—just pick a problem and write your solution directly in the editor.</h4>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info size={16}/>
                            </TooltipTrigger>
                            <TooltipContent side={'top'} sideOffset={8}>
                                <p className="max-w-48">Note: Clearing your browser cache will delete your existing code for problems</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Link href="/all-problems">
                        <Button className="w-fit">Get Started</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}