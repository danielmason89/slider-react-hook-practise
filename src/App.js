import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import Title from "./Title";
import data from "./data";
function App() {
  const [people] = useState(data);
  const [index, setIndex] = useState(0);

  // Option 1# to set-up functionality by using useEffect.
  // useEffect(() => {
  //   const lastIndex = people.length - 1;
  //   if (index < 0) {
  //     setIndex(lastIndex);
  //   }
  //   if (index > lastIndex) {
  //     setIndex(0);
  //   }
  // }, [index, people]);

  // Option 2# to set-up functionality by using functions.
  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > people.length - 1) {
        index = 0;
      }
      return index;
    });
  };

  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = people.length - 1;
      }
      return index;
    });
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > people.length - 1) {
          index = 0;
        }
        return index;
      });
    }, 2500);
    return () => {
      clearInterval(slider);
    };
  }, [index, people.length]);

  return (
    <section className="section">
      <Title />
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;

          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }

          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === person.length - 1)
          ) {
            position = "lastSlide";
          } else {
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
