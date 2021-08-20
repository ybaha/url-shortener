import React from "react";
import s from "./index.module.scss";

export default function Go() {
  const [timer, setTimer] = React.useState(6);
  const [showLink, setShowLink] = React.useState(false);

  const countdown = () => {
    if (timer > 0) {
      let interval = setInterval(() => {
        clearInterval(interval);
        setTimer(timer - 1);
      }, 1000);
    }
  };

  React.useEffect(() => {
    countdown();
    if (timer === 0) {
      let interval = setInterval(() => {
        clearInterval(interval);
        setShowLink(true);
      }, 1500);
    }
  }, [timer]);

  return (
    <div className={s.container}>
      <h1>{timer}</h1>
      <div>
        {showLink && window.location.pathname && (
          <a
            href={`http://localhost:5000${window.location.pathname.substr(3)}`}
          >
            Go to {window.location.pathname.substr(3)}
          </a>
        )}
      </div>
    </div>
  );
}
