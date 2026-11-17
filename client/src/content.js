// Replace video: null with an MP4 URL (or use a full YouTube embed URL in an iframe implementation).
// The supplied image assets are cropped from approved screenshot mockups, not original media exports.
export const products = [
  {
    id: "doctalk",
    number: "01",
    name: "DocTalk",
    logo:"/images/doctalk-logo.webp",
    tagline: "One doctor. One powerful message.",
    description:
      "A doctor speaks to patients on a health topic in a short, lifelike educational video.",
    use: "Health tips, awareness days and everyday patient education",
    image: "/images/Video_01 SS.png",
    video: "/images/video_01.mp4",
    // action: "Ask for a sample",
  },
  {
    id: "quiz",
    number: "02",
    name: "DocTalk Quiz",
    logo:"/images/doctalk_quiz.jpg",
    tagline: "Turn watching into participation.",
    description:
      "A doctor asks health questions on video. Patients answer on their phones and receive a score.",
    use: "Interactive awareness campaigns and participation tracking",
    image: "/images/Video_02 SS.png",
    video: "/images/video_02.mp4",

    // action: "Try the quiz",
  },
  {
    id: "show",
    number: "03",
    logo:"/images/doctalk_show.jpg",
    name: "DocTalk Show",
    tagline: "Expert conversations, made engaging.",
    description:
      "A TV-style discussion where an anchor asks questions and two or more doctors answer.",
    use: "Product launches, deeper therapy education and expert discussions",
    image: "/images/Video_03 SS.png",
    video: "/images/video_03.mp4",

    // action: "Ask for a sample",
  },
];
