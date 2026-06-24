import Image from "next/image"

const HERO_MENU_BANNER_SRC = "/images/logo/uper-art-png%20(1).webp"

export function HeroMenuBanner() {
  return (
    <section className="w-full bg-background border-b border-border">
      <div className="relative w-full overflow-hidden">
        <Image
          src={HERO_MENU_BANNER_SRC}
          alt="Warriors Defence Academy"
          width={1920}
          height={360}
          className="w-full h-auto max-h-[min(42vh,420px)] sm:max-h-[min(48vh,480px)] object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
    </section>
  )
}
