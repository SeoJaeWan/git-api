import { Octokit, App } from "https://cdn.skypack.dev/octokit";

const octokit = new Octokit({
  auth: "personal-access-token123",
});

function Home() {
  const test = async () => {
    console.log(
      console.log(
        await octokit.request("GET /repos/{owner}/{repo}/pulls/comments", {
          owner: "SeoJaeWan",
          repo: "git-api",
        }),
        "ASDJKNAKSJD"
      )
    );
  };

  test();
  return <div className="Home">qwd</div>;
}

export default Home;
