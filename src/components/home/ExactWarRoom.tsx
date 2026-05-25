import Image from "next/image";
import { Link } from "@/i18n/navigation";

const externalLinks = {
  discord: "https://discord.gg/freearena",
  forum: "https://free-arena.ro",
  teamspeak: "ts3server://ts.free-arena.ro",
} as const;

export function ExactWarRoom() {
  return (
    <main className="exact-war-room">
      <section className="exact-war-room__poster" aria-label="FREE-ARENA.RO cinematic war room">
        <Image
          src="/assets/war-room/free-arena-storyboard.png"
          alt="FREE-ARENA.RO cinematic gaming portal with CS 1.6, CS2, Discord, TeamSpeak, Forum, and server status panels"
          width={1536}
          height={1024}
          priority
          sizes="100vw"
          className="exact-war-room__image"
        />

        <Link href="/servers/cs16" className="exact-war-room__hotspot exact-war-room__hotspot--top-cs16">
          <span className="sr-only">CS 1.6 server details</span>
        </Link>
        <Link href="/servers/cs2" className="exact-war-room__hotspot exact-war-room__hotspot--top-cs2">
          <span className="sr-only">CS2 server details</span>
        </Link>
        <a href={externalLinks.discord} target="_blank" rel="noreferrer" className="exact-war-room__hotspot exact-war-room__hotspot--top-discord">
          <span className="sr-only">Join Discord</span>
        </a>
        <a href={externalLinks.teamspeak} className="exact-war-room__hotspot exact-war-room__hotspot--top-ts3">
          <span className="sr-only">Connect TeamSpeak 3</span>
        </a>
        <a href={externalLinks.forum} target="_blank" rel="noreferrer" className="exact-war-room__hotspot exact-war-room__hotspot--top-forum">
          <span className="sr-only">Open FREE-ARENA forum</span>
        </a>

        <Link href="/servers/cs16" className="exact-war-room__hotspot exact-war-room__hotspot--gameplay">
          <span className="sr-only">Open CS 1.6 gameplay server</span>
        </Link>
        <Link href="/servers/cs16" className="exact-war-room__hotspot exact-war-room__hotspot--server-cs16">
          <span className="sr-only">Server CS 1.6 online</span>
        </Link>
        <Link href="/servers/cs2" className="exact-war-room__hotspot exact-war-room__hotspot--server-cs2">
          <span className="sr-only">Server CS2 standby</span>
        </Link>
        <a href={externalLinks.forum} target="_blank" rel="noreferrer" className="exact-war-room__hotspot exact-war-room__hotspot--bottom-forum">
          <span className="sr-only">Forum discussions</span>
        </a>
        <a href={externalLinks.discord} target="_blank" rel="noreferrer" className="exact-war-room__hotspot exact-war-room__hotspot--bottom-discord">
          <span className="sr-only">Discord join us</span>
        </a>
        <a href={externalLinks.teamspeak} className="exact-war-room__hotspot exact-war-room__hotspot--bottom-ts3">
          <span className="sr-only">TeamSpeak connect</span>
        </a>
      </section>
    </main>
  );
}
