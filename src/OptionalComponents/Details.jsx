const Details = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold text-center text-gray-800 mb-8">
        Platform Details
      </h1>

      <section className="mb-8">
        <h2 className="sm:text-3xl text-xl font-semibold text-gray-800 mb-4">
          About Our Platform
        </h2>
        <p className="text-lg text-gray-700">
          Our platform provides an easy-to-use solution for publishing and
          sharing blog posts. With intuitive features, you can write, edit, and
          manage your content seamlessly. Whether you&apos;re a hobbyist
          blogger, a professional writer, or a content creator, our platform is
          designed to help you reach your audience, build your community, and
          share your ideas with the world.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="sm:text-3xl text-xl font-semibold text-gray-800 mb-4">
          Features & Benefits
        </h2>
        <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700">
          <li>Easy sign-up and login process</li>
          <li>Customizable user profiles</li>
          <li>Real-time updates and notifications</li>
          <li>Integration with various third-party tools and services</li>
          <li>Responsive design for a seamless experience on all devices</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="sm:text-3xl text-xl font-semibold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-700">
          Our platform is built with user satisfaction in mind. We continuously
          improve our services to offer the best experience possible. Our
          customer support team is always available to help you with any issues,
          and we ensure your data is kept safe with top-tier security measures.
          With an easy-to-use interface, you can focus on what matters most
          without any unnecessary complexity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="sm:text-3xl text-xl font-semibold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          1. Sign up for an account and customize your profile.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          2. Explore the features and tools available to you.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          3. Use the platform to [what users will be able to do, e.g., manage
          projects, collaborate with teams, etc.].
        </p>
        <p className="text-lg text-gray-700 mb-4">
          4. Access support when needed through our help section or contact our
          support team directly.
        </p>
      </section>

      <section>
        <h2 className="sm:text-3xl text-xl font-semibold text-gray-800 mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-gray-700">
          If you have any questions or need further details, feel free to get in
          touch with us at <strong>support@yourwebsite.com</strong>. We&apos;re
          always happy to help!
        </p>
      </section>
    </div>
  );
};

export default Details;
