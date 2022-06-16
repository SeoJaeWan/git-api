import { useCallback, useEffect, useState } from "react";
import { Octokit } from "octokit";

const ONER = "SeoJaeWan";
const REPO = "git-api";

const octokit = new Octokit({
  auth: process.env.AUTH,
});

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
  }, [getPRDataHandler]);

  return (
    <div className="Home">
      <h1>
        {ONER} {REPO}
      </h1>
      {data.map((info, idx) => {
        return (
          <div key={idx}>
            <p>작성자 : {info.user.login}</p>
            <p>리뷰 : {info.body}</p>
            <p>리뷰 경로 : {info.path}</p>
            <a href={info._links.html.href} target="_blank" rel="noreferrer">
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
