import VARIABLE from "../config/env";

function Main() {
  return (
    <div className="text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">
        Which country are your fav artists from?
      </h1>
      <p className="text-sm">
        Sync your Spotify and get a map of where the artists you’re into are
        from
      </p>
      <br />
      <form action={VARIABLE.SERVER + "/api/v1/user/login"}>
        <button className="p-2 flex items-center bg-white text-black w-200 rounded-full font-semibold">
          <img
            width={30}
            height={30}
            src={
              "https://i0.wp.com/brandingforum.org/wp-content/uploads/2023/10/Spotify-logo-500x281-1.png?resize=500%2C281&ssl=1"
            }
            alt="spotify logo"
          />
          Connect Spotify
        </button>
      </form>
    </div>
  );
}

export default function Login() {
  return (
    <div className="App bg-black top-0 bottom-0 left-0 right-0 absolute flex justify-center items-center">
      <Main />
      <img
        src="https://s3-alpha-sig.figma.com/img/9786/7daa/ecb2506fdad3ad08974dfb8e6dc56da7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MBo4juGXo6iL-lIn4PrYIeKWR8qWqe1s2dmuwZ4YCx~YbNnsPC1T2jYB8T7rtWVVq345WFC531PNEmSGv-WmZ12aAYkwoa8bkc4PyLEbyOMsEOQdntaZfidFSqZTCRhAjw70AimDqv32MRjTGvMIm56e1-w2Ib6gE70p0KHaE78mN2Zww10VQzb4sr-F7Gdg~EqXHpc2dmZ2bJz3Iu6a2Vfsnu9uHDHjCiVdlGxPEK3X9NvBkTfQqElfGfwcDd3bkOPfY5~u~BlJzPHAbuan85G~B4TERrCkmeZllWTqgyaMzkDSXaoW~6ZUBa2ui0twPbEfC6S4eko5iTRlc7irOw"
        alt="earth"
      />
    </div>
  );
}
