import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const Career = () => {
  const { darkmode } = useContext(AuthContext);
  return (
    <div className="container mx-auto px-6 py-12">
      <h1
        className={
          darkmode
            ? "text-4xl font-semibold text-white text-center mb-8"
            : "text-4xl font-semibold text-gray-800 text-center mb-8"
        }
      >
        Join Our Team
      </h1>

      {/* Content Manager Vacancy */}
      <div
        className={
          darkmode
            ? "bg-gray-200 p-6 rounded-lg border-b-2 shadow-lg shadow-gray-600 mb-8"
            : "bg-white p-6 rounded-lg border-b-2 shadow-lg mb-8"
        }
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Content Manager
        </h2>
        <p className="text-lg text-gray-600 mb-4">Location: Remote</p>
        <p className="text-lg text-gray-600 mb-4">Job Type: Full-time</p>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          About the Role
        </h3>
        <p className="text-lg text-gray-600 mb-4">
          We are looking for a creative Content Manager to join our team. In
          this role, you will be responsible for developing and executing
          content strategies, managing content calendars, and ensuring content
          quality.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          Responsibilities
        </h3>
        <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
          <li>
            Create and manage content for the website, blog, and social media
            channels.
          </li>
          <li>
            Collaborate with marketing and design teams to create engaging
            content.
          </li>
          <li>
            Analyze content performance and adjust strategies accordingly.
          </li>
          <li>Ensure all content aligns with brand voice and messaging.</li>
          <li>
            Stay updated with industry trends to keep the content fresh and
            relevant.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          Requirements
        </h3>
        <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
          <li>
            Proven experience in content creation or management, ideally in a
            digital environment.
          </li>
          <li>Excellent writing, editing, and communication skills.</li>
          <li>
            Experience with content management systems (CMS) and SEO best
            practices.
          </li>
          <li>Strong organizational skills and attention to detail.</li>
        </ul>

        <p className="text-lg text-gray-600">
          How to Apply: Send your resume and portfolio to{" "}
          <a href="mailto:email@example.com" className="text-blue-500">
            email@example.com
          </a>
          .
        </p>
      </div>

      {/* Database Administrator Vacancy */}
      <div
        className={
          darkmode
            ? "bg-gray-200 p-6 rounded-lg border-b-2 shadow-lg shadow-gray-600 mb-8"
            : "bg-white p-6 rounded-lg border-b-2 shadow-lg mb-8"
        }
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Database Administrator
        </h2>
        <p className="text-lg text-gray-600 mb-4">Location: Remote</p>
        <p className="text-lg text-gray-600 mb-4">Job Type: Full-time</p>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          About the Role
        </h3>
        <p className="text-lg text-gray-600 mb-4">
          We are seeking a skilled Database Administrator to ensure the
          efficiency and security of our databases. You will be responsible for
          managing data storage, backup, optimization, and performance
          monitoring.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          Responsibilities
        </h3>
        <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
          <li>
            Design, implement, and maintain databases for scalability and
            performance.
          </li>
          <li>
            Monitor database performance and troubleshoot any issues that arise.
          </li>
          <li>
            Ensure database security and manage backup and recovery procedures.
          </li>
          <li>
            Collaborate with developers to design database structures for new
            features.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          Requirements
        </h3>
        <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
          <li>Experience in database administration and management.</li>
          <li>
            Proficiency with SQL and database management tools (e.g., MySQL,
            PostgreSQL).
          </li>
          <li>Strong problem-solving and analytical skills.</li>
          <li>Knowledge of data security practices and backup strategies.</li>
        </ul>

        <p className="text-lg text-gray-600">
          How to Apply: Send your resume to{" "}
          <a href="mailto:email@example.com" className="text-blue-500">
            email@example.com
          </a>
          .
        </p>
      </div>

      {/* User Support & Care Specialist Vacancy */}
      <div
        className={
          darkmode
            ? "bg-gray-200 p-6 rounded-lg border-b-2 shadow-lg shadow-gray-600 mb-8"
            : "bg-white p-6 rounded-lg border-b-2 shadow-lg mb-8"
        }
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          User Support & Care Specialist
        </h2>
        <p className="text-lg text-gray-600 mb-4">Location: Remote</p>
        <p className="text-lg text-gray-600 mb-4">Job Type: Full-time</p>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          About the Role
        </h3>
        <p className="text-lg text-gray-600 mb-4">
          We are looking for a passionate and empathetic User Support & Care
          Specialist to join our team. In this role, you will be responsible for
          providing exceptional customer support to our platform users. You will
          help resolve user issues, assist with inquiries, and ensure a positive
          user experience across all channels.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          Responsibilities
        </h3>
        <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
          <li>
            Respond to user inquiries and provide solutions to technical and
            non-technical issues.
          </li>
          <li>
            Guide users through platform features and provide troubleshooting
            assistance.
          </li>
          <li>
            Track and resolve customer issues in a timely manner, ensuring high
            satisfaction levels.
          </li>
          <li>
            Work with the development team to report bugs and improve user
            experience.
          </li>
          <li>
            Assist with onboarding and help users navigate new features of the
            platform.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
          Requirements
        </h3>
        <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
          <li>Excellent communication skills, both written and verbal.</li>
          <li>
            Proven experience in customer support, ideally in a tech or SaaS
            environment.
          </li>
          <li>
            Strong problem-solving abilities and patience when dealing with
            users.
          </li>
          <li>Ability to handle multiple tasks and prioritize efficiently.</li>
          <li>
            Basic understanding of web platforms and troubleshooting methods.
          </li>
        </ul>

        <p className="text-lg text-gray-600">
          How to Apply: Send your resume and a brief cover letter to{" "}
          <a href="mailto:email@example.com" className="text-blue-500">
            email@example.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Career;
