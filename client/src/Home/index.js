import React from "react";
import axios from "axios";
import s from "./index.module.scss";

export default function Home() {
  const input = React.useRef();
  const tbody = React.useRef();

  const [urls, setUrls] = React.useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (input.current.value) {
      let data = { url: input.current.value };
      res = await axios.post("http://localhost:5000/shorten/", data, {
        contentType: "application/json",
      });
      console.log(res);
      let shortenedUrl = res.data.shortenedUrl;
      setUrls([
        ...urls,
        {
          shortenedUrl: shortenedUrl,
          short: res.data.short,
          full: res.data.full,
          clicks: res.data.clicks,
        },
      ]);
    }
  };

  const displayUrls = () => {
    console.log(urls);
    return urls.map((url, idx) => (
      <tr key={idx}>
        <td>
          <a href={url.full}>{url.full}</a>
        </td>
        <td>
          <a href={"http://localhost:3000/go/" + url.short}>{url.short}</a>
        </td>
        <td>Clicks: {url.clicks}</td>
      </tr>
    ));
  };

  React.useEffect(() => {
    const getAllUrls = async () => {
      let res = await axios.get("http://localhost:5000/");
      let data = res.data;
      console.log(data);
      setUrls(data);
    };
    getAllUrls();
  }, []);

  return (
    <div className={s.container}>
      <form>
        <h1>Shortener</h1>
        <input ref={input}></input>
        <input
          type="submit"
          value="Shorten"
          onClick={(e) => onSubmit(e)}
        ></input>
      </form>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody ref={tbody}>{displayUrls()}</tbody>
      </table>
    </div>
  );
}
