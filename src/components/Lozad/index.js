import React, { useEffect } from "react";
import { debounce } from "../../function/debounce";
import "./index.css";


function Lozad(props) {
  useEffect(() => {
    let container = document.getElementsByClassName("siteLayoutContent")[0];
    container.addEventListener("scroll", debounce(lozad, 0, true), false);
    return () => {
      // container && container.removeEventListener();
    };
  }, []);

  const lozad = () => {
    let container = document.getElementsByClassName("siteLayoutContent")[0];
    const el = document.querySelectorAll("[data-src]");
    const clientHeight = document.documentElement.clientHeight;
    el.forEach(item => {
      if (item.offsetTop <= container.scrollTop + clientHeight) {
        item.setAttribute("src", item.getAttribute("data-src"));
      }
    });
  };

  return (
    <>
      <div className="container">
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="1"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/1.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="2"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/2.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="3"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/3.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="4"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/4.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="5"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/5.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="6"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/6.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="7"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/7.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="8"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/8.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="9"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/15.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="10"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/16.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="11"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/17.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="12"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/18.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="13"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/17.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="14"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/18.jpg"
        />
        {/* <h1 id="target">hello</h1> */}
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="15"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/15.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="16"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/16.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="17"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/17.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="18"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/18.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="15"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/15.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="16"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/16.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="17"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/17.jpg"
        />
        <img
          src="http://smashinghub.com/wp-content/uploads/2014/08/cool-loading-animated-gif-3.gif"
          alt="18"
          data-src="http://cdn.jirengu.com/book.jirengu.com/img/18.jpg"
        />
      </div>
    </>
  );
}

export default Lozad;
