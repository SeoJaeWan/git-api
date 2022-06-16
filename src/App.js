import { Octokit, App } from "https://cdn.skypack.dev/octokit";
import { useCallback, useEffect, useState } from "react";

const octokit = new Octokit({
  auth: process.env.AUTH,
});

const ONER = "SeoJaeWan";
const REPO = "git-api";

function Home() {
  const [data, setData] = useState([]);

  const getPRDataHandler = useCallback(async () => {
    // https://docs.github.com/en/rest/pulls/comments#about-the-pull-request-review-comments-api
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/comments",
      {
        owner: ONER,
        repo: REPO,
      }
    );

    setData(data);
  }, []);

  useEffect(() => {
    getPRDataHandler();
  }, []);

  return (
    <div className="Home">
      <h1>
        {ONER} {REPO}
      </h1>
      {data?.map((info) => {
        return (
          <div>
            <p>작성자 : {info.user.login}</p>
            <p>리뷰 : {info.body}</p>
            <p>리뷰 경로 : {info.path}</p>
            <a href={info._links.html.href} target="_blank">
              바로가기
            </a>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
