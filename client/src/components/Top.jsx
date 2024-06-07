import { GoDiscussionClosed } from "react-icons/go";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiSmart, GiSpeedBoat, GiSpeedometer } from "react-icons/gi";
import { TypeAnimation } from "react-type-animation";

function Top() {
  return (
    <div className="mb-16 mt-4">
      <div className="bg-gray-100">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
                Brand new
              </p>
            </div>
            <p className="max-w-xl mb-6 font-sans text-4xl capitalize font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              {/* <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="dc223fcc-6d72-4ebc-b4ef-abe121034d6e"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#dc223fcc-6d72-4ebc-b4ef-abe121034d6e)"
                    width="52"
                    height="24"
                  />
                </svg> */}
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Ace your next interview with PrepSupport",
                  2000, // wait 1s before replacing "Mice" with "Hamsters"
                  "Prepare for your next interview with PrepSupport",
                  2000,
                  "Crack your next interview with PrepSupport",
                  2000,
                  "Get ready for your next interview with PrepSupport",
                  2000,
                ]}
                wrapper="span"
                speed={40}
                style={{ display: "inline-block" }}
                repeat={Infinity}
                cursor={false}
                className="text-transparent bg-clip-text bg-gradient-to-r text-4xl from-green-400 via-pink-500 to-purple-500"
              />
            </p>
            <p className="text-base text-gray-700 md:text-lg">
              PrepSupport is a community of students who share their placement
              interview experiences and help each other to excel in their career
              journey.
            </p>
          </div>
          <div className="flex items-center sm:justify-center">
            <a
              href="#list_of_exp"
              type="submit"
              className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-900 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
      <div className="relative px-4 sm:px-0">
        <div className="absolute inset-0 bg-gray-100 h-1/2" />
        <div className="relative grid mx-auto overflow-hidden bg-white divide-y rounded shadow sm:divide-y-0 sm:divide-x sm:max-w-screen-sm sm:grid-cols-3 lg:max-w-screen-md">
          <div className="inline-block p-8 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50">
              <GoDiscussionClosed size={20} />
            </div>
            <p className="font-bold tracking-wide text-gray-800">
              Ace interviews
            </p>
          </div>
          <div className="inline-block p-8 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50">
              <GiSpeedometer size={20} />
            </div>
            <p className="font-bold tracking-wide text-gray-800">
              Speed up career growth
            </p>
          </div>
          <div className="inline-block p-8 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-50">
              <GiSmart size={20} />
            </div>
            <p className="font-bold tracking-wide text-gray-800">
              Work smarter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top;
