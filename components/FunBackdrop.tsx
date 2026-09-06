"use client";

/**
 * Instant CSS playground behind the page — always visible even before WebGL boots.
 * Three.js scene mounts on top for the richer interaction.
 */
export default function FunBackdrop() {
  return (
    <div className="fun-backdrop" aria-hidden>
      <span className="fun-orb fun-orb-a" />
      <span className="fun-orb fun-orb-b" />
      <span className="fun-orb fun-orb-c" />
      <span className="fun-ring fun-ring-a" />
      <span className="fun-ring fun-ring-b" />
      <span className="fun-dot fun-dot-1" />
      <span className="fun-dot fun-dot-2" />
      <span className="fun-dot fun-dot-3" />
      <span className="fun-dot fun-dot-4" />
      <span className="fun-dot fun-dot-5" />
      <span className="fun-dot fun-dot-6" />
    </div>
  );
}
