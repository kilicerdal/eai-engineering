import Image from "next/image";

/** Decorative original artwork; the section's heading and controls remain real HTML. */
export default function StudyLandmark({ scene }: { scene: "giza" | "machu-picchu" | "stonehenge" }) {
  return <div className="studio-landmark-backdrop" aria-hidden="true">
    <Image src={`/images/study/${scene}-future.webp`} alt="" fill sizes="(min-width: 1440px) 1440px, 100vw" />
  </div>;
}
