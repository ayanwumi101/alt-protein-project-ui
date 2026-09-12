import { Call, Sms, Location } from "iconsax-react";
import { Reveal } from "../components/Reveal";

export function Contact() {
  return (
    <main className="detail-page">
      <section className="page-hero shell">
        <div className="eyebrow">
          <span className="eyebrow-line" /> Contact
        </div>
        <h1>
          Let’s make
          <br />
          <em>something better.</em>
        </h1>
        <p className="page-intro">
          Have an idea, a question, or just want to say hello? We would love to
          hear from you.
        </p>
      </section>
      <section className="contact-details shell">
        <Reveal className="contact-details-copy">
          <div className="section-label">
            01 <span /> START A CONVERSATION
          </div>
          <h2>
            Tell us what
            <br />
            <em>you’re thinking.</em>
          </h2>
          <p>
            Reach the University of Ibadan Alt Protein Project team and start a
            conversation about research, education, or collaboration.
          </p>
          <a
            className="button button-dark"
            href="mailto:unibadanaltprotein@gmail.com"
          >
            Email the team <span>↗</span>
          </a>
        </Reveal>
        <Reveal className="contact-cards">
          {[
            [Sms, "Email", "unibadanaltprotein@gmail.com"],
            [Call, "Phone", "By appointment"],
            [Location, "Find us", "University of Ibadan"],
          ].map(([Icon, title, text]) => (
            <div className="contact-card" key={title as string}>
              <Icon color="currentColor" size={26} variant="Linear" />
              <small>{title as string}</small>
              <strong>{text as string}</strong>
            </div>
          ))}
        </Reveal>
      </section>
      <section className="contact-form-section">
        <div className="shell">
          <Reveal>
            <div className="section-label">
              02 <span /> SEND A MESSAGE
            </div>
            <h2>
              Let’s start
              <br />
              <em>with a note.</em>
            </h2>
            <form
              className="contact-form"
              action="https://formsubmit.co/unibadanaltprotein@gmail.com"
              method="POST"
            >
              <input
                type="hidden"
                name="_subject"
                value="New message from Alt Protein Project website"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Tell us a little about your idea..."
                  rows={5}
                  required
                />
              </label>
              <button className="button button-dark" type="submit" style={{width: 'fit-content'}}>
                Send message <span>↗</span>
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
