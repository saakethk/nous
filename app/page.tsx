import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

      <div className="main_text flex flex-col items-center justify-center gap-4 py-8 md:py-10 dark:bg-black bg-white">
        <div className="inline-block max-w-xl text-center justify-center main_content">
          <span className={title()}>Introducing&nbsp;</span>
          <span className={title({ color: "blue" })}>Fred&nbsp;</span>
          <br />
          {/* <span className={title()}>
            
          </span> */}
          <div className={subtitle({ class: "mt-4" })}>
            A financial AI like no other
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/fred-ai"
          >
            See Fred in action
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href="https://github.com/saakethk/fred-ai"
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>
      </div>

      <div className="main_graphic" />
    </section>
  );
}
