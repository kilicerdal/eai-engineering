import Image from "next/image";

/** Decorative original artwork; the section's heading and controls remain real HTML. */
export default function StudyLandmark({ scene }: { scene: "giza" | "machu-picchu" | "stonehenge" | "cappadocia" | "pantheon" }) {
  return <div className="studio-landmark-backdrop" aria-hidden="true">
    <Image src={scene === "giza" ? "/images/study/giza-learning-v2.webp" : `/images/study/${scene}-future.webp`} alt="" fill sizes={scene === "giza" ? "100vw" : "(min-width: 1440px) 1440px, 100vw"} />
  </div>;
}
