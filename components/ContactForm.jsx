'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [sentTo, setSentTo] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSentTo(String(data.get('name')).trim());
  }

  if (sentTo !== null) {
    return (
      <div className="notice notice-success" role="status">
        <p>
          <strong>Thank you, {sentTo}!</strong> This is a demo form, so your message
          was not sent anywhere.
        </p>
        <button
          type="button"
          className="button button-outline"
          onClick={() => setSentTo(null)}
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>

      <button type="submit" className="button">
        Send message
      </button>
    </form>
  );
}
