import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch about a product or about this project.',
};

export default function ContactPage() {
  return (
    <div className="contact">
      <section aria-labelledby="contact-title">
        <h1 id="contact-title">Contact</h1>
        <p className="lead">
          Have a question about a product or about this project? Leave a message
          below.
        </p>
        <ContactForm />
      </section>

      <aside className="contact-aside" aria-labelledby="about-heading">
        <h2 id="about-heading">About this project</h2>
        <p>
          Product Showcase is a practice project made by Alif Arya Ramadhan with
          Next.js, using the FakeStore API for its product data.
        </p>
        <p>
          <a
            href="https://github.com/Alifarya31"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            github.com/Alifarya31
          </a>
        </p>
      </aside>
    </div>
  );
}
