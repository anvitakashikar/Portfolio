import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");
  const [showAlert, setShowAlert] = useState(false);

  const sectionsRef = {
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    contact: useRef(null),
  };

  const formRef = useRef();

  const handleScroll = (id) => {
    setActiveTab(id);
    sectionsRef[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollHighlight = () => {
    const offsets = Object.entries(sectionsRef).map(([id, ref]) => ({
      id,
      offset: ref.current?.getBoundingClientRect().top,
    }));
    const current = offsets.reduce((closest, section) => {
      if (
        section.offset !== undefined &&
        Math.abs(section.offset) < Math.abs(closest.offset)
      ) {
        return section;
      }
      return closest;
    });
    setActiveTab(current.id);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollHighlight);
    return () => window.removeEventListener("scroll", handleScrollHighlight);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("your_service_id", "your_template_id", formRef.current, "your_public_key")
      .then(
        () => {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
          formRef.current.reset();
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          console.error("Email error:", error);
        }
      );
  };

  const tabs = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const skillCategories = {
    "Programming Languages": ["Python", "Java", "HTML", "CSS"],
    "Libraries/Frameworks": [
      "ReactJS",
      "NodeJs",
      "ExpressJS",
      "Numpy",
      "Pandas",
      "Matplotlib",
      "Scikit-learn",
      "TensorFlow",
    ],
    "Tools / Platforms": [
      "Git",
      "Canva",
      "Jupyter",
      "Figma",
      "Kaggle",
      "Google Colab",
      "Vertex AI",
    ],
    Databases: ["MySQL", "MongoDB", "Neo4J"],
  };

  return (
    <div className="bg-black text-white">
      {/* Navigation Tabs */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-950 border-b border-gray-700 sticky top-0 z-50">
        <div className="rounded-xl bg-white w-12 h-12 flex items-center justify-center text-black font-bold text-xl">
          AK
        </div>
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleScroll(tab.id)}
              className={`text-lg font-medium hover:text-blue-400 transition-colors ${
                activeTab === tab.id ? "text-blue-400" : "text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alert */}
      {showAlert && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          📬 Message Sent Successfully!
        </div>
      )}

      {/* About Section */}
      <section
        ref={sectionsRef.about}
        id="about"
        className="min-h-screen flex flex-col justify-center items-center px-4 text-center bg-black"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl font-bold mb-2">AK</h1>
          <h2 className="text-2xl text-gray-300 mb-8">Anvita Kashikar</h2>
          <p className="max-w-2xl text-gray-400 text-lg">
            I'm an enthusiastic developer and AI researcher passionate about
            building impactful technology...
          </p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section
        ref={sectionsRef.skills}
        id="skills"
        className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-900 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold mb-6">Skills</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl w-full">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div key={category} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-white">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        ref={sectionsRef.projects}
        id="projects"
        className="min-h-screen flex flex-col justify-center items-center px-4 bg-black text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold mb-6">Projects</h2>
          <div className="grid gap-6 max-w-4xl w-full sm:grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Detection of Retinal Diseases</h3>
              <p className="text-sm text-gray-400 mb-2">
                <strong>Tech Stack:</strong> Python, NumPy, Pandas, TensorFlow, Keras, CNN, Scikit-learn, Matplotlib, Jupyter Notebook, Kaggle
              </p>
              <p className="text-gray-300 mb-2">
                Developed a deep learning model using a Kaggle dataset to detect retinal diseases, employing algorithms such as Convolutional Neural Networks (CNNs), K-Nearest Neighbors (KNN), and Recurrent Neural Networks (RNNs).
              </p>
              <a href="https://github.com/anvitakashikar/Detection_Retinaldisease" className="text-blue-400 hover:underline" target="_blank">View Project</a>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Text Summarizer/Translator</h3>
              <p className="text-sm text-gray-400 mb-2">
                <strong>Tech Stack:</strong> Python, NumPy, Pandas, NLTK, TensorFlow, Keras, Multi-Task Learning (MTL), Flask, Jupyter Notebook
              </p>
              <p className="text-gray-300 mb-2">
                Developed a Multi-Task Learning (MTL) model that enables users to both summarize and translate text. Implemented a combination of hard parameter sharing and soft parameter sharing techniques to optimize performance across both tasks simultaneously.
              </p>
              <a href="https://github.com/anvitakashikar/Multi-task-Model/tree/main" className="text-blue-400 hover:underline" target="_blank">View Project</a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section
        ref={sectionsRef.experience}
        id="experience"
        className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-900 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold mb-6">Work Experience</h2>
          <div className="grid gap-6 max-w-4xl w-full sm:grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">OPM Corporation | Full Stack Developer Internship</h3>
              <p className="text-gray-300 mb-2">
                Worked as a Full Stack Developer, starting from designing the UI/UX in Figma to developing both the frontend and backend of the application.
              </p>
              <p className="text-gray-300 mb-2">
                Developed "Ridlin", a web platform centered around the pet community, enabling pet owners and enthusiasts to access a wide range of pet-related services and resources.
              </p>
              <p className="text-gray-300">
                Built a secure and scalable backend architecture to manage user data, product listings, and interactive features effectively.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">MIT (Pune) | Research Internship</h3>
              <p className="text-gray-300 mb-2">
                Worked as a Research Intern in Artificial Intelligence, focusing on the implementation of algorithms inspired by the characteristics and lifestyles of living organisms.
              </p>
              <p className="text-gray-300">
                Explored bio-inspired techniques such as swarm intelligence and evolutionary computation to design efficient, adaptive AI systems aimed at solving complex real-world problems.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        ref={sectionsRef.contact}
        id="contact"
        className="min-h-screen flex flex-col justify-center items-center px-4 text-center bg-black"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-xl"
        >
          <h2 className="text-4xl font-semibold mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-300 mb-4">
            Feel free to reach out via email: <a href="mailto:anvitakashikar29@gmail.com" className="text-blue-400 hover:underline">anvitakashikar29@gmail.com</a>
          </p>
          <p className="text-lg text-gray-300">
            Connect with me on <a href="https://www.linkedin.com/in/anvita-kashikar/" className="text-blue-400 hover:underline" target="_blank">LinkedIn</a>
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-600 bg-black">
        &copy; {new Date().getFullYear()} Anvita Kashikar. All rights reserved.
      </footer>
    </div>
  );
}
