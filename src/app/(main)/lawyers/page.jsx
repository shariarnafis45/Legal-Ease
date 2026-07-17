// app/lawyers/page.js
import React from "react";
import LawyersClientWrapper from "./LawyersClientWrapper";

export const metadata = {
  title: "Browse Lawyers | LegalEase",
  description: "Explore verified legal experts and find the right lawyer for your needs.",
};

export default function LawyersPage() {
  // Mock Data: পরবর্তীতে এখানে ডাটাবেজ থেকে ডাটা নিয়ে আসবেন
  const lawyersData = [
    {
      _id: "1",
      name: "John Anderson",
      email: "john@example.com",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
      specialization: { name: "Corporate Law", slug: "corporate-law" },
      bio: "Experienced corporate lawyer helping businesses with global contracts.",
      fee: { amount: 120, currency: "USD" },
      experience: 8,
      rating: 4.9,
      totalReviews: 120,
      totalHires: 380,
      location: "New York, USA",
      verified: true,
      status: "Available",
      dateJoined: "2023-05-12T00:00:00.000Z",
    },
    {
      _id: "2",
      name: "Sarah Mitchell",
      email: "sarah@example.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
      specialization: { name: "Family Law", slug: "family-law" },
      bio: "Compassionate family counsel specializing in complex mediation.",
      fee: { amount: 90, currency: "USD" },
      experience: 6,
      rating: 4.8,
      totalReviews: 98,
      totalHires: 240,
      location: "Chicago, USA",
      verified: true,
      status: "Available",
      dateJoined: "2024-01-18T00:00:00.000Z",
    },
    {
      _id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
      specialization: { name: "Criminal Law", slug: "criminal-law" },
      bio: "Aggressive state and federal criminal defense trial lawyer.",
      fee: { amount: 150, currency: "USD" },
      experience: 10,
      rating: 4.9,
      totalReviews: 150,
      totalHires: 410,
      location: "Los Angeles, USA",
      verified: true,
      status: "Busy",
      dateJoined: "2022-11-05T00:00:00.000Z",
    },
    {
      _id: "4",
      name: "Emily Johnson",
      email: "emily@example.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
      specialization: { name: "Immigration Law", slug: "immigration-law" },
      bio: "Assisting international individuals navigate complex visa structures.",
      fee: { amount: 100, currency: "USD" },
      experience: 5,
      rating: 4.7,
      totalReviews: 86,
      totalHires: 190,
      location: "Miami, USA",
      verified: true,
      status: "Available",
      dateJoined: "2024-06-22T00:00:00.000Z",
    },
    {
      _id: "5",
      name: "David Wilson",
      email: "david@example.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
      specialization: { name: "Real Estate Law", slug: "real-estate" },
      bio: "Property compliance supervisor auditing deeds.",
      fee: { amount: 110, currency: "USD" },
      experience: 7,
      rating: 4.9,
      totalReviews: 130,
      totalHires: 310,
      location: "Houston, USA",
      verified: true,
      status: "Busy",
      dateJoined: "2023-09-14T00:00:00.000Z",
    },
    {
      _id: "6",
      name: "Lisa Martinez",
      email: "lisa@example.com",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
      specialization: { name: "Employment Law", slug: "employment-law" },
      bio: "Dedicated advocate enforcing modern labor compliance.",
      fee: { amount: 130, currency: "USD" },
      experience: 9,
      rating: 4.9,
      totalReviews: 130,
      totalHires: 290,
      location: "Boston, USA",
      verified: true,
      status: "Available",
      dateJoined: "2023-02-28T00:00:00.000Z",
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
      <LawyersClientWrapper initialLawyers={lawyersData} />
    </main>
  );
}