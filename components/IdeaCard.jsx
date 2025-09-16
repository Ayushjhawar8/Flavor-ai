import Image from "next/image";
import Link from "next/link";
import { PlusIcon } from "./Icons";

// A reusable card for Idea Hub entries
export default function IdeaCard({ idea }) {
  return (
    <div className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {idea.image && (
        <figure className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={idea.image}
            alt={idea.title}
            width={384}
            height={216}
            className="w-full h-48 object-cover"
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title text-lg md:text-xl text-base-content flex items-center gap-2">
          <PlusIcon /> {idea.title}
        </h2>
        <p className="text-sm leading-snug">{idea.description}</p>
        <p className="text-xs opacity-70">by {idea.username}</p>
        <div className="card-actions justify-end pt-2">
          <Link href={idea.issueUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-primary btn-sm md:btn-md">View GitHub Issue ↗</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
