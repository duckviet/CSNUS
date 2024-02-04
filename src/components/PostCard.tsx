import Link from "next/link";
import { title } from "process";

type HandleProps = {
  side: string;
  img: string;
  tittle: string;
  content: string;
};

const PostCard: React.FC<HandleProps> = ({ side, img, tittle, content }) => {
  return (
    <div className="card bg-base-100 shadow-xl border">
      <div>
        <img src={img} alt="Movie" />
      </div>
      <div className="card-body">
        <h2 className="card-title">{tittle}</h2>
        <p>{content}</p>
        <div className="card-actions justify-end">
          <Link href={side} className="hover:underline">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
