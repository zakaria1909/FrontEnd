"use client";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Education from "./components/Education/Education";
import Experience from "./components/Experience/Experience";
import Project from "./components/Project/Project";
import Footer from "./components/Footer/Footer";

export default function Page({user}: {user: any}) {
  return (
    <>
      <Navbar user={user} />
      <Hero user={user} />
      <main>
        <Education user={user} />
        <Experience user={user} />
        <Project user={user} />
      </main>
      <Footer user={user} />
    </>
  );
}
