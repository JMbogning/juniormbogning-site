"use client";

import { useEffect, useRef, useState } from "react";

const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || "";

function generateChallenge() {
  const isAddition = Math.random() >= 0.5;

  if (isAddition) {
    const left = Math.floor(Math.random() * 8) + 1;
    const right = Math.floor(Math.random() * 8) + 1;

    return {
      left,
      right,
      operator: "+",
      expectedAnswer: String(left + right)
    };
  }

  const left = Math.floor(Math.random() * 8) + 2;
  const right = Math.floor(Math.random() * (left - 1)) + 1;

  return {
    left,
    right,
    operator: "-",
    expectedAnswer: String(left - right)
  };
}

export function ContactForm({ labels }) {
  const formStartedAt = useRef(Date.now());
  const [challenge, setChallenge] = useState(null);
  const [status, setStatus] = useState("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
    antiBotAnswer: ""
  });

  useEffect(() => {
    setChallenge(generateChallenge());
    formStartedAt.current = Date.now();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const elapsedMs = Date.now() - formStartedAt.current;

    if (values.website.trim()) {
      setStatus("blocked");
      return;
    }

    if (elapsedMs < 4000) {
      setStatus("too_fast");
      return;
    }

    if (!challenge || values.antiBotAnswer.trim() !== challenge.expectedAnswer) {
      setStatus("invalid_challenge");
      return;
    }

    setStatus("submitting");

    await new Promise((resolve) => {
      window.setTimeout(resolve, 350);
    });

    try {
      if (contactEndpoint) {
        const payload = new URLSearchParams({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          website: values.website,
          antiBotAnswer: values.antiBotAnswer,
          antiBotLeft: String(challenge.left),
          antiBotOperator: challenge.operator,
          antiBotRight: String(challenge.right),
          elapsedMs: String(elapsedMs),
          locale: labels.locale,
          page: window.location.href
        });

        await fetch(contactEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          body: payload.toString()
        });
      } else {
        const subject = encodeURIComponent(values.subject);
        const body = encodeURIComponent(
          [
            `${labels.emailBodyName}: ${values.name}`,
            `${labels.emailBodyEmail}: ${values.email}`,
            "",
            values.message
          ].join("\n")
        );

        window.location.href = `mailto:${labels.recipientEmail}?subject=${subject}&body=${body}`;
      }
    } catch {
      setStatus("error");
      return;
    }

    setValues({
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
      antiBotAnswer: ""
    });
    setChallenge(generateChallenge());
    formStartedAt.current = Date.now();
    setStatus(contactEndpoint ? "success" : "fallback");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__header field--full">
        <p className="contact-form__intro">{labels.intro}</p>
        <div className="contact-form__meta">
          <span>{labels.requiredLegend}</span>
          <span>{labels.privacy}</span>
        </div>
      </div>
      <label className="field field--hidden" aria-hidden="true">
        <span>{labels.websiteLabel}</span>
        <input
          name="website"
          type="text"
          tabIndex="-1"
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </label>
      <label className="field">
        <span>
          {labels.name}
          <em className="field__required" aria-hidden="true">*</em>
        </span>
        <input
          name="name"
          type="text"
          placeholder={labels.namePlaceholder}
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="field">
        <span>
          {labels.email}
          <em className="field__required" aria-hidden="true">*</em>
        </span>
        <input
          name="email"
          type="email"
          placeholder={labels.emailPlaceholder}
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="field field--full">
        <span>
          {labels.subject}
          <em className="field__required" aria-hidden="true">*</em>
        </span>
        <input
          name="subject"
          type="text"
          placeholder={labels.subjectPlaceholder}
          value={values.subject}
          onChange={handleChange}
          required
        />
      </label>
      <label className="field field--full">
        <span>
          {labels.message}
          <em className="field__required" aria-hidden="true">*</em>
        </span>
        <textarea
          name="message"
          rows="7"
          placeholder={labels.messagePlaceholder}
          value={values.message}
          onChange={handleChange}
          required
        />
      </label>
      <label className="field field--full">
        <span>
          {challenge
            ? `${labels.antiBotQuestionPrefix} ${challenge.left} ${challenge.operator} ${challenge.right} ?`
            : labels.antiBotLoading}
          <em className="field__required" aria-hidden="true">*</em>
        </span>
        <input
          name="antiBotAnswer"
          type="text"
          inputMode="numeric"
          placeholder={labels.antiBotPlaceholder}
          value={values.antiBotAnswer}
          onChange={handleChange}
          required
        />
      </label>
      <div className="contact-form__footer">
        <button type="submit" className="button button--primary contact-form__submit" disabled={status === "submitting"}>
          {status === "submitting" ? labels.sending : labels.submit}
        </button>
        <div className="contact-form__status" aria-live="polite">
          {status === "success" ? <p className="contact-form__success">{labels.success}</p> : null}
          {status === "fallback" ? <p className="contact-form__success">{labels.successFallback}</p> : null}
          {status === "too_fast" ? <p className="contact-form__error">{labels.tooFast}</p> : null}
          {status === "invalid_challenge" ? <p className="contact-form__error">{labels.invalidChallenge}</p> : null}
          {status === "blocked" ? <p className="contact-form__error">{labels.blocked}</p> : null}
          {status === "error" ? <p className="contact-form__error">{labels.submitError}</p> : null}
        </div>
      </div>
    </form>
  );
}
