"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const PARTICLE_COUNT = 6;
const PARTICLE_RADIUS = 24;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
  return {
    id: i,
    x: Math.cos(angle) * PARTICLE_RADIUS,
    y: Math.sin(angle) * PARTICLE_RADIUS,
  };
});

export const LikeButton: React.FC<{ slug: string }> = ({ slug }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const [burstId, setBurstId] = useState(0);

  useEffect(() => {
    fetch(`/api/like?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.likes);
        setLiked(data.liked);
      });
  }, [slug]);

  const toggleLike = async () => {
    if (pending) return;
    setPending(true);

    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      setLiked(data.liked);
      setLikes(data.likes);
      if (data.liked) {
        setBurstId((id) => id + 1);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      disabled={pending}
      title={liked ? "Unlike this post" : "Like this post"}
      className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
    >
      <span className="relative inline-flex">
        <motion.span
          key={liked ? "liked" : "unliked"}
          className="inline-flex"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
        </motion.span>

        {burstId > 0 && (
          <span key={burstId} className="pointer-events-none absolute inset-0">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="absolute w-1.5 h-1.5"
                style={{ left: "50%", top: "50%", marginLeft: -3, marginTop: -3 }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Heart className="w-1.5 h-1.5 fill-red-500 text-red-500" />
              </motion.span>
            ))}
          </span>
        )}
      </span>
      {Intl.NumberFormat("en-US", { notation: "compact" }).format(likes)}
    </button>
  );
};
