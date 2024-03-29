import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-neutral-200">
        <div className="container">
          <div className="flex-1">
            <Link href="/">
              <Image
                width={200}
                height={200}
                src="/pic/cs112-01.svg"
                alt="Home"
                className="w-10 h-10 object-fill"
              />
            </Link>
          </div>
          <div className="flex-none">
            <Link href="/about" className="btn btn-ghost">
              About us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
