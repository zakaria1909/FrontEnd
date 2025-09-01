function Skills() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold border-b-2 border-blue-500 mb-2">
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {["HTML", "CSS", "JavaScript", "React", "Tailwind", "Git"].map(
          (skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {skill}
            </span>
          )
        )}
      </div>
    </section>
  );
}

export default Skills;
