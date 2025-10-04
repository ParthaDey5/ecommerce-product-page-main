import { useState, useEffect } from "react";
import Logo from "./assets/logo.svg?react";
import Cart from "./assets/images/icon-cart.svg?react";
import Close from "./assets/images/icon-close.svg?react";
import Previous from "./assets/images/icon-previous.svg?react";
import Next from "./assets/images/icon-next.svg?react";
import Plus from "./assets/images/icon-plus.svg?react";
import Minus from "./assets/images/icon-minus.svg?react";
import Delete from "./assets/images/icon-delete.svg?react";
import Menu from "./assets/images/icon-menu.svg?react";
import Checkmark from "./assets/images/icon-checkmark.svg?react";
import Spinner from "./component/Spinner.jsx";
import ThemeToggleBtn from "./component/ThemeToggleBtn.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // try to read from localStorage
    const stored = localStorage.getItem("darkMode");
    // if nothing stored, default to false
    return stored ? JSON.parse(stored) : false;
  });

  const [click, setClick] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [addedcart, setAddedcart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");
  const [itemnumbers, setItemnumbers] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const divs = ["First", "Second", "Third", "Fourth"];
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [lightbox]);

  useEffect(() => {
    if (click) {
      const timer = setTimeout(() => {
        setClick(false);
      }, 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [click]);

  useEffect(() => {
    if (processing) {
      const timer = setTimeout(() => {
        setProcessing(false);
      }, 4000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [processing]);

  useEffect(() => {
    if (!processing && itemnumbers > 0) {
      setCheckout(true);
      const timer = setTimeout(() => {
        setCheckout(false), setItemnumbers(0), setAddedcart(false);
      }, 3000);
    }
  }, [, processing]);

  return (
    <div className="max-w-screen min-h-screen flex flex-col justify-center items-center">
      <section className="fixed desktop:bottom-[0.7vw] bottom-[3vw] desktop:right-[1.5vw] right-[3vw]">
        <ThemeToggleBtn {...{ darkMode, setDarkMode }} />
      </section>
      <nav className="border-Light-grayish-blue dark:border-Grayish-blue border-b-[0.15vw] desktop:w-[70%] desktop:h-[7vw] w-full h-[15vw] flex items-center justify-between desktop:px-0 px-[5vw]">
        <span className="h-fit flex items-center">
          <Menu
            onClick={() => setOpenMenu(true)}
            className="text-Black75 dark:text-White desktop:hidden block w-[3.8vw] aspect-square mr-[4vw] cursor-pointer"
          />
          <div
            className={`z-[99999] desktop:hidden fixed inset-0 bg-Black75 transition-opacity duration-500 ${
              openMenu
                ? "opacity-100 pointer-events-auto ease"
                : "ease-out opacity-0 pointer-events-none"
            }`}
          >
            <section
              className={`bg-White w-[70%] h-full p-[5vw] ${
                openMenu ? "animate-slide-right-100" : "animate-slide-left-100"
              }`}
            >
              <Close
                onClick={() => setOpenMenu(false)}
                className="w-[3.5vw] aspect-square"
              />
              <ul className="flex flex-col mt-[10vw] gap-[5vw]">
                <li className="font-extrabold smallTxt text-Black75">
                  Collections
                </li>
                <li className="font-extrabold smallTxt text-Black75">Men</li>
                <li className="font-extrabold smallTxt text-Black75">Women</li>
                <li className="font-extrabold smallTxt text-Black75">About</li>
                <li className="font-extrabold smallTxt text-Black75">
                  Contact
                </li>
              </ul>
            </section>
          </div>

          <Logo className="dark:text-Pale-orange text-Black75 desktop:w-[10vw] w-[33vw] h-fit desktop:pb-0 pb-[0.8vw]" />
          <ul className="h-full smallTxt desktop:ml-[3vw] desktop:flex items-center desktop:gap-[2vw] hidden">
            <li>Collections</li>
            <li>Men</li>
            <li>Women</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </span>
        <span className="flex items-center desktop:gap-[2.5vw] gap-[5vw]">
          <div
            onClick={() => setOpenCart((prev) => !prev)}
            className="relative hover:scale-120  transition-transform duration-500 ease-in-out"
          >
            {addedcart && itemnumbers > 0 && !checkout && (
              <div className="z-[20] absolute desktop:translate-x-[0.8vw] translate-x-[2.5vw] desktop:-translate-y-[0.5vw] -translate-y-[1.5vw] bg-red-500  ultrasmallerTxt flex justify-center items-center text-White desktop:w-[1.3vw] w-[4vw] desktop:h-[1vw] h-[2.5vw] desktop:rounded-[1vw] rounded-[1.3vw] desktop:p-[0.2vw] p-[1.5vw]">
                <span className="brightness-500 font-bold">{itemnumbers}</span>
              </div>
            )}
            <Cart className="transition-all duration-400 ease-in-out text-Black75 dark:text-Pale-orange cursor-pointer desktop:w-[1.5vw] w-[5vw] h-fit" />
          </div>
          {itemnumbers > 0 && addedcart && !checkout ? (
            <>
              <div
                className={`z-[333] bg-White dark:bg-Black75 text-Dark-grayish-blue dark:text-Pale-orange shadow-2xl dark:shadow-[0_0_5vw_1vw_rgba(255,165,0,0.7)] transition-all origin-center duration-200 ease-linear desktop:rounded-[0.5vw] rounded-[3vw] absolute desktop:translate-y-[11vw] translate-y-[48vw] desktop:-translate-x-[10vw] desktop:left-auto left-1/2 -translate-x-1/2  desktop:w-[24vw] w-[94%] desktop:h-[17vw] h-[75vw] desktop:pb-[2vw] pb-[7vw]   ${
                  openCart
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-0 pointer-events-none"
                }`}
              >
                <p className=" font-bold mediumTxt desktop:p-[1.5vw] p-[5vw]">
                  Cart
                </p>
                <div className="w-full desktop:h-[0.15vw] h-[0.8vw] bg-Light-grayish-blue dark:bg-Grayish-blue"></div>
                <div className=" desktop:p-[1.5vw] p-[5vw] flex items-center desktop:gap-[1.5vw] gap-[6vw] desktop:mt-0 mt-[1.5vw]">
                  <img
                    src="/images/image-product-1-thumbnail.jpg"
                    alt="img"
                    className="desktop:w-[3vw] w-[15vw] h-fit desktop:rounded-[0.3vw] rounded-[2vw]"
                  />
                  <span>
                    <p className="text-Grayish-blue dark:text-Light-grayish-blue font-medium smallTxt whitespace-nowrap">
                      Fall Limited Edition Sneakers
                    </p>
                    <div className="flex items-center smallTxt text-Grayish-blue dark:text-Light-grayish-blue font-medium desktop:gap-[0.25vw] gap-[1vw] desktop:mt-[0.1vw] mt-[0.3vw]">
                      $125.00{" "}
                      <Close className="text-Grayish-blue desktop:w-[0.6vw] w-[2.5vw] aspect-square" />
                      {itemnumbers}{" "}
                      <p className="desktop:ml-[0.25vw] ml-[1.3vw] font-bold text-Dark-grayish-blue dark:text-Grayish-blue">
                        ${itemnumbers * 125}.00
                      </p>
                    </div>
                  </span>
                  <Delete
                    onClick={() => {
                      setItemnumbers(0), setAddedcart(false);
                    }}
                    className="desktop:w-[1vw] w-[5vw] aspect-square cursor-pointer text-gray-300 dark:text-Pale-orange"
                  />
                </div>
                <div
                  onClick={() => setProcessing(true)}
                  className="cursor-pointer desktop:my-[0.5vw] my-[3vw] w-[90%] desktop:h-[3.5vw] h-[15vw] bg-Orange text-Dark-grayish-blue dark:text-Dark-grayish-blue font-bold flex items-center justify-center desktop:rounded-[0.5vw] rounded-[3vw] smallTxt mx-auto"
                >
                  Checkout
                </div>
              </div>
            </>
          ) : (
            <div
              className={` bg-White dark:bg-Black75 text-Dark-grayish-blue dark:text-Pale-orange z-[999] shadow-2xl dark:shadow-[0_0_5vw_1vw_rgba(255,165,0,0.7)] transition-all origin-center duration-200 ease-linear desktop:rounded-[0.5vw] rounded-[3vw] absolute desktop:translate-y-[11vw] translate-y-[48vw] desktop:-translate-x-[10vw] desktop:left-auto left-1/2 -translate-x-1/2 desktop:w-[24vw] w-[94%] desktop:h-[17vw] h-[75vw]
            ${
              openCart
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-0 pointer-events-none"
            }            }`}
            >
              <p className="font-bold mediumTxt desktop:p-[1.5vw] p-[5vw]">
                Cart
              </p>
              <div className="w-full desktop:h-[0.15vw] h-[0.8vw] bg-Light-grayish-blue dark:bg-Grayish-blue"></div>
              <div className=" w-full desktop:h-[12vw] h-[48vw] flex items-center justify-center">
                <p className="desktop:tracking-[0.03vw] font-bold mediumTxt">
                  Your cart is empty
                </p>
              </div>
            </div>
          )}

          <span className="rounded-full shrink-0 transition-all ease hover:outline-[0.12vw] outline-Orange">
            <img
              src="/images/image-avatar.png"
              alt="avatar"
              className="cursor-pointer desktop:w-[3.2vw] w-[6vw] h-full"
            />
          </span>
        </span>
      </nav>

      {/* hero section */}
      {lightbox && (
        <section className="fixed inset-0 bg-Black75 z-20 min-h-screen overflow-y-auto">
          <div className="w-fit absolute left-1/2 -translate-x-1/2 top-[7vw]">
            <div className="flex flex-col items-center">
              <span className="w-full desktop:h-[2vw] flex items-start justify-end  desktop:w-[32vw]">
                <Close
                  className="cursor-pointer desktop:w-[1vw] aspect-square text-Orange"
                  onClick={() => setLightbox(false)}
                />
              </span>
              <div className="desktop:w-[35vw] flex items-center justify-center">
                <span
                  onClick={() => {
                    activeIndex > 0 ? setActiveIndex(activeIndex - 1) : "",
                      setSlideDirection("left");
                  }}
                  className="group absolute left-0 cursor-pointer flex items-center justify-center rounded-full bg-White dark:bg-Grayish-blue desktop:w-[3vw] desktop:h-[3vw] z-[100]"
                >
                  <Previous className="group-hover:text-Orange desktop:w-[1.1vw] desktop:h-[1.1vw]" />
                </span>
                <div className="desktop:w-[32vw] desktop:h-[32vw]">
                  <img
                    key={activeIndex} // forces re-render
                    src={`/images/image-product-${activeIndex + 1}.jpg`}
                    alt="product"
                    className={`desktop:w-[32vw] h-fit desktop:rounded-[0.6vw] transition-transform duration-800 ${
                      slideDirection === "left"
                        ? "animate-slide-left"
                        : "animate-slide-right"
                    }`}
                  />
                </div>
                <span
                  onClick={() => {
                    activeIndex < 3 ? setActiveIndex(activeIndex + 1) : "";
                    setSlideDirection("right");
                  }}
                  className="group absolute right-0 cursor-pointer flex items-center justify-center rounded-full bg-White dark:bg-Grayish-blue desktop:w-[3vw] desktop:h-[3vw] z-[100]"
                >
                  <Next className="group-hover:text-Orange desktop:w-[1.1vw] desktop:h-[1.1vw]" />
                </span>
              </div>
              <div className="desktop:mt-[2.5vw] desktop:mb-[5vw] desktop:w-[80%] flex justify-between">
                {divs.map((e, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative cursor-pointer w-fit desktop:rounded-[0.5vw] overflow-hidden
              ${activeIndex === index ? "outline-2 outline-red-500" : ""}`}
                  >
                    {/* Thumbnail image */}
                    <img
                      src={`/images/image-product-${index + 1}-thumbnail.jpg`}
                      alt="product"
                      className="w-[5.5vw] h-fit desktop:rounded-[0.5vw]"
                    />

                    {/* Hover overlay */}
                    <div
                      className={`absolute inset-0 bg-White ${
                        activeIndex === index ? "opacity-50" : "opacity-0"
                      } hover:opacity-50 transition`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="w-full h-full desktop:px-[18vw] desktop:py-[5vw] flex desktop:flex-row flex-col">
        <section className="desktop:w-[29vw] w-full flex flex-col desktop:gap-[2vw]">
          <div className="desktop:w-[29vw] w-full desktop:aspect-square desktop:rounded-[1vw] overflow-hidden flex items-center justify-between">
            <span
              onClick={() => {
                activeIndex > 0 ? setActiveIndex(activeIndex - 1) : "",
                  setSlideDirection("left");
              }}
              className="desktop:hidden group absolute left-[4vw] cursor-pointer flex items-center justify-center rounded-full bg-White dark:bg-Light-grayish-blue w-[10vw] h-[10vw] z-[100]"
            >
              <Previous className="group-hover:text-Orange w-[5vw] aspect-square" />
            </span>
            <img
              src={`/images/image-product-${activeIndex + 1}.jpg`}
              alt="product"
              className="desktop:pointer-events-auto pointer-events-none w-full desktop:aspect-square aspect-[5/4.5] cursor-pointer"
              onClick={() => {
                setLightbox(true);
              }}
            />
            <span
              onClick={() => {
                activeIndex < 3 ? setActiveIndex(activeIndex + 1) : "",
                  setSlideDirection("right");
              }}
              className="desktop:hidden absolute right-[4vw] group cursor-pointer flex items-center justify-center rounded-full bg-White w-[10vw] h-[10vw] z-[100]"
            >
              <Next className="group-hover:text-Orange w-[5vw] aspect-square" />
            </span>
          </div>
          <div className="desktop:flex justify-between hidden">
            {divs.map((e, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative cursor-pointer w-[5.5vw] aspect-square desktop:rounded-[0.5vw] overflow-hidden
        ${activeIndex === index ? "outline-2 outline-red-500" : ""}`}
              >
                {/* Thumbnail image */}
                <img
                  src={`/images/image-product-${index + 1}-thumbnail.jpg`}
                  alt="product"
                  className="w-[5.5vw] aspect-square desktop:rounded-[0.5vw]"
                />

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-White ${
                    activeIndex === index ? "opacity-50" : "opacity-0"
                  } hover:opacity-50 transition`}
                ></div>
              </div>
            ))}
          </div>
        </section>
        <section className="desktop:p-0 p-[5vw] desktop:w-[33vw] desktop:pl-[7.5vw] flex items-center">
          <div className="w-full h-fit text-Dark-grayish-blue dark:text-Pale-orange">
            <p className=" ultrasmallTxt desktop:tracking-[0.1vw] tracking-[0.5vw] font-bold desktop:mb-[1vw] mb-[2vw]">
              SNEAKER COMPANY
            </p>
            <h1 className=" bigTxt desktop:leading-[3vw] leading-[8vw] desktop:mb-[2vw] mb-[4vw]">
              Fall Limited Edition Sneakers
            </h1>
            <article className=" ultraTxt desktop:mb-[1vw] mb-[5vw] desktop:leading-[1.5vw]">
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they’ll withstand
              everything the weather can offer.
            </article>
            <span className="flex desktop:flex-col flex-row desktop:items-start items-center justify-between">
              <span className="flex items-center desktop:gap-[1vw] gap-[4.5vw]">
                <h1 className=" mediumbigTxt">$125.00</h1>
                <span className="bg-Dark-grayish-blue dark:bg-Grayish-blue desktop:w-[3vw] w-[13vw] desktop:h-[1.7vw] h-[6.8vw] text-white dark:text-Pale-orange flex items-center justify-center desktop:rounded-[0.4vw] rounded-[1.5vw] ultraTxt desktop:tracking-normal tracking-[0.3vw] leading-0">
                  50%
                </span>
              </span>
              <p className="desktop:mt-[0.5vw] mediumTxt line-through text-Dark-grayish-blue dark:text-Grayish-blue font-bold">
                $250.00
              </p>
            </span>
            <div className="transition-all duration-600 ease-out flex desktop:flex-row flex-col desktop:gap-[1vw] gap-[4vw] desktop:my-[2vw] mt-[6vw] mb-[12vw]">
              <div className="bg-Light-grayish-blue dark:bg-Dark-grayish-blue desktop:rounded-[0.5vw] rounded-[3vw] desktop:w-[10vw] w-full desktop:h-[3.3vw] h-[15vw] flex items-center justify-between desktop:px-[1vw] px-[7vw]">
                <Minus
                  onClick={() => {
                    itemnumbers > 0 ? setItemnumbers(itemnumbers - 1) : "",
                      setClick(false);
                  }}
                  className="cursor-pointer desktop:w-[0.8vw] w-[3.3vw] aspect-square"
                />
                <span className="font-bold  mediumTxt">{itemnumbers}</span>
                <Plus
                  onClick={() => {
                    setItemnumbers(itemnumbers + 1), setClick(false);
                  }}
                  className="cursor-pointer desktop:w-[0.8vw] w-[3.3vw] aspect-square"
                />
              </div>
              <div
                onClick={() => {
                  setAddedcart(true), setClick(true);
                }}
                className="cursor-pointer flex items-center justify-center desktop:gap-[1vw] gap-[4vw] desktop:w-[15vw] desktop:h-[3.3vw] h-[15vw] bg-Orange desktop:rounded-[0.5vw] rounded-[3vw] smallTxt font-bold text-White dark:text-Dark-grayish-blue"
              >
                <Cart className="text-Black75 dark:text-Dark-grayish-blue desktop:w-[1vw] w-[5vw] aspect-square" />
                Add to cart
              </div>

              {/* item added to cart pop-up */}
              <div
                className={`z-[9999999999] transition-all origin-center duration-700 ease-in-out fixed ${
                  click && itemnumbers > 0
                    ? "animate-pop-in desktop:top-[2vw] top-[5vw] scale-100"
                    : "opacity-0 top-[-20vw] scale-0"
                } left-1/2 -translate-x-1/2 whitespace-nowrap w-fit desktop:h-[3.3vw] h-[9vw] desktop:rounded-[0.5vw] rounded-[2vw] bg-White dark:bg-Grayish-blue smallTxt shadow-md desktop:gap-[1vw] gap-[2vw] flex items-center desktop:px-[1.5vw] px-[2.5vw]`}
              >
                <div className="desktop:p-[0.25vw] p-[0.5vw] flex items-center justify-center desktop:w-[1.5vw] w-[5vw] aspect-square bg-red-500 rounded-full">
                  <Checkmark className="text-White brightness-200 desktop:w-fit w-[10vw] aspect-square" />
                </div>
                Item added to cart
              </div>
              {/* processing pop-up before checkout */}
              <div
                className={`z-[9999999999] transition-all origin-center duration-700 ease-in-out fixed ${
                  processing
                    ? "animate-pop-in desktop:top-[2vw] top-[5vw] scale-100"
                    : "opacity-0 top-[-20vw] scale-0"
                } left-1/2 -translate-x-1/2 whitespace-nowrap w-fit desktop:h-[3.3vw] h-[9vw] desktop:rounded-[0.5vw] rounded-[2vw] bg-White dark:bg-Grayish-blue smallTxt shadow-md desktop:gap-[1vw] gap-[2vw] flex items-center desktop:px-[1.5vw] px-[2.5vw]`}
              >
                <Spinner />
                Processing your order.
              </div>

              {/* successful checkout pop-up */}
              <div
                className={`z-[9999999999] transition-all origin-center duration-700 ease-in-out fixed ${
                  checkout
                    ? "animate-pop-in desktop:top-[2vw] top-[5vw] scale-100"
                    : "opacity-0 top-[-20vw] scale-0"
                } left-1/2 -translate-x-1/2 whitespace-nowrap w-fit desktop:h-[4vw] h-[13vw] desktop:rounded-[0.5vw] rounded-[2vw] bg-White dark:bg-Grayish-blue checkoutTxt shadow-md desktop:gap-[1vw] gap-[2vw] flex items-center desktop:px-[1.5vw] px-[2.5vw]`}
              >
                <div className="desktop:p-[0.25vw] p-[0.25vw] flex items-center justify-center desktop:w-[1.5vw] w-[5vw] aspect-square bg-Orange rounded-full">
                  <Checkmark className="desktop:w-fit w-[3vw] aspect-square" />
                </div>
                Checkout successful! Thank
                <br /> you for purchase.
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default App;
