// import { Button } from "@/components/ui/button"

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BicepsFlexed, CircleDollarSign, Earth } from "lucide-react";

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
                <div className="w-full flex flex-col justify-center items-center gap-6">
                    <h1 className="font-bold text-6xl">Welcome to WebArena</h1>
                    <h1 className="font-medium text-base text-center w-full">WebArena is your go-to platform for acing Front End interviews! Whether you're preparing for React or JavaScript-focused interviews, we've got you covered with a curated collection of practice problems designed to sharpen your skills and boost your confidence.</h1>
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                    {
                        cardData.map((entry, index) => (
                            <Card key={`homepage-card-${index}`} className="text-gray-700">
                                <CardTitle>
                                    <div className="flex gap-2 items-center px-6 pt-6 text-xl">
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
        </div>
    )
}