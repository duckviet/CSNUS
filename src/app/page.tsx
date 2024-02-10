"use client";
import PostCard from "@/components/PostCard";

export default function Home() {
  interface List {
    id: number;
    app: string;
    image: string;
    title: string;
    content: string;
  }

  const myList: List[] = [
    {
      id: 1,
      app: "/knighttour",
      image: "pic/knight-01.svg",
      title: "The Knight's Tour",
      content: "Just a bonus assignment form MS thuonghtt",
    },
    {
      id: 2,
      app: "/puzzle",
      image: "pic/puzzle-01.svg",
      title: "8 Puzzle",
      content: "Just a bonus assignment form MS thuonghtt",
    },
    // Add more data items as needed
  ];

  return (
    <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {myList.map((route, index) => (
        <PostCard
          key={index}
          side={route.app}
          img={route.image}
          tittle={route.title}
          content={route.content}
        />
      ))}
    </main>
  );
}
